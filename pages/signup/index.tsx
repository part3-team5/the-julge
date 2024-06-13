import Image from "next/image";
import logo from "@/public/image/logo_large.svg";
import SignupForm from "@/components/Signup/SignupForm";
import ToSignin from "@/components/Signup/ToSignin";
import styles from "./Signup.module.scss";
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
        <SignupForm />
        <ToSignin />
      </div>
    </div>
  );
}
