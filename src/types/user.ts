import React from 'react';

export interface typeUser {
  // id?: number,
  // full_name: string,
  // email: string,
  // password: string,
  // phone_number: number,
  // avatar: string,
  // city: string,
  // district: string,
  // ward: string,
  // address: string,
  // is_admin: boolean,
  // key: React.Key | string | number

  id: number;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  email: string;
  city: string;
  ward: string;
  district: string;
  street: string;
  avatar: string;
  phone: string;
  key: React.Key | string | number;
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
  // userRoles
}
