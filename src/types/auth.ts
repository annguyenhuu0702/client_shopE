export interface registerDto {
  email: string;
  password: string;
  full_name: string;
}

export interface loginDto {
  email: string;
  password: string;
}

export interface changeProfileDto {
  fullname: string;
  birthday: Date;
  gender: boolean;
}

export interface changePasswordDto {
  currentpassword: string;
  newpassword: string;
}

export interface changeEmailDto {
  email: string;
}
