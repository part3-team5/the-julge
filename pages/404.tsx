import Link from "next/link";
import styles from "../styles/notFound.module.scss";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className={styles.notFound_container}>
        <Image
          src="https://cdn-icons-png.flaticon.com/128/1466/1466643.png"
          alt="notFound"
          width={100}
          height={100}
        />
        <div className={styles.notFound_content}>찾을 수 없는 페이지입니다.</div>
        <Link href="/">
          <button className={styles.notFound_button}>홈으로 이동</button>
        </Link>
      </div>
    </>
  );
}
