// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddQuoteDetailStatus() {
  return (
    <div style={{ paddingTop: 20 }}>
      <p className={styles.main__body__type}>Thông tin mô tả</p>
      <div>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div className={`${styles.main__body__item_des} ${styles.d_flex} `}>
              <div className={`${styles.main__body__item__title}`}>
                <b>Mô tả:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.not_update}`}
              >
                Chưa cập nhật
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.main__body__type}>Thông tin hệ thống</p>
      <div className={styles.row}>
        <div className={styles.row1quote}>
          <div className={styles.row1quote_left}>
            <b>Người tạo:</b>
          </div>
          <div className={styles.row1quote_right} style={{ display: "flex",gap:5}}>
            <div>
              <img
                src="https://crm.timviec365.vn/assets/img/user_kh.png"
                alt=""
              />{" "}
            </div>
            <div>Nguyễn Văn Nam</div>
          </div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div className={styles.row1quote}>
          <div className={styles.row1quote_left}>
            <b>Ngày tạo:</b>
          </div>
          <div className={styles.row1quote_right}>10/10/2020</div>
        </div>
      </div>
      <div style={{display:"flex",marginTop:-20}}>
   <div className={styles.full_width_div}>
        <span></span>
      </div>   <div className={styles.full_width_div}>
        <span></span>
      </div>
      </div>

      <div className={styles.row}>
        <div className={styles.row1quote}>
          <div className={styles.row1quote_left}>
            <b>Người sửa:</b>
          </div>
          <div className={styles.row1quote_right} style={{ display: "flex",gap:5 }}>
            <div>
              <img
                src="https://crm.timviec365.vn/assets/img/user_kh.png"
                alt=""
              />{" "}
            </div>
            <div>Nguyễn Văn Nam</div>
          </div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>

        <div className={styles.row1quote}>
          <div className={styles.row1quote_left}>
            <b>Ngày sửa:</b>
          </div>
          <div className={styles.row1quote_right}>10/10/2020</div>
        </div>
      </div>

      <div style={{display:"flex",marginTop:-20}}>
   <div className={styles.full_width_div}>
        <span></span>
      </div>   <div className={styles.full_width_div}>
        <span></span>
      </div>
      </div>
   
      <div className={styles.row}>
        <div className={styles.row1quote}>
          <div className={styles.row1quote_left}>
            <b>Dùng chung:</b>
          </div>
          <div>
            <img
              src="	https://crm.timviec365.vn/assets/icons/dungchung_kh.svg"
              alt=""
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>

          <div className={styles.row1quote_right}></div>
        </div>
      </div>
    </div>
  );
}
