import React, { useState, useRef } from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import Image from "next/image";
import { Drawer } from "antd";
import Review from "./review";
import ModalCompleteStep from "../../setting/complete_modal";
import SendEmail from "./sendemail";

export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSend, setIsModalSend] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div
          className={`${styles.main__control_add}`}
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <button
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
            onClick={() => setIsModalCancel(true)}
          >
            <img
              width="14"
              height="10"
              src="https://crm.timviec365.vn/assets/icons/email/eye2.svg"
              alt=""
            />
            Xem trước
          </button>
          {
            <Review
              isModalCancel={isModalCancel}
              setIsModalCancel={setIsModalCancel}
            />
          }
          <button
            type="button"
            onClick={handleOK}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
            style={{ marginLeft: "auto" }}
          >
            <img src="https://crm.timviec365.vn/assets/icons/email/nhap.svg" />
            Lưu nháp
            <input type="file" hidden ref={inputFileRef} />
          </button>
          <ModalCompleteStep
            modal1Open={isOpenMdalSuccess}
            setModal1Open={setIsOpenMdalSuccess}
            title={"Lưu bản nháp thành công"}
            link={"/marketing/email"}
          />

          <button
            type="button"
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            style={{background: "#FFA800"}}
            onClick={() => setIsModalSend(true)}
          >
            <img width="14" height="11" src="https://crm.timviec365.vn/assets/icons/email/mail2.svg" alt="" className="icon_action"/>
           Gửi thử
          </button>
          {
            <SendEmail
              isModalCancel={isModalSend}
              setIsModalCancel={setIsModalSend}
            />
          }
        </div>
      </div>

    </>
  );
}
