import { INoticeData } from "@/types/Notice";
import { IShopData } from "@/types/Shop";
import { IUserData } from "@/types/User";

export interface IApplicantGetApiData {
  item: {
    createdAt: string;
    id: string;
    notice: {
      href: string;
      item: INoticeData;
    };
    shop: {
      href: string;
      item: IShopData;
    };
    status: "pending" | "accepted" | "rejected" | "canceled";
    user: {
      href: string;
      item: IUserData;
    };
  };
}
