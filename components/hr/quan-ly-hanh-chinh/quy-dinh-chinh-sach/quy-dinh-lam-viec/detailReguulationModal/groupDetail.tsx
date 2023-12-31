import React, { useState, useEffect, useRef } from 'react'
import styles from './detailRegulationModal.module.css'
import { format } from 'date-fns'
import { GroupDetails } from '@/pages/api/api-hr/quy_dinh_chinh_sach'
import FilePolicyGroupDetail from '../../chinh-sach-nhan-vien/detailPolicyModal/filePolicyGroupDetail'
interface GroupDetailModalProps {
  onCancel: () => void
  idGroup: number
}

export default function GroupDetailModal({
  onCancel,
  idGroup,
}: GroupDetailModalProps) {
  const [DetailData, setDetailData] = useState<any | null>(null)
  const [isopenDetailFile, setOpenDetailFile] = useState<any | null>(false)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GroupDetails(idGroup)
        setDetailData(response?.data)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])


  const handlecloseModal = () => {
    setOpenDetailFile(false)
  }

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>
                  CHI TIẾT NHÓM QUY ĐỊNH
                </h5>
              </div>
              {DetailData?.data[0] && (
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.infors}`}>
                    <div className={`${styles.info_left}`}>
                      <li>
                        <label>Nhóm quy định:</label>
                        <span className={`${styles.nqd_nqd}`}>
                          {DetailData?.data[0]?.name}
                        </span>
                      </li>
                      <li>
                        <label>Người giám sát:</label>
                        <span className={`${styles.nqt_supervisor_name}`}>
                          {DetailData?.data[0]?.supervisorName}
                        </span>
                      </li>
                    </div>
                    <div className={`${styles.info_right}`}>
                      <li>
                        <label>Trạng thái:</label>
                        <span className={`${styles.green}`}>đã ban hành</span>
                      </li>
                      <li>
                        <label>Có hiệu lực từ:</label>
                        <span className={`${styles.nqt_created_at}`}>
                          {format(
                            new Date(DetailData?.data[0]?.timeStart),
                            'dd/MM/yyyy'
                          )}
                        </span>
                      </li>
                    </div>
                  </div>
                  <div className={`${styles.infors1}`}>
                    <p>Nội dung nhóm quy định</p>
                    <div
                      className={`${styles.info_left}`}
                      style={{
                        width: '100%',
                        minHeight: 50,
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                      }}>
                      <li className={`${styles.nqd_content}`}>
                        <p>{DetailData?.data[0]?.supervisorName}</p>
                      </li>
                    </div>
                  </div>
                  <div
                    className={`${styles.infors1} ${styles.preview_file_provision}`} onClick={() => setOpenDetailFile(!isopenDetailFile)}>
                    <a style={{ color: '#337ab7', fontWeight: 600 }} >
                      Xem chi tiết file đính kèm
                    </a>
                  </div>
                  {isopenDetailFile && <FilePolicyGroupDetail file={DetailData?.data[0]?.file} onCancel={handlecloseModal} />}
                </div>
              )}
              <div
                className={`${styles.modal_footer} ${styles.footer_process}`}>
                <button className={`${styles.btn_cancel}`} onClick={onCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
