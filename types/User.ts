import { IShopData } from "./Shop";

export interface IUserData {
  id: string;
  type: "employee" | "employer";
  email: string;
  bio?: string;
  address?: string;
  name?: string;
  phone?: string;
}

export interface IUserWithShopData extends IUserData {
  shop: IShopData;
}

export interface IApplicant {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  user: IUserData;
}
