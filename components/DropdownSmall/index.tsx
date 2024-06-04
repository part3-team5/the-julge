// 공고 목록에서만 쓰이는 작은 Dropdown
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./DropdownSmall.module.scss";
import ArrowUpIcon from "@/public/image/icon/ArrowUp.svg";
import ArrowDownIcon from "@/public/image/icon/ArrowDown.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

function DropdownSmall() {
  const [selectedOption, setSelectedOption] = useState("마감임박순");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["마감임박순", "시급많은순", "시간적은순", "가나다순"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  // Enter, SpaceBar 키로 onClick 이벤트처럼 사용 => UX 및 접근성 향상
  const handleEnterKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleDropdown();
      }
    },
    [toggleDropdown]
  );

  const handleOptionKeyPress = useCallback(
    (event: React.KeyboardEvent, option: string) => {
      if (event.key === "Enter") {
        handleOptionClick(option);
      }
    },
    [handleOptionClick]
  );

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <div
        className={styles["dropdown__inputWrapper"]}
        onClick={toggleDropdown}
        onKeyDown={handleEnterKeyPress}
        tabIndex={0}
      >
        <input
          type="text"
          className={styles["dropdown__input"]}
          value={selectedOption}
          readOnly
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        />
        {isOpen ? (
          <Image
            src={ArrowDownIcon}
            alt="Arrow Down"
            width={10}
            height={10}
            className={styles["dropdown__icon"]}
          />
        ) : (
          <Image
            src={ArrowUpIcon}
            alt="Arrow Up"
            width={10}
            height={10}
            className={styles["dropdown__icon"]}
          />
        )}
      </div>
      {isOpen && (
        <ul className={styles["dropdown__optionBox"]}>
          {options.map((option) => (
            <li
              key={option}
              className={styles["dropdown__option"]}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => handleOptionKeyPress(e, option)}
              tabIndex={0}
              role="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownSmall;
