import Link from "next/link";
import styles from "./ToSignin.module.scss";

export default function ToSignin() {
  return (
    <div className={styles.wrapper}>
      <p>이미 가입 하셨나요?</p>
      <Link href="/signin" className={styles.link}>
        로그인하기
      </Link>
    </div>
  );
}
