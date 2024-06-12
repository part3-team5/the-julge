export interface Shop {
  item: {
    name: string;
  };
}
export interface Notice {
  item: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
  };
}

export interface ApplicationItem {
  item: {
    id: string;
    status: string;
    shop: Shop;
    notice: Notice;
  };
}
