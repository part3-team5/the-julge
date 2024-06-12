import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.items}>
        <span className={styles.copyright}>&copy;codeit - 2024</span>
        <div className={styles.footerLinks}>
          <Link href="/#">Privacy Policy</Link>
          <Link href="/#">FAQ</Link>
        </div>
        <div className={styles.sns}>
          <Link href="/#" rel="noopener noreferrer">
            <Image
              priority
              src="/image/icon/envelope-square.svg"
              alt="이메일 로고 "
              height={25}
              width={25}
            />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              priority
              src="/image/icon/facebook-square.svg"
              alt="facebook 홈페이지로 연결된 facebook 로고"
              height={25}
              width={25}
            />
          </Link>

          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              priority
              src="/image/icon/instagram-square.svg"
              alt="instagram 홈페이지로 연결된 instagram 로고"
              height={25}
              width={25}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
