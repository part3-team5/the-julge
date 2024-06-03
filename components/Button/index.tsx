import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { ButtonProps } from "@/types/button";

const cx = classNames.bind(styles);

const Button = ({
  children,
  btnColorType,
  onClick,
  btnCustom,
}: ButtonProps) => {
  return (
    <button
      className={cx(btnColorType, btnCustom)}
      onClick={onClick}
      disabled={btnColorType === "gray"}
    >
      {children}
    </button>
  );
};

export default Button;

/*
Ex)
<Button btnColorType="" onClick={handleExampleFnc}>
  가입하기
</Button>

Props 
- children : 버튼 이름
- btnColorType : orange | white | gray 중 하나
- onClick (옵셔널) : 클릭 이벤트 함수 
- btnCustom (옵셔널) : 별도로 CSS 추가가 필요할 시 이용
*/
