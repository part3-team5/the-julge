import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { ButtonProps } from "@/types/button";

const cx = classNames.bind(styles);

const Button = ({ children, btnColorType, onClick }: ButtonProps) => {
  return (
    <button className={cx(btnColorType)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

/*
Ex)
<Button btnColorType="orenge" onClick={handleExampleFnc}>
  가입하기
</Button>

Props 
- children : 버튼 이름
- btnColorType : orenge | white | gray 중 하나
- onClick (옵셔널) : 클릭 이벤트 함수 
*/
