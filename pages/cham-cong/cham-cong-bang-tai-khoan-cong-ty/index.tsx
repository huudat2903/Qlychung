import Image from 'next/image'
import styles from './index.module.css'
import { Button, Modal, Spin } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { COOKIE_KEY } from '..'
import jwtDecode from 'jwt-decode'
import Head from 'next/head'
import { getCompIdCS } from '@/pages/api/BaseApi'
import _ from 'lodash'

export default function ChamCongCongTy() {
  const [openCam, setOpenCam] = useState(false)
  const [undetectedModal, setUndetectedModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [userData, setUserData] = useState<any>()
  const [modalDetail, setModalDetail] = useState(false)
  const [modalDetailCC, setModalDetailCC] = useState(false)
  const [reload, setReload] = useState(false)
  const [listCa, list_ca] = useState()
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot({
      height: 300,
      width: 300,
    })

    let comId = ''
    const acc_token = getCookie(COOKIE_KEY)

    if (acc_token) {
      const decoded: any = jwtDecode(acc_token?.toString())

      comId = decoded?.data?.com_id
    }
    // console.log(comId)
    if (comId && imageSrc) {
      try {
        const res: any = await axios.post(
          'http://43.239.223.154:8081/',
          {
            company_id: 3312,
            image: imageSrc,
            // image: imageSrc,
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
        const resp = res?.data?.data
        if (
          !resp?.user_id ||
          resp?.user_id === 'Unknown' ||
          resp?.user_id === 'Undetected'
        ) {
          setUndetectedModal(true)
        } else {
          // const userInfo = await axios.get(

          // )
          // console.log(userInfo)
          // if (userInfo) {
          //   setUserData(userInfo)
          // }
          const token = getCookie(COOKIE_KEY)
          let compId: any = ''
          if (token) {
            console.log(jwtDecode(token?.toString()))
            compId = jwtDecode(token?.toString())?.['data']?.['com_id']
          }

          const resdata = await axios.post(
            `http://43.239.223.154:8081/detail`,
            {
              userId: resp?.user_id,
              // compId: comId,
              compId: 3312,
            },
            {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded',
              },
            }
          )

          const respDetail = resdata?.data
          console.log(respDetail?.data)

          if (respDetail?.data?.ep_name) {
            setUserData(respDetail?.data)
            setModalDetail(true)
          } else {
            setModalDetail(false)
            setUndetectedModal(true)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }, [webcamRef])

  useEffect(() => {
    if (openCam) {
      // if (countdown === 0) {
      //   setCountdown(3)
      // }
      const interval = setInterval(() => {
        if (countdown === 0) {
          try {
            capture()
          } catch (error) {}

          clearInterval(interval)
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countdown, openCam, reload])

  return (
    <>
      <div className={styles.main}>
        {!openCam ? (
          <div className={styles.divWrapper}>
            <Image
              src={'/scan-face.png'}
              width={300}
              height={287}
              alt='/'
              style={{ marginTop: '50px' }}
            />
            <p style={{ color: '#fff', margin: '20px 0px' }}>
              Vui lòng hướng khuôn mặt theo khung trên màn hình, nhìn thẳng và
              xoay nhẹ sang 2 bên để nhận được kết quả tốt nhất
            </p>
            <Button
              size='large'
              className={styles.startBtn}
              onClick={() => setOpenCam(true)}>
              <p style={{ color: '#fff', padding: '0px 20px' }}> Bắt đầu</p>
            </Button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Webcam
                audio={false}
                // height={971}
                className={styles.webcamCapture}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                // width={971}
                videoConstraints={{}}
              />
            </div>
            <div
              className={styles.recognizeTxt}
              style={{ display: countdown === 0 ? 'none' : 'flex' }}>
              <p className={styles.txt}>Nhận diện trong {countdown}</p>
            </div>
          </>
        )}
      </div>
      <Modal
        centered
        width={700}
        closable={false}
        open={undetectedModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image alt='/' src={'/err-x.png'} width={120} height={120} />
          <p
            style={{
              fontSize: '22px',
              marginTop: '20px',
              color: 'red',
              textAlign: 'center',
            }}>
            Dữ liệu khuôn mặt không hợp lệ! Vui lòng chấm công lại hoặc liên hệ
            với kỹ thuật để biết thêm !
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button className={styles.btnOk} size='large'>
              <p style={{ color: '#fff' }}>Trang chủ</p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancel}
              onClick={() => {
                setUndetectedModal(false)
                setReload(!reload)
              }}>
              <p style={{ color: '#fff' }}>Tiếp tục chấm công</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetail}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image alt='/' src={'/check-tc.png'} width={120} height={120} />
          <p style={{ fontSize: '22px', marginTop: '20px' }}>
            Xin chào bạn có phải là
          </p>
          <p style={{ fontSize: '25px', color: '#4C5BD4' }}>
            {userData && userData?.ep_name}
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button
              className={styles.btnOk}
              size='large'
              onClick={() => {
                setModalDetail(false)
                setModalDetailCC(true)
              }}>
              <p style={{ color: '#fff' }}>Là tôi, tiếp tục chấm công</p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancel}
              onClick={() => {
                setModalDetail(false)
                setReload(!reload)
              }}>
              <p style={{ color: '#fff' }}>Không phải là tôi</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetailCC}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <div>
            <div></div>
            <div className={styles.wrapper}>
              <p>
                <span>{userData && userData?.shift_name}</span>
                <span>{userData && userData?.time_sheet}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
