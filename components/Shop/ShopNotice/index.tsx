import React, { useState, useEffect } from "react";
import ShopNoticeEmpty from "./ShopNoticeEmpty";
import ShopNoticeForm from "./ShopNoticeForm";
import { instance } from "@/utils/instance";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { NoticeResponse } from "./ShopNotice.types";

interface ShopNoticeProps {
  showNoticeForm: boolean;
  setShowNoticeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShopNotice({ showNoticeForm, setShowNoticeForm }: ShopNoticeProps) {
  const shopValue = useRecoilValue(employerAtom);
  const shopId = shopValue.shopId;

  useEffect(() => {}, [shopId]);

  const handleOpenForm = () => {
    setShowNoticeForm(true);
  };

  const handleCloseForm = () => {
    setShowNoticeForm(false);
  };

  const handleSubmitForm = () => {
    setShowNoticeForm(false);
  };

  return (
    <>
      {showNoticeForm ? (
        <ShopNoticeForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />
      ) : (
        <ShopNoticeEmpty onClick={handleOpenForm} />
      )}
    </>
  );
}

export default ShopNotice;
