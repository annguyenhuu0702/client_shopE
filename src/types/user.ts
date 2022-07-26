import React from 'react';

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
  avatar: string;
  phone: string;
  isDeleted: boolean;
  key: React.Key | string | number;
  // votes
  // repVotes
  // productUsers
  // comments
  // repComments
  // userRoles
}
