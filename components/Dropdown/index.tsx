import { useState, useRef } from "react";
import Image from "next/image";
import { DropdownProps } from "./Dropdown.types";
import classNames from "classnames/bind";

import styles from "./Dropdown.module.scss";
import ArrowUpIcon from "../../public/image/icon/ArrowUp.svg";
import ArrowDownIcon from "../../public/image/icon/ArrowDown.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

const cx = classNames.bind(styles);

function Dropdown({ options, id, onChange, init = "선택" }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(init);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const inputClassName = cx("dropdown__input", {
    "dropdown__input--selected": selectedOption !== init,
  });

  return (
    <div className={cx("dropdown")} ref={dropdownRef}>
      <div className={cx("dropdown__inputWrapper")} onClick={toggleDropdown}>
        <input
          type="text"
          className={inputClassName}
          placeholder={init}
          value={selectedOption}
          id={id}
          readOnly
        />
        {isOpen ? (
          <Image
            src={ArrowDownIcon}
            alt="Arrow Down"
            width={16}
            height={16}
            className={cx("dropdown__icon")}
          />
        ) : (
          <Image
            src={ArrowUpIcon}
            alt="Arrow Up"
            width={16}
            height={16}
            className={cx("dropdown__icon")}
          />
        )}
      </div>
      {isOpen && (
        <ul className={cx("dropdown__optionBox")}>
          {options.map((option) => (
            <li
              key={option}
              className={cx("dropdown__option")}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
