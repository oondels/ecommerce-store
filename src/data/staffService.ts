import { StaffMember, staffData } from './staffData';

// Simulating backend service with localStorage
class StaffService {
  private storageKey = 'staff_data';

  constructor() {
    // Initialize localStorage with mock data if empty
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(staffData));
    }
  }

  getAllStaff(): StaffMember[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getStaffById(id: string): StaffMember | undefined {
    const staff = this.getAllStaff();
    return staff.find(member => member.id === id);
  }

  addStaff(member: Omit<StaffMember, 'id'>): StaffMember {
    const staff = this.getAllStaff();
    const newMember = {
      ...member,
      id: (staff.length + 1).toString()
    };
    
    staff.push(newMember);
    localStorage.setItem(this.storageKey, JSON.stringify(staff));
    return newMember;
  }

  updateStaff(id: string, updates: Partial<StaffMember>): StaffMember | null {
    const staff = this.getAllStaff();
    const index = staff.findIndex(member => member.id === id);
    
    if (index === -1) return null;
    
    const updatedMember = { ...staff[index], ...updates };
    staff[index] = updatedMember;
    localStorage.setItem(this.storageKey, JSON.stringify(staff));
    return updatedMember;
  }

  deleteStaff(id: string): boolean {
    const staff = this.getAllStaff();
    const index = staff.findIndex(member => member.id === id);
    
    if (index === -1) return false;
    
    staff.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(staff));
    return true;
  }

  resetToDefault(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(staffData));
  }
}

export const staffService = new StaffService();