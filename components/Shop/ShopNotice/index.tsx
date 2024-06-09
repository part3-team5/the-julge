import React, { useState } from "react";
import ShopNoticeEmpty from "./ShopNoticeEmpty";
import ShopNoticeForm from "./ShopNoticeForm";

function ShopNotice() {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm ? (
        <ShopNoticeForm onClose={handleCloseForm} />
      ) : (
        <ShopNoticeEmpty onClick={handleOpenForm} />
      )}
    </>
  );
}

export default ShopNotice;
