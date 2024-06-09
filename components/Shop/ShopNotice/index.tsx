import React, { useState, useEffect } from "react";
import ShopNoticeEmpty from "./ShopNoticeEmpty";
import ShopNoticeForm from "./ShopNoticeForm";
import ShopNoticeView from "./ShopNoticeView";
import { instance } from "@/utils/instance";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";

function ShopNotice() {
  const [showForm, setShowForm] = useState(false);
  const [noticeData, setNoticeData] = useState(null);
  const shopValue = useRecoilValue(employerAtom);
  const shopId = shopValue.shopId;

  const getNoticeData = async () => {
    try {
      const response = await instance.get(`/shop/${shopId}/notices`);
      if (response.status === 200) {
        setNoticeData(response.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    getNoticeData();
  }, []);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = () => {
    setShowForm(false);
    getNoticeData();
  };

  return (
    <>
      {showForm ? (
        <ShopNoticeForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />
      ) : noticeData ? (
        <ShopNoticeView noticeData={noticeData} />
      ) : (
        <ShopNoticeEmpty onClick={handleOpenForm} />
      )}
    </>
  );
}

export default ShopNotice;
