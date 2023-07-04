import React from "react"
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Seo from '../components/head'

export default function sendOTP_Com() {
  const onClickVerifyOtp = () => {
    const value = document.querySelector('.verify_otp');
    if (value.classList.contains('nhan_ma')) {
      let phone = Cookies.get('phone');
      console.log(phone)
      handleVerifyOtp(phone);
    } else {
      var otp = document.querySelector('#partitioned').value;
      handleVerifyOtp(otp);
    }
  };
  return (
    <>
      <Seo
      seo = ''
      title = 'Trang xác thực mã OTP công ty'
      />
      <Header/>
      <title>Trang xác thực mã OTP công ty</title>
      <div className="content_ql ctn_bgr_body">
        <div className="content_nv">
          <div className="ctn_register_nv">
            <form
              className="regnv_form regnv_form_otp_nv"
            >
              <div className="tow_page_qmk" data={2}>
                <div className="container">
                  <div className="ctn_qmk">
                    <div className="tow_reg_ql share_reg_log share_brd_radius share_bgr_tow ctn_register_nv">
                      <div className="header_qmk">
                        <h3 className="share_clr_four cr_weight_bold tex_center">
                          Xác thực mã OTP
                        </h3>
                        <div className="qmk_avt_ic">
                          <img src="../img/three_ic_register.png" alt="" />
                        </div>
                      </div>
                      <p className="titl_form share_fsize_three share_clr_one tex_center">
                        Vui lòng nhập mã OTP gồm 6 chữ số được gửi về email hoặc số
                        điện thoại đăng ký tài khoản!
                      </p>
                      <div className="center_form">
                        <div className="form-group">
                          <input
                            id="partitioned"
                            name="otp_nv"
                            maxLength={6}
                            placeholder=""
                            className="hidden_t"
                          />
                          <div id="recaptcha-container"
                            className="recaptcha"></div>

                          <div className="gui_lai_otp hidden">
                            <p>
                              <span className="share_fsize_three share_clr_one">
                                Bạn chưa nhận được mã OTP?
                              </span>{" "}
                              <button
                                onClick={onClickVerifyOtp}
                                type="button"
                                className="share_clr_four cr_weight share_fsize_three share_cursor gui_lai verify_otp nhan_ma"
                                data1={2}
                              >
                                Gửi lại
                              </button>
                            </p>
                          </div>
                        </div>
                        <div id="recaptcha-container" className="recaptcha" />
                        <div className="form-butt-one">
                          <input
                            type="button"
                            className="nhan_ma nhan_ma_2 share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one verify_otp otpSMS"
                            defaultValue="Nhận mã"
                            onClick={onClickVerifyOtp}
                          />
                          <input
                            type="button"
                            className="hidden gui_ma gui_otp share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one confirm_otp verify_otp otpSMS"
                            defaultValue="Tiếp tục"
                            onClick={onClickVerifyOtp}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      <Footer/>
      <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
    </>
  )
};