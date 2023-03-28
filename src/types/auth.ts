export interface registerDto {
  email: string;
  password: string;
  full_name: string;
}

export interface loginDto {
  email: string;
  password: string;
}

export interface IFogotPassword {
  email: string;
}

export interface IResetPassword {
  id: number;
  token: string;
  password: string;
}

export interface changeProfileDto {
  fullname: string;
  birthday: Date;
  gender: boolean;
  phone?: string;
  email?: string;
  city?: string;
  district?: string;
  ward?: string;
  avatar?: string;
}

export interface changePasswordDto {
  currentpassword: string;
  newpassword: string;
}

export interface changeEmailDto {
  email: string;
}
