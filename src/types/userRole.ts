export interface userRole {
  userId: number;
  roleId: number;
  assignedAt: string;
  role: role;
}

export interface role {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  isDeleted: boolean;
}
