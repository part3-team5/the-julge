import Link from "next/link";
import styles from "./ToSignup.module.scss";

export default function ToSignup() {
  return (
    <div className={styles.wrapper}>
      <p>회원이 아니신가요?</p>
      <Link href="/signup">회원가입하기</Link>
    </div>
  );
}
