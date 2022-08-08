export interface typeRegister {
  email: string;
  password: string;
  full_name: string;
}

export interface typeLogin {
  email: string;
  password: string;
}

export interface typeChangProfile {
  fullname: string;
  birthday: Date;
  gender: boolean;
}

// export interface typeToken {
//   token: string;
// }
