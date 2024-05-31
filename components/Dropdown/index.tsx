import { useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: string[];
}

function Dropdown({ options }: DropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOptions(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles["dropdown"]}>
        <input
          type="text"
          className={styles["dropdown__input"]}
          placeholder="선택"
          value={selectedOptions}
          onClick={toggleDropdown}
          readOnly
        />
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
    </div>
  );
}

export default Dropdown;
