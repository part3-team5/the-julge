import { IShopData } from "./Shop";

export interface INoticeData {
  closed: boolean;
  description: string;
  hourlyPay: number;
  id: string;
  startsAt: string;
  workhour: number;
}

export interface INoticeWithShopData extends INoticeData {
  shop: IShopData;
}

export interface INoticeDataProps {
  [key: string]: INoticeWithShopData;
}

export interface INoticeLinks {
  rel: string;
  method: string;
  href: string;
  description: string;
  body?: {
    description: string;
    hourlyPay: number;
    startsAt: string;
    workhour: string;
  };
  query?: {
    limit?: number;
    offset?: number;
  };
}
