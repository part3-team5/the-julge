const phoneInsertHyphen = (phoneNumber: string | undefined) => {
  const returnPhoneNumber = phoneNumber
    ? phoneNumber
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
    : "";

  return returnPhoneNumber;
};

export default phoneInsertHyphen;
