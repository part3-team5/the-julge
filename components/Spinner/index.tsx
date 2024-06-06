import Image from "next/image";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <Image src="/image/spinner.svg" width={200} height={200} alt="spinner" />
    </div>
  );
};

export default Spinner;
