import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CaptionStyle } from "../styles/fontStyle";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePressKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerm) {
        router.push(`/search?keyword=${searchTerm}`);
      }
    }
    if (event.key === "Escape") {
      setSearchTerm("");
    }
  };

  return (
    <SearchInput
      value={searchTerm}
      placeholder="가게 이름으로 찾아보세요"
      onChange={handleChangeInput}
      onKeyDown={handlePressKey}
    />
  );
}

const SearchInput = styled.input`
  grid-area: search;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dadde0;
  height: 40px;
  padding-left: 40px;

  &::placeholder {
    color: var(--gray40);
  }

  &:hover {
    background-color: var(--gray10);
  }

  ${CaptionStyle}

  background-image: url('/image/search.svg');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 36px;
    background-size: 16px 16px;
    font-style: caption;
  }
`;
