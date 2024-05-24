export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  user: User;
  token: string;
  // TODO: Aun no se sabe que retornara la función
}
