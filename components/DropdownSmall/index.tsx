import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./DropdownSmall.module.scss";
import ArrowUpIcon from "@/public/image/icon/ArrowUp.svg";
import ArrowDownIcon from "@/public/image/icon/ArrowDown.svg";
import useOutsideClick from "@/hooks/useOutsideClick";
import { DropdownSmallProps } from "./DropdownSmall.types";

const DropdownSmall: React.FC<DropdownSmallProps> = ({ onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("time");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "time", name: "마감임박순" },
    { value: "pay", name: "시급많은순" },
    { value: "hour", name: "시간적은순" },
    { value: "shop", name: "가나다순" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
    onOptionSelect(optionValue);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleEnterKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleDropdown();
      }
    },
    [toggleDropdown]
  );

  const handleOptionKeyPress = useCallback(
    (event: React.KeyboardEvent, optionValue: string) => {
      if (event.key === "Enter" || event.key === " ") {
        handleOptionClick(optionValue);
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
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <input
          type="text"
          className={styles["dropdown__input"]}
          value={options.find((option) => option.value === selectedOption)?.name || ""}
          readOnly
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
          aria-label="Selected option"
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
        <ul className={styles["dropdown__optionBox"]} role="listbox">
          {options.map(({ value, name }) => (
            <li
              key={value}
              className={styles["dropdown__option"]}
              onClick={() => handleOptionClick(value)}
              onKeyDown={(e) => handleOptionKeyPress(e, value)}
              tabIndex={0}
              role="option"
              aria-selected={selectedOption === value}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSmall;
