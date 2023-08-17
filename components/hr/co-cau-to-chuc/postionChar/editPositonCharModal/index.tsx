import React, { useState, useRef, useEffect } from 'react'
import styles from './editPositionModal.module.css'
import Select from 'react-select'
import { PostionCharUpdate } from '@/pages/api/api-hr/co_cau_to_chuc'

export default function EditPositionCharModal({
  idPosition,
  mission,
  onCancel,
}: any) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onCancel])

  const handleSubmit = async () => {
    try {
      const description = (
        document.getElementById('mota_nhiemvu') as HTMLTextAreaElement
      )?.value
      const formData = new FormData()
      formData.append('positionId', idPosition)
      formData.append('description', description)
      const response = await PostionCharUpdate(formData)
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
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>CHỈNH SỬA NHIỆM VỤ</h5>
              </div>
              <div className={`${styles.modal_body}`}>
                <form action=''>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mô tả <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <textarea
                        defaultValue={mission}
                        className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                        id='mota_nhiemvu'></textarea>
                    </div>
                  </div>
                  <div
                    className={`${styles.modal_footer} ${styles.footer_process}`}>
                    <button
                      className={`${styles.btn_cancel}`}
                      onClick={onCancel}>
                      Hủy
                    </button>
                    <button
                      className={`${styles.btn_add}`}
                      onClick={handleSubmit}>
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
