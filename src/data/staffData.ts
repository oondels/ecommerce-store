export interface StaffMember {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  role: 'Admin' | 'Employee';
  department: string;
  joinDate: string;
  avatar: string;
}

export const staffData: StaffMember[] = [
  {
    id: '1',
    name: 'Hendrius Felix',
    age: 25,
    email: 'hendrius.felix@example.com',
    phone: '(11) 98765-4321',
    role: 'Admin',
    department: 'Technology',
    joinDate: '2021-05-15',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Christopher Gomes',
    age: 25,
    email: 'christopher.gomes@example.com',
    phone: '(11) 91234-5678',
    role: 'Admin',
    department: 'Marketing',
    joinDate: '2022-01-10',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '3',
    name: 'Thalisson Reis',
    age: 22,
    email: 'thalisson.reis@example.com',
    phone: '(11) 98877-6655',
    role: 'Admin',
    department: 'Finance',
    joinDate: '2022-03-05',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: 'Marcone Junior',
    age: 20,
    email: 'marcone.junior@example.com',
    phone: '(11) 92233-4455',
    role: 'Employee',
    department: 'Customer Support',
    joinDate: '2023-08-20',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
  }
];