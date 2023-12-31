import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../home/home.module.css";
import styles from "./customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import Link from "next/link";
import { useRouter } from "next/router";

interface MyProps {
  activeName: string;
}

const CustomerHeaderTab: React.FC<MyProps> = ({ activeName }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const router = useRouter();

  const listTab = [
    {
      name: "Thông tin khách hàng",
      link: `/crm/customer/detail/${router.query.id}`,
    },
    { name: "Liên hệ", link: `/crm/customer/contact/list/${router.query.id}` },
    {
      link: `/crm/customer/chance/list/${router.query.id}`,
      name: "Cơ hội",
    },
    {
      link: `/crm/customer/campaign/list/${router.query.id}`,
      name: "Chiến dịch",
    },
    {
      link: `/crm/customer/quote/list/${router.query.id} `,
      name: "Báo giá",
    },
    {
      link: `/crm/customer/order/list/${router.query.id} `,
      name: "Lịch sử đơn hàng",
    },
    {
      link: `/crm/customer/contract/list/${router.query.id} `,
      name: "Hợp đồng bán",
    },
    {
      link: `/crm/customer/product/list_buy/${router.query.id} `,
      name: "Hàng hóa đã mua",
    },
    {
      link: `/crm/customer/bill/list/${router.query.id} `,
      name: "Hóa đơn",
    },
    {
      link: `/crm/customer/schedule/list/${router.query.id} `,
      name: "Lịch hẹn",
    },
    {
      link: `# `,
      name: "Cuộc gọi",
    },
    {
      link: `# `,
      name: "Lịch sử chăm sóc",
    },
    {
      link: `/crm/customer/email/list/${router.query.id} `,
      name: "Email",
    },
    {
      link: `/crm/customer/sms/list/${router.query.id} `,
      name: "SMS",
    },
    {
      link: `/crm/customer/file/list/${router.query.id} `,
      name: "Tài liệu đính kèm",
    },
    {
      link: `/crm/customer/note/list/${router.query.id} `,
      name: "Ghi chú",
    },
    {
      link: `/crm/customer/share/list/${router.query.id} `,
      name: "Danh sách chia sẻ",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div
      style={{ paddingBottom: "20px" }}
      className={styleHome.main}
      ref={mainRef}
    >
      <div className={styles.main__control_tab}>
        {listTab?.map((item, index) => (
          <Link
            className={`${styles.main__control__btn} ${
              activeName === item.name ? "active_btn" : ""
            }`}
            key={index}
            href={`${item.link}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomerHeaderTab;
