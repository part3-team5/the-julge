const deleteCookie = (router: {
  push: (arg0: string) => Promise<any>;
  reload: () => any;
}) => {
  if (typeof window !== "undefined") {
    document.cookie = "id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userType=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/").then(() => {
      if (typeof window !== "undefined") {
        router.reload();
      }
    });
  }
};
export default deleteCookie;
