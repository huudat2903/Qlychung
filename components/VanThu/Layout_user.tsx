import React, { useState, useEffect } from "react";
import Avartar from "./avatar/Avartar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/reducers";
import styles from "./Layout.module.css";
import Header_main from "./header_main/Header_main";
import { fetch_infor_account } from "@/utils/ShareApi";
import Sidebar_quanlycongvan from "./staff_sidebar/Sidebar_quanlycongvan";
import Sidebar_dexuat from "./staff_sidebar/Sidebar_dexuat";
import Sidebar from "./staff_sidebar/Sidebar_send";

interface ParentComponentProps {
  id?: string | undefined | null;
}
const ParentComponent: React.FC<ParentComponentProps> = ({ id }) => {
  let renderedComponent;
  if (id === "1") {
    renderedComponent = <Sidebar_quanlycongvan />;
  } else if (id === "2") {
    renderedComponent = <Sidebar />;
  } else if (id === "3") {
    renderedComponent = <Sidebar_dexuat />;
  }

  return <>{renderedComponent}</>;
};
let idNavBar: any;
const Layout_user = ({ children }: any) => {
  idNavBar = useSelector((state: RootState) => state?.navbar?.activeNavbarId);
  const isOpen = useSelector((state: RootState) => state?.sidebar?.isOpen);
  const router = useRouter();
  const { pathname } = router;

  let componentToRender = null;

  if (
    pathname.includes("/VanThu/trang-quan-ly-de-xuat") ||
    pathname === "/VanThu/tao-de-xuat"
  ) {
    componentToRender = <Sidebar_dexuat />;
  } else if (
    pathname.includes("/VanThu/quanly-cong-van") ||
    pathname.includes("/VanThu/van-ban-den") ||
    pathname.includes("/VanThu/van-ban-di") ||
    pathname === "/VanThu"
  ) {
    componentToRender = <Sidebar />;
  } else if (pathname === "/VanThu/trang-chu-quan-ly-cong-van") {
    componentToRender = <Sidebar_quanlycongvan />;
  }
  const [info, setInfo] = useState<any>();
  useEffect(() => {
    try{
      setInfo(fetch_infor_account());
    }catch(e){
      console.log(e);
    }
  },[]);
  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.side_bar} ${isOpen ? styles.visible : ""}`}>
        <div className={`${styles.general_management}`}>
          <div className={`${styles.profile}`}>
            <Avartar />
            <div className={`${styles.profile_content}`}>
              <p>{info?.userName}</p>
              <p>{info?.type == 1 ? "Quản lý" : ""}</p>
            </div>
          </div>
          <>
            {idNavBar === "" ? (
              componentToRender
            ) : (
              <ParentComponent id={idNavBar} />
            )}
          </>
        </div>
      </div>
      <div className={`${styles.main_right}`}>
        <Header_main />
        <>{children}</>
      </div>
    </div>
  );
};

export default Layout_user;
