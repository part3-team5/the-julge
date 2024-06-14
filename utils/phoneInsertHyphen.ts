const phoneInsertHyphen = (phoneNumber: string | undefined) => {
  const returnPhoneNumber = phoneNumber
    ? phoneNumber
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, (_, g1, g2, g3) => {
          const groups = [g1, g2, g3].filter((group) => group !== "");
          return groups.join("-");
        })
    : "";

  return returnPhoneNumber;
};

export default phoneInsertHyphen;
