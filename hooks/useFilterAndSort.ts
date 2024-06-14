import { useState, useEffect } from "react";
import { NoticeItem } from "@/types/types";

const useFilterAndSort = (notices: NoticeItem[], initialSortOption: string) => {
  const [filteredAndSortedNotices, setFilteredAndSortedNotices] = useState<NoticeItem[]>([]);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [minPay, setMinPay] = useState<number | null>(null);

  const sortNotices = (notices: NoticeItem[], option: string): NoticeItem[] => {
    switch (option) {
      case "pay":
        return [...notices].sort((a, b) => b.hourlyPay - a.hourlyPay);
      case "hour":
        return [...notices].sort((a, b) => a.workhour - b.workhour);
      case "shop":
        return [...notices].sort((a, b) => a.shop.item.name.localeCompare(b.shop.item.name));
      case "new":
        return [...notices].sort(
          (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
        );
      case "time":
      default:
        return [...notices].sort(
          (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );
    }
  };

  const filterAndSortNotices = () => {
    let filtered = [...notices];

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((notice) => selectedLocations.includes(notice.shop.item.address1));
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (notice) => new Date(notice.startsAt).getTime() >= selectedDate.getTime()
      );
    }

    if (minPay !== null) {
      filtered = filtered.filter((notice) => notice.hourlyPay >= minPay);
    }

    const sorted = sortNotices(filtered, sortOption);
    setFilteredAndSortedNotices(sorted);
  };

  useEffect(() => {
    filterAndSortNotices();
  }, [notices, selectedLocations, selectedDate, minPay, sortOption]);

  return {
    filteredAndSortedNotices,
    setSortOption,
    setSelectedLocations,
    setSelectedDate,
    setMinPay,
  };
};

export default useFilterAndSort;
