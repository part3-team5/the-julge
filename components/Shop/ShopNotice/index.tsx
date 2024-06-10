import React, { useState, useEffect } from "react";
import ShopNoticeEmpty from "./ShopNoticeEmpty";
import ShopNoticeForm from "./ShopNoticeForm";
import ShopNoticeView from "./ShopNoticeView";
import { instance } from "@/utils/instance";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { NoticeResponse } from "./ShopNotice.types";

interface ShopNoticeProps {
  showNoticeForm: boolean;
  setShowNoticeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShopNotice({ showNoticeForm, setShowNoticeForm }: ShopNoticeProps) {
  const [noticeData, setNoticeData] = useState<NoticeResponse | null>(null);
  const shopValue = useRecoilValue(employerAtom);
  const shopId = shopValue.shopId;

  const getNoticeData = async () => {
    try {
      const response = await instance.get<NoticeResponse>(
        `/shops/${shopId}/notices`
      );
      if (response.status === 200) {
        setNoticeData(response.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    getNoticeData();
  }, [shopId]);

  const handleOpenForm = () => {
    setShowNoticeForm(true);
  };

  const handleCloseForm = () => {
    setShowNoticeForm(false);
  };

  const handleSubmitForm = () => {
    setShowNoticeForm(false);
    getNoticeData();
  };

  return (
    <>
      {showNoticeForm ? (
        <ShopNoticeForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />
      ) : noticeData && noticeData.items.length > 0 ? (
        <ShopNoticeView noticeData={noticeData} />
      ) : (
        <ShopNoticeEmpty onClick={handleOpenForm} />
      )}
    </>
  );
}

export default ShopNotice;
