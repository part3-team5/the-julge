import Image from "next/image";
import logo from "@/public/image/logo.svg";
import SignupForm from "@/components/Signup/SignupForm";
import ToSignin from "@/components/Signup/ToSignin";
import styles from "./Signup.module.scss";
import Link from "next/link";

export default function Signin() {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <Image src={logo} alt="logo_button" width={208} height={38} />
        </Link>
        <SignupForm />
        <ToSignin />
      </div>
    </div>
  );
}
