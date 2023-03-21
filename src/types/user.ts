import React from 'react';
import { queryParams, tokenPayload } from './common';

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  deletedAt: Date;
  email: string;
  city: string;
  ward: string;
  district: string;
  address: string;
  birthday: Date;
  avatar: string;
  phone: string;
  gender: boolean;
  role: string;
  key?: React.Key | string | number;
  resetValues?: Function;
}

export interface ICreateUser {
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  phone: string;
  gender: boolean;
  resetValues?: Function;
}

export interface IUpdateUser {
  id: number;
  email: string;
  avatar: string;
  fullname: string;
  phone: string;
  gender: boolean;
  resetValues?: Function;
}

export interface IGetAllUser extends tokenPayload {
  params?: IGetAllUserParams;
}

export interface IGetAllUserParams extends queryParams {
  fullname?: string;
  email?: string;
  phone?: string;
}
