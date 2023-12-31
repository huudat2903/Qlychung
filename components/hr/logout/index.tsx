import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "../quan-ly-hanh-chinh/bien-dong-nhan-su/workingRotation/deleteWorkingModal/deleteWorkingModal.module.css"
import Cookies from "js-cookie";

export default function LogoutHr({ setShowLogout, showLogout }: any) {
    const modalRef = useRef(null);

    const no = () => {
        setShowLogout(false);
    };
    const yes = () => {
        Cookies.remove("token_base365");
        Cookies.remove("rf_token");
        Cookies.remove("role");
        Cookies.remove("phone");
        window.location.href = "/trang-chu-truoc-dang-nhap";
    };

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                // onCancel()
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <p className={`${styles.modal_title}`}>Đăng xuất</p>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <p style={{ textAlign: 'center' }}>Bạn có muốn đăng xuất không ? </p>
                            </div>
                            <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button style={{ cursor: 'pointer' }} className={`${styles.btn_cancel}`} onClick={no}>Không</button>
                                <button style={{ cursor: 'pointer' }} className={`${styles.btn_add}`} onClick={yes} >Có</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}