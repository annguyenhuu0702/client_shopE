import React from 'react';
import { QueryParams } from './common';

export interface typeUser {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  email: string;
  city: string;
  ward: string;
  district: string;
  street: string;
  birthday: Date;
  avatar: string;
  phone: string;
  gender: boolean;
  isDeleted: boolean;
  key?: React.Key | string | number;
  resetValues?: Function;
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
  // userRoles
}

export interface createUser {
  email: string;
  password: string;
  avatar?: string;
  fullname: string;
  phone: string;
  ward: string;
  gender: boolean;
  resetValues?: Function;
}

export interface getAllUserTokenPayload {
  token: string | null;
  dispatch: any;
  params?: getAllUserParams;
}

export interface getAllUserParams extends QueryParams {
  fullname?: string;
  email?: string;
  phone?: string;
}
