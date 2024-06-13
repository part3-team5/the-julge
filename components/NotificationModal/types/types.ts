export interface Notification {
  alertId: string;
  name: string;
  result: string;
  elapsedTime: string;
  formattedTime: string;
}

export interface NotificationItem {
  item: {
    id: string;
    createdAt: string;
    result: string;
    shop: {
      item: {
        name: string;
      };
    };
    notice: {
      item: {
        startsAt: string;
        workhour: number;
      };
    };
  };
}
