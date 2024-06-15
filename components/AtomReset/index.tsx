import React from "react";
import { useResetRecoilState } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { profileAtom } from "@/atoms/profileAtom";
import { authState, signupState } from "@/atoms/userAtom";

export const AtomReset = ({ onReset }: { onReset: (resetState: () => void) => void }) => {
  const resetEmployer = useResetRecoilState(employerAtom);
  const resetProfile = useResetRecoilState(profileAtom);
  const resetAuth = useResetRecoilState(authState);
  const resetSignup = useResetRecoilState(signupState);

  const resetState = () => {
    resetEmployer();
    resetProfile();
    resetAuth();
    resetSignup();
  };

  React.useEffect(() => {
    onReset(resetState);
  }, [onReset]);

  return null;
};
