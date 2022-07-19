import React from "react";

export interface typeUser {
  id?: number,
  full_name: string,
  email: string,
  password: string,
  phone_number: number,
  avatar: string,
  city: string,
  district: string,
  ward: string,
  address: string,
  is_admin: boolean,
  key: React.Key | string | number
}