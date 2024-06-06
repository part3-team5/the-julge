import ShopEmpty from "@/components/Shop/ShopEmpty";
import ShopForm from "@/components/Shop/ShopForm";
import { useState } from "react";

const MyShop = () => {
  const [showShopForm, setShowShopForm] = useState(false);

  const handleShopButtonClick = () => {
    setShowShopForm(true);
  };

  const handleCloseShopForm = () => {
    setShowShopForm(false);
  };

  return (
    <>
      {showShopForm ? (
        <ShopForm onClose={handleCloseShopForm} />
      ) : (
        <ShopEmpty onClick={handleShopButtonClick} />
      )}
    </>
  );
};

export default MyShop;
