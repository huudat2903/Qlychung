export default function QrGuild(props) {
    const { qrGuildHide } = props;
    return (
        <div className="popup popup_helper_qr" >
        <div className="content_body">
            <button type="button" className="btn_close" >
                <span className="cl_c" aria-hidden="true" onClick={qrGuildHide}>
                    ×
                </span>
            </button>
            <p className="title_popup">Hướng dẫn quét QR</p>
            <div
                className="img_qr"
                id="qrcode_popup"
                title='{"QRType":"QRLoginPc","idQR":"YTEyNjM0MmMtZjk1NS00YzkyLTgxOGQtMjhjNzM1ZGJkNWM5++","IdComputer":"a126342c-f955-4c92-818d-28c735dbd5c9","NameComputer":"Chrome, version: 113.0.0.0","latitude":"","longitude":"","Time":"30/5/2023 0:8"}'
            >
                <canvas width={185} height={185} style={{ display: "none" }} />
                <img src="../img/qr_login.png"
                    style={{ display: "block" }}
                />
            </div>
            <div className="ct_list ">
                <div className="item_l">
                    <div className="cicle_list">1</div>
                    <p>Đăng nhập ứng dụng Chat365 trên điện thoại của bạn</p>
                </div>
                <div className="item_l">
                    <div className="cicle_list">2</div>
                    <p>
                        <span>Tại ứng dụng chọn biểu tượng</span>{" "}
                        <span>
                            <img
                                style={{ marginBottom: "-5px" }}
                                src="/img/qr-code.png"
                                alt="QR core"
                            />
                        </span>
                        <span>Trên thanh tìm kiếm</span>
                    </p>
                </div>
                <div className="item_l">
                    <div className="cicle_list">3</div>
                    <p>Di chuyển Camera đến mã QR trên màn hình máy tính để đăng nhập</p>
                </div>
            </div>
        </div>
    </div>
    )
}
