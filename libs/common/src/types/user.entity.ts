export type User = {
  id: number;
  name: string;
  login: string;
  email?: string;
  password: string;
  active: boolean;
  superAdmin?: boolean;
  userProfileId: number;
  createdAt: Date;
  createdBy?: number;
  updatedAt?: Date;
  updatedBy?: number;
  forceNewPass?: boolean;
};
