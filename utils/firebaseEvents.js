import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";
import { authenCom, authenEp, authenPersonal } from './handleApi';

const handleVerifyOtp = async (account, type = null, phone = null) => {
    let token = Cookies.get('acc_token');
    const btn_confirm = document.querySelector('.verify_otp');
    const partitioned = document.querySelector('#partitioned');
    if (!btn_confirm.classList.contains('confirm_otp')) {
        try {
            const response = await axios.post('http://43.239.223.142:9000/api/users/TakeDataFireBaseOTP', { number: account });
            const data = await response;
            if (data && data.data && data.data.data && data.data.data.firebase) {
                const firebaseConfig = data.data.data.firebase;
                // khởi tạo cấu hình firebase
                const app = initializeApp(firebaseConfig);
                // hàm tạo captcha
                const generateRecaptcha = () => {
                    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                        'size': 'normal',
                        'callback': (response) => {
                        }
                    }, getAuth(app));
                    recaptchaVerifier.render();
                    const nhanMa = document.querySelector('.nhan_ma_2');
                    if (nhanMa) {
                        nhanMa.remove();
                    }
                    const text = document.querySelector('.change_text');
                    if (text) {
                        text.innerHTML = '';
                    }
                }
                generateRecaptcha();
                // hàm gửi otp 
                let appVerifier = window.recaptchaVerifier;
                signInWithPhoneNumber(getAuth(app), '+84' + account, appVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;
                        const text = document.querySelector('.change_text');
                        if (text) {
                            text.innerHTML = 'Nhập mã OTP được gửi về điện thoại của bạn';
                        }
                        const recaptchaContainer = document.getElementById('recaptcha-container');
                        if (recaptchaContainer) {
                            recaptchaContainer.innerHTML = '';
                        }
                        partitioned.classList.remove('hidden_t');
                        const guiMa = document.querySelector('.gui_ma');
                        guiMa.classList.remove('hidden');

                        // const guiLai = document.querySelector('.gui_lai_otp');
                        // guiLai.classList.remove('hidden');
                    }).catch((error) => {
                        console.log(error)
                    });
            } else {
                alert('Bạn đã sử dụng hết lượt OTP nhận được trong ngày. Vui lòng liên hệ với tổng đài để được hỗ trợ hoặc trở lại vào ngày hôm sau!');
            }
        } catch (error) {
            alert(error.message);
        }
    }
    // Xác thực OTP
    else {
        try {
            confirmationResult.confirm(account).then((result) => {
                if(token) {
                    let role = Cookies.get('role');
                    if (role == 2) {
                        authenEp()
                    } else if (role == 1) {
                        authenCom()
                    } else {
                        authenPersonal()
                    }
    
                    alert('Xác thực thành công')
                    if (role == 2) {
                        window.location.href = '/quan-ly-ung-dung-nhan-vien.html'
                    } else if (role == 1) {
                        window.location.href = '/quan-ly-ung-dung-cong-ty.html'
                    } else {
                        window.location.href = '/quan-ly-ung-dung-ca-nhan.html'
                    }
                } else {
                    window.location.href = '/thay-doi-mat-khau.html?account=' + phone + '&type=' + type
                }

            }).catch((error) => {
                alert('Mã OTP không khớp, vui lòng thử lại!')
                // $('.txt_nd_modal').html('Mã OTP không khớp, vui lòng thử lại!');
                // $('.modal_tbcc .nd_modal').css("width", "420px");
                // $('.modal_tbcc').show();
            });
        } catch (error) {
            console.error(error);
        }
    }
};

export default handleVerifyOtp;
