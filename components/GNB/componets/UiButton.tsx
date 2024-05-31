import { BodyBold } from "../styles/fontStyle";
import styled from "@emotion/styled";

interface ButtonProps {
  name?: string;
  id?: string;
  handleClickButton: (pathname?: string) => void;
}

export default function UiButton({ name, id, handleClickButton }: ButtonProps) {
  const handleClickMovePage = () => {
    handleClickButton(id as string);
  };

  return (
    <Button type="button" onClick={handleClickMovePage}>
      {name}
    </Button>
  );
}

const Button = styled.button`
  height: 20px;
  background-color: transparent;
  line-height: 20px;
  ${BodyBold};
  border: none;
`;
