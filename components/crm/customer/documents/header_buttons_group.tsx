import React, { useEffect, useState } from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import UploadDocumentModal from "./document_upload_modal";
export default function HeaderBtnsDocumentEngine({ id }: any) {
  const [isOpenMdal, setIsOpenMdal] = useState(false);

  return (
    <>
      <div className={styles.main__control}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form onSubmit={() => false}>
              <input
                style={{ height: "46px" }}
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tài liệu đính kèm"
              />
              <button className={styles.kinh_lup}>
                <img
                  className={styles.img__search}
                  src="https://crm.timviec365.vn/assets/icons/search.svg"
                  alt=""
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpenMdal(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      <UploadDocumentModal
        isModalCancel={isOpenMdal}
        setIsModalCancel={setIsOpenMdal}
      />
    </>
  );
}
