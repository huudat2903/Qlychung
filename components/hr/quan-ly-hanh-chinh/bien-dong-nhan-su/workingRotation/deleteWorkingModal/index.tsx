import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from './deleteWorkingModal.module.css'
import { DeleteWorkingRotation } from "@/pages/api/api-hr/bien_dong_nhan_su";

export default function DeleteWorkingRotations({ onCancel, ep_id }: any) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onCancel]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('ep_id', ep_id);
      const response = await DeleteWorkingRotation(formData)
      if (response) {
        onCancel()
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div className={`${styles.modal_header} ${styles.header_process}`}>
                <p className={`${styles.modal_title}`}>Luân chuyển công tác</p>
              </div>
              <div className={`${styles.modal_body}`}>
                <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa bản ghi này không ? </p>
              </div>
              <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                <button className={`${styles.btn_add}`} onClick={handleSubmit}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}