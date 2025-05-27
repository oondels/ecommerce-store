import { AxiosInstance } from "axios";

type QueueItem = {
  resolve: () => void;
  reject: () => void
}

export function attachInterceptors(api: AxiosInstance, apiAuth: AxiosInstance) {
  let isRefreshing: boolean = false;
  let queue: QueueItem[] = []

  const enqueue = () => {
    return new Promise<void>((resolve, reject) => queue.push({ resolve, reject }))
  }

  async function handle401(error: any, instance: AxiosInstance, authInstance: AxiosInstance) {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) throw error;

    original._retry = true
    if (isRefreshing) {
      await enqueue();
      return instance(original)
    }

    isRefreshing = true;
    try {
      console.log("Token expirado, atualizando token...");

      const response = await authInstance.post("/auth/token/refresh", null, {
        withCredentials: true
      });

      sessionStorage.setItem("expirationTime", response.data.expirationTime)

      queue.forEach((p) => p.resolve())
      queue = []

      return instance(original)
    } catch (error: any) {
      queue.forEach((p) => p.reject())
      queue = []

      if (error.response?.status === 401 || error.response?.status === 403) {
        // TODO: Make popup notification
        console.error("Sessão expirada. Você precisa fazer login novamente!");

        setTimeout(() => {
          sessionStorage.clear()
          window.location.reload()
        }, 3000);
      } else {
        console.error("Erro temporário no regfreshToken:", error);
      }
      throw error;
    } finally {
      isRefreshing = false;
    }
  }

  api.interceptors.request.use(async (config) => {
    if (
      !isRefreshing && !config.url?.includes("/auth/token/refresh")
    ) {
      console.log("Token proximo de expirar, atualizando...");
      isRefreshing = true

      try {
        const response = await apiAuth.post("/auth/token/refresh", null, {
          withCredentials: true
        })
        sessionStorage.setItem("expirationTime", response.data.tokenExpirationTime)
      } catch (error) {
        console.warn("Falha no refresh token:", error);

      } finally {
        isRefreshing = false
      }
    }

    return config
  })

  api.interceptors.response.use(
    (res) => res,
    (err) => handle401(err, api, apiAuth)
  );

  apiAuth.interceptors.response.use(
    (res) => res,
    (err) => handle401(err, apiAuth, apiAuth)
  );

  return false;
}