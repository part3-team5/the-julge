import { globalResetState } from "@/pages/_app";

export const deleteCookie = async (router: {
  push: (arg0: string) => Promise<any>;
  reload: () => any;
}) => {
  if (typeof window !== "undefined") {
    document.cookie = "id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "userType=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("accessToken");

    // Recoil 상태 초기화
    if (globalResetState) {
      globalResetState();
    }

    await router.push("/");
    if (typeof window !== "undefined") {
      router.reload();
    }
  }
};
