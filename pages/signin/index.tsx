import Image from "next/image";
import logo from "@/public/image/logo_large.svg";
import SigninForm from "@/components/Signin/SigninForm";
import ToSignup from "@/components/Signin/ToSignup";
import styles from "./Signin.module.scss";
import Link from "next/link";

export const getStaticProps = async () => {
  return {
    props: {
      layoutType: "removeLayout",
    },
  };
};

export default function Signin() {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <Image src={logo} alt="logo_button" width={248} height={45} />
        </Link>
        <SigninForm />
        <ToSignup />
      </div>
    </div>
  );
}
