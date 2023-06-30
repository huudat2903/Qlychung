import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer"
import Head from "next/head";
import handleVerifyOtp from '../utils/firebaseEvents';



//const inter = Inter({ subsets: [latin] })
export default function sendOTP_Com() {
  const onClickVerifyOtp = () => {
    const value = document.querySelector('.verify_otp');
    if (value.classList.contains('nhan_ma')) {
        let phone = Cookies.get('phone');
        handleVerifyOtp(phone);
    } else {
        var otp = document.querySelector('#partitioned').value;
        handleVerifyOtp(otp);
    }
};
    return (
        <>
<>
  <meta charSet="UTF-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
  <link
    rel="preload"
    href="../fonts/Roboto-Bold.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="../fonts/Roboto-Medium.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="../fonts/Roboto-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link rel="preload" as="style" href="../css/style.css" />
  <link
    rel="stylesheet"
    media="all"
    href="../css/style.css"
    onload="if (media != 'all')media='all'"
  />
  <title>Trang xác thực mã OTP công ty</title>
</>
<>
  <div className="content_ql ctn_bgr_body">
    <div className="content_nv">
      <div className="ctn_register_nv">
        <form
          action=""
          onsubmit="return false"
          className="regnv_form regnv_form_otp_nv"
          method=""
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
                      {/* <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div>
                                              <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div>
                                              <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div>
                                              <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div>
                                              <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div>
                                              <div class="form-group">
                                                  <input type="text" name="name_otp" class="control_otp">
                                              </div> */}
                      <input
                        id="partitioned"
                        name="otp_nv"
                        maxLength={6}
                        placeholder=""
                      />
                    </div>
                    <div className="gui_lai_otp">
                      <p>
                        <span className="share_fsize_three share_clr_one">
                          Bạn chưa nhận được mã OTP?
                        </span>{" "}
                        <button
                          type="button"
                          className="share_clr_four cr_weight share_fsize_three share_cursor gui_lai"
                          data="Trunghe@gmail.com"
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
                      className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                      data="Trunghe@gmail.com"
                      data2={2}
                      data3={117574}
                      defaultValue="Tiếp tục"
                    />
                    {/* <p class="quay_lai tex_center share_clr_one share_cursor share_fsize_three" data="Trunghe@gmail.com" data1="117574">Quay lại</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
</>


        </>
    )
};
