/** @format */

import { React, useState, useEffect } from 'react'
import Seo from '../components/head'
import Header from '../components/header/Header'
import FooterQLC from '../components/footerQLC/FooterQLC'
import HeaderQLC from '../components/headerQLC/HeaderQLC'
import SidebarQLC from '../components/sidebarQLC/SidebarQLC'

import Cookies from 'js-cookie'
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function noticeVip() {
  const [hasTokens, setHasTokens] = useState(false)
  const [openSB, setOpenSB] = useState(false)
  const [hasSB, setHasSB] = useState(false)
  const [currentPage, setCurrentPage] = useState('Thông báo tài khoản VIP')
  useEffect(() => {
    const accToken = Cookies.get('token_base365')
    const rfToken = Cookies.get('rf_token')
    const userRole = Cookies.get('role')

    if (accToken && rfToken && userRole) {
      setHasTokens(true)
    }
  }, [])
  useEffect(() => {
    window.addEventListener(
      'resize',
      function (event) {
        if (window.innerWidth >= 1024) {
          setHasSB(true)
          setOpenSB(false)
        } else if (window.innerWidth < 1024) {
          setHasSB(true)
        }
      },
      true
    )
  })

  return (
    <>
      <Seo seo='' title='Trang thông báo về tài khoản VIP' />

      {/* <Header acc_token={Cookies.get('token_base365')} rf_token={Cookies.get('rf_token')} /> */}
      <div className='tc_wrap'>
        {hasSB && (
          <div
            className={'khoi_sidebar'}
            style={{ display: openSB ? 'block' : 'none' }}>
            <SidebarQLC openSB={openSB} />
          </div>
        )}
        <div className={'khoi_header_content'} style={{ width: '100%' }}>
          <div className='content_ql'>
            <div className='cnt_ttone'>
              <HeaderQLC
                setOpenSB={setOpenSB}
                openSB={openSB}
                currentPage={currentPage}
              />
            </div>
            <div className='register_ctnv register_dk_vip' id='register_nv'>
              <div
                className='content_ql ctn_bgr_body'
                style={{ margin: '0px' }}>
                <div className='content_nv'>
                  <div className='ctn_register_nv'>
                    <form className='regnv_form regnv_form_id'>
                      <div className='one_page_qmk'>
                        <div className='container'>
                          <div className='ctn_qmk'>
                            <div className='share_brd_radius share_bgr_tow ctn_set_vip'>
                              <img
                                className='wn_vip'
                                src='/img/bgd_ncapv.png'
                                alt='cảnh báo đăng ký'
                              />
                              <p className='wn_text_1'>
                                Để đăng ký thêm tài khoản <br />
                                Vui lòng liên hệ với chúng tôi để được hỗ trợ
                                tốt nhất.
                              </p>
                              <div className='ctn_phone_box'>
                                {/* <a class="phone_box phone_box_1" rel="nofollow" target="_blank" href="tel:0982079209">
                                              <img src="/img/phone_vip.png" alt="liên hệ vip">
                                              <span>Hotline: <b>0982.079.209</b></span>
                                          </a>
                                          <a class="phone_box phone_box_2" rel="nofollow" target="_blank" href="skype:live:binhminhmta123?chat">
                                              <img src="/img/skype_vip.png" alt="liên hệ vip">
                                              <span><b>Skype</b></span>
                                          </a>
                                          <a class="phone_box phone_box_3" rel="nofollow" target="_blank" href="https://zalo.me/0982079209">
                                              <img src="/img/zalo_vip.png" alt="liên hệ vip">
                                              <span><b>Zalo</b></span>
                                          </a>
                                          <a class="phone_box phone_box_4" rel="nofollow" href="javascript:void(Tawk_API.toggle())">
                                              <span><b>Chat với chúng tôi</b></span>
                                          </a> */}
                                <div className='box_hl_chat'>
                                  <div className='ctn_hotline ctn_vipchung'>
                                    <a
                                      rel='nofollow'
                                      target='_blank'
                                      href='tel:0983407428'>
                                      <img src='/img/exp_holine_vip.png' />
                                      {/* <span>Hotline: <b>0983407428</b></span> */}
                                      <span style={{ paddingLeft: 5 }}>
                                        Hỗ trợ 24/24: <b>0983.407.428</b>{' '}
                                      </span>
                                      <span
                                        style={{
                                          width: '100%',
                                          textAlign: 'center',
                                        }}>
                                        (Call/Zalo)
                                      </span>
                                    </a>
                                  </div>
                                  <div className='ctn_chat_vip ctn_vipchung'>
                                    <a
                                      className='share_cursor'
                                      onclick='clk_chat(this)'>
                                      <img src='/img/chat_365.png' />
                                      <span className='cr_weight'>
                                        Chat 365
                                      </span>
                                    </a>
                                  </div>
                                </div>
                                {/* <div class="box_banggia">
                                              <a href="https://chamcong.timviec365.vn/bang-gia.html" rel="nofollow" target="_blank">Bảng giá</a>
                                          </div> */}
                              </div>
                              <p className='wn_text_2'>
                                Nâng cấp Vip để đăng ký không giới hạn các tài
                                khoản cho công ty.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterQLC />
      <link
        rel='stylesheet'
        href='https://timviec365.vn/css/footer_new.css?v=2'
      />
    </>
  )
}
