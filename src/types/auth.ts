export interface typeRegister {
  email: string;
  password: string;
  full_name: string;
}

export interface typeLogin {
  email: string;
  password: string;
}

export interface typeChangeProfile {
  fullname: string;
  birthday: Date;
  gender: boolean;
}

export interface typeChangePassword {
  currentpassword: string;
  newpassword: string;
}

export interface typeChangeEmail {
  email: string;
}

// export interface typeToken {
//   token: string;
// }
