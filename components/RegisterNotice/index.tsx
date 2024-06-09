// import classNames from "classnames/bind";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";

// import styles from "../Profile.module.scss";
// import { locations } from "@/constants/constants";
// import Dropdown from "@/components/Dropdown";
// import Button from "@/components/Button";
// import Input from "@/components/Input";
// import { FormData, RegisterNoticeProps, noticeData } from "./index.types";
// import { instance } from "@/utils/instance";
// import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
// import { IModalProps } from "@/components/Modal/Modal.types";

// const cx = classNames.bind(styles);

// const RegisterNotice: React.FC<RegisterNoticeProps> = ({ onClose, onSubmit }) => {
//   const { register, handleSubmit, setValue } = useForm<FormData>();
//   const [userId, setUserId] = useState<string | null>(null);
//   const [showAlert, setShowAlert] = useState(false);
//   const [modalData, setModalData] = useState<IModalProps>({
//     modalType: "",
//     content: "",
//     btnName: [""],
//   });

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   const handleCloseAlert = () => {
//     setShowAlert(false);
//     onClose();
//   };

//   const handleSubmitForm = async (data: FormData) => {
//     const body: noticeData = {
//       hourlyPay: data.hourlyPay,
//       startsAt: data.startsAt,
//       workhour: data.workhour,
//       description: data.description,
//     };

//   //   try {
//   //     const response = await instance.post(`/shops/${userId}`, body);
//   //     if (response.status === 200) {
//   //       setModalData({
//   //         modalType: "alert",
//   //         content: "등록이 완료되었습니다.",
//   //         btnName: ["확인"],
//   //       });
//   //       setShowAlert(true);
//   //       onSubmit();
//   //     } else {
//   //       alert("프로필 데이터를 제대로 입력해주세요.");
//   //     }
//   //   } catch (error) {
//   //     console.log("PUT Error:", error);
//   //   }
//   // };

//   return (
//     <main className={cx(["profile"], ["main"])}>
//       <div className={cx("header")}>
//         <h1 className={cx("title")}>공고 등록</h1>
//         <Image
//           src="/image/icon/shop_close.svg"
//           width={32}
//           height={32}
//           alt="close button"
//           onClick={onClose}
//           className={cx("close-button")}
//         />
//       </div>
//       <form className={cx("form")} onSubmit={handleSubmit(handleSubmitForm)}>
//         <div className={cx("input-wrapper")}>
//           <section className={cx("input__section")}>
//             <Input
//               label="시급"
//               type="number"
//               id="hourlyPay"
//               register={register("hourlyPay", { required: true })}
//             />
//           </section>
//           <section className={cx("input__section")}>
//             <Input
//               label="시작 일시"
//               type="text"
//               id="startsAt"
//               register={register("startsAt", {
//                 required: true,
//               })}
//             />
//           </section>
//           <section className={cx("input-section")}>
//             <Input
//               label="업무 시간"
//               type="number"
//               id="workhour"
//               register={register("workhour", {
//                 required: true,
//               })}
//             />
//           </section>
//         </div>
//         <section className={cx("textarea-section")}>
//           <Input
//             label="공고 설명"
//             type="text"
//             id="description"
//             register={register("description", { required: true })}
//             isTextArea={true}
//           />
//         </section>
//         <div className={cx("button-section")}>
//           <div className={cx("button-wrapper")}>
//             <Button btnColorType="orange">등록하기</Button>
//           </div>
//         </div>
//       </form>
//       {showAlert && (
//         <div className={cx("overlay")}>
//           <ConfirmModal
//             modalData={modalData}
//             closeFunction={handleCloseAlert}
//           />
//         </div>
//       )}
//     </main>
//   );
// };

// export default RegisterNotice;
