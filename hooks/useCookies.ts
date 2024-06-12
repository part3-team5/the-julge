import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import axios from "axios";

export type AuthInfo = {
  jwt: string;
  userType: string;
  id: string;
  isSuccess: boolean;
};

export default function useCookie(): AuthInfo {
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/api/auth`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isSuccess, refetch } = useQuery("apiauth", getUserInfo, {
    staleTime: 10000,
    cacheTime: 60000,
  });

  useEffect(() => {
    refetch();
  }, []);

  return { ...data, isSuccess };
}

// import { useEffect } from "react";
// import axios from "axios";
// import { atom, useRecoilState } from "recoil";

// const authState = atom({
//   key: "authState",
//   default: {
//     jwt: "",
//     userType: "",
//     id: "",
//     isSuccess: false,
//   },
// });

// export default function useCookie() {
//   const [authInfo, setAuthInfo] = useRecoilState(authState);

//   useEffect(() => {
//     const getUserInfo = async () => {
//       try {
//         const { data } = await axios.get(`/api/auth`);
//         setAuthInfo(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getUserInfo();
//   }, []);

//   return authInfo;
// }
