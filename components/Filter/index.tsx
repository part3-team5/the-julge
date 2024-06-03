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

interface FilterProps {
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  const initSelectedDate = new Date();
  const initSelectedLocations: string[] = [];
  const initInputValue = "";

  const [selectedDate, setSelectedDate] = useState<Date>(initSelectedDate);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initSelectedLocations);
  const [inputValue, setInputValue] = useState<string>(initInputValue);
  const [error, setError] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 요소 클릭 시 닫김
  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedLocations = locations.slice().sort(); // 위치 목록 정렬

  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date || initSelectedDate);
  };

  const handleSelectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  };

  // 금액 input에 숫자가 아닌 값 입력 시 error
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number(value)) {
      setError("숫자를 입력하세요.");
    } else {
      setError("");
      setInputValue(value);
    }
  };

  // 초기화
  const handleReset = () => {
    setSelectedDate(initSelectedDate);
    setSelectedLocations(initSelectedLocations);
    setInputValue(initInputValue);
  };

  return (
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
          </div>
          <span>이상부터</span>
        </div>
        {error && <p className={cx("filter__error")}>{error}</p>}
      </div>
      <div className={cx("filter__btnContainer")}>
        <div className={cx("filter__whiteBtn")}>
          <Button btnColorType="white" onClick={handleReset}>
            초기화
          </Button>
        </div>
        <div className={cx("filter__orangeBtn")}>
          <Button btnColorType="orange">적용하기</Button>
        </div>
      </div>
      <button className={cx("filter__close")} onClick={onClose}>
        <Image src="/image/icon/close.svg" width={24} height={24} alt="close button" />
      </button>
    </div>
  );
};

export default Filter;
