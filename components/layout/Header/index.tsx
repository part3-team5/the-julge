import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UiGnb from "./Uignb";

interface GnbClientProps {
  userType?: "guest" | "employee" | "employer";
}

export default function Gnb({ userType }: GnbClientProps) {
  const [hasNotification, setHasNotification] = useState(false);
  const [uType, setUType] = useState<
    "guest" | "employee" | "employer" | undefined
  >(userType);

  const router = useRouter();

  useEffect(() => {
    if (userType === "employee") {
      setHasNotification(true);
    }
    if (userType === "employer") {
      setHasNotification(false);
    }

    setUType(userType);
  }, [userType]);

  const handleCheckNotification = () => {
    setHasNotification(true);
  };

  const handleClickMovePage = (pathname?: string) => {
    router.push(`/${pathname}`);
  };

  return (
    <UiGnb
      userType={uType}
      hasNotification={hasNotification}
      handleClickMovePage={handleClickMovePage}
    />
  );
}
