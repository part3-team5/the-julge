import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Dropdown.module.scss";
import ArrowUpIcon from "../../public/image/icon/ArrowUp.svg";
import ArrowDownIcon from "../../public/image/icon/ArrowDown.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

interface DropdownProps {
  options: string[];
}

function Dropdown({ options }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <div className={styles["dropdown__inputWrapper"]} onClick={toggleDropdown}>
        <input
          type="text"
          className={styles["dropdown__input"]}
          placeholder="선택"
          value={selectedOption}
          readOnly
        />
        {isOpen ? (
          <Image
            src={ArrowDownIcon}
            alt="Arrow Down"
            width={16}
            height={16}
            className={styles["dropdown__icon"]}
          />
        ) : (
          <Image
            src={ArrowUpIcon}
            alt="Arrow Up"
            width={16}
            height={16}
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
