import React from 'react';
import { queryParams, tokenPayload } from './common';
import { role } from './role';

export interface user {
  id: number | string;
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
  roleId: number;
  // role: role;
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
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

export interface updateUser {
  id: string | number;
  email: string;
  avatar?: string;
  fullname: string;
  phone: string;
  ward: string;
  gender: boolean;
  resetValues?: Function;
}

export interface deleteUser extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllUser extends tokenPayload {
  params?: getAllUserParams;
}

export interface getAllUserParams extends queryParams {
  fullname?: string;
  email?: string;
  phone?: string;
}
