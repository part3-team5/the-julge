// 전체 공고 내 상세 필터 버튼 및 모달
import React, { useState, useEffect, useRef } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { locations } from "@/constants/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import Button from "../Button";

const cx = classNames.bind(styles);

const Filter = () => {
  const initialSelectedDate = new Date();
  const initialSelectedLocations: string[] = [];
  const initialInputValue = "";

  const [selectedDate, setSelectedDate] = useState<Date>(initialSelectedDate);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialSelectedLocations);
  const [inputValue, setInputValue] = useState<string>(initialInputValue);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      handleCloseFilter();
    }
  };

  useEffect(() => {
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const sortedLocations = locations.slice().sort(); // 위치 목록 정렬

  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date || initialSelectedDate);
  };

  const handleSelectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setSelectedDate(initialSelectedDate);
    setSelectedLocations(initialSelectedLocations);
    setInputValue(initialInputValue);
  };

  return (
    <div className={cx("filter__container")}>
      <button className={cx("filter__btn")} onClick={handleOpenFilter}>
        상세 필터
      </button>
      {isFilterOpen && (
        <div className={cx("filter__content")} ref={filterRef}>
          <h2 className={cx("filter__title")}>상세 필터</h2>
          <div className={cx("filter__section")}>
            <h3 className={cx("filter__subtitle")}>위치</h3>
            <div className={cx("filter__locationBox")}>
              {sortedLocations.map((location, index) => (
                <button
                  key={index}
                  className={cx("filter__locationBtn")}
                  onClick={() => handleSelectLocation(location)}
                >
                  {location}
                </button>
              ))}
            </div>
            <div className={cx("filter__selectedLocations")}>
              {selectedLocations.map((location, index) => (
                <div key={index} className={cx("filter__selectedLocation")}>
                  <span>{location}</span>
                  <button
                    onClick={() => handleRemoveLocation(location)}
                    className={cx("filter__removeBtn")}
                  >
                    <Image
                      src="/image/icon/location_remove.svg"
                      width={16}
                      height={16}
                      alt="remove location button"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("filter__bar")} />
          <div className={cx("filter__section")}>
            <h3 className={cx("filter__subtitle")}>시작일</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleChangeDate}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="Select a date"
              locale={ko}
              className={cx("filter__date")}
            />
          </div>
          <div className={cx("filter__bar")} />
          <div className={cx("filter__section")}>
            <h3 className={cx("filter__subtitle")}>금액</h3>
            <div className={cx("filter__priceBox")}>
              <div className={cx("filter__inputWrap")}>
                <input
                  className={cx("filter__input")}
                  type="text"
                  onChange={handleChangeInput}
                  value={inputValue}
                  placeholder="입력"
                />
                <span>원</span>
                {/* 숫자가 아닐 시 에러 이벤트 추가 필요 */}
              </div>
              <span>이상부터</span>
            </div>
          </div>
          <div className={cx("filter__btnContainer")}>
            <div className={cx("filter__whiteBtn")}>
              <Button btnColorType="white" onClick={handleReset}>
                초기화
              </Button>
            </div>
            <div className={cx("filter__orangeBtn")}>
              <Button btnColorType="orange" onClick={handleCloseFilter}>
                적용하기
              </Button>
            </div>
          </div>
          <button className={cx("filter__close")} onClick={handleCloseFilter}>
            <Image src="/image/icon/close.svg" width={24} height={24} alt="close button" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
