// 전체 공고 내 상세 필터 버튼 및 모달
import React, { useState, useEffect, useRef } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { LOCATIONS } from "@/constants/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import Button from "../Button";
import { IModalProps } from "../Modal/Modal.types";
import ConfirmModal from "../Modal/ModalContent/ConfirmModal";

const cx = classNames.bind(styles);

interface FilterProps {
  onClose: () => void;
  onApplyFilter: (locations: string[], date: Date | null, pay: number | null) => void;
}

const Filter: React.FC<FilterProps> = ({ onClose, onApplyFilter }) => {
  const initSelectedDate = new Date();
  initSelectedDate.setDate(initSelectedDate.getDate() + 1);
  const initSelectedLocations: string[] = [];
  const initInputValue = "";

  const [selectedDate, setSelectedDate] = useState<Date>(initSelectedDate);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initSelectedLocations);
  const [inputValue, setInputValue] = useState<string>(initInputValue);
  const [error, setError] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleApply = () => {
    onApplyFilter(selectedLocations, selectedDate, inputValue ? parseInt(inputValue, 10) : null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedLocations = LOCATIONS.slice().sort();

  const handleChangeDate = (date: Date) => {
    const currentDate = new Date();
    if (date < currentDate) {
      setModalData({
        modalType: "alert",
        content: "오늘 이후의 날짜를 선택하세요.",
        btnName: ["확인"],
      });
      setShowAlert(true);
    } else {
      setSelectedDate(date || initSelectedDate);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
    const value = e.target.value;
    if (!Number(value)) {
      setError("숫자를 입력하세요.");
    } else {
      setError("");
      setInputValue(value);
    }
  };

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
          <Button btnColorType="orange" onClick={handleApply}>
            적용하기
          </Button>
        </div>
      </div>
      <button className={cx("filter__close")} onClick={onClose}>
        <Image src="/image/icon/close.svg" width={24} height={24} alt="close button" />
      </button>
      {showAlert && (
        <div className={cx("overlay")}>
          <ConfirmModal modalData={modalData} closeFunction={handleCloseAlert} />
        </div>
      )}
    </div>
  );
};

export default Filter;
