// 2곳 이상 쓰일 것 같아서 types폴더에 작성
export interface INoticeShopData {
  address1: string;
  address2: string;
  category: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  originalHourlyPay: number;
}

export interface INoticeData {
  closed: false;
  description: string;
  hourlyPay: number;
  id: string;
  startsAt: string;
  workhour: number;
  shop: INoticeShopData;
}

export interface INoticeDataProps {
  [key: string]: INoticeData;
}
