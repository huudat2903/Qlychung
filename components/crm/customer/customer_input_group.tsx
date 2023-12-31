import React, { useState, useRef } from "react";
import styles from "../potential/potential.module.css";
import Link from "next/link";
import exportToExcel from "../ultis/export_xlxs";
import { data } from "../table/table-potential";
import Image from "next/image";
import CustomerListAction from "./customer_action";
import { Drawer, Input } from "antd";
import CustomerListFilterBox from "./customer_filter_box";
import { DataType } from "@/pages/crm/customer/list";
export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
  setName,
  setPhone,
  fetchData,
  selectedCus,
  dataStatusCustomer,
  setStatus,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  setNameHandingOverWork,
  NameHandingOverWork,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const datas:any = datatable?.map((item:DataType) => {
    return {
      "Mã tiềm năng": item?.cus_id,
      "Xưng hô": "",
      "Họ tên": item?.name,
      "Chức danh": "",
      "Điện thoại cá nhân": item?.phone_number,
      "Email cá nhân": item?.email,
      "Điện thoại cơ quan": "",
      "Email cơ quan": "",
      "Địa chỉ": "",
      "Tỉnh/Thành phố": "",
      "Quận/Huyện": "",
      "Phường xã": "",
      "Nguồn gốc": "",
      "Loại hình": "",
      "Lĩnh vực": "",
      "Mô tả": item?.description,
      "Mô tả loại hình": "",
      "Người tạo":item?.userNameCreate,
    };
  });
  const handleExportToExcel = () => {
    const filename = "Danh sách khách hàng.xlsx";
    const sheetName = "Danh sách khách hàng";
    const columnHeaders = [
      "Mã tiềm năng",
      "Xưng hô",
      "Họ tên",
      "Chức danh",
      "Điện thoại cá nhân",
      "Email cá nhân",
      "Điện thoại cơ quan",
      "Email cơ quan",
      "Địa chỉ",
      "Tỉnh/Thành phố",
      "Quận/Huyện",
      "Phường xã",
      "Nguồn gốc",
      "Loại hình",
      "Lĩnh vực",
      "Mô tả",
      "Mô tả loại hình",
      "Người tạo",
    ];
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };

  const handleClickFile = () => {
    inputFileRef.current?.click();
  };
  const handleSearchKH = async (e) => {
    setName(e.target.value.trim()), setData(e.target.value);
    await fetchData();
  };
  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div
            className={`${styles.main__control_search} ${styles.f_search_customer}`}
          >
            <form
              onSubmit={(e) =>  e.preventDefault()}
              className={styles.form_search}
              style={{ width: "100%", padding: 1 }}
            >
              <div></div>
              <Input
                type="text"
                value={data}
                onChange={(e) => handleSearchKH(e)}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo Id, tên khách hàng, điện thoại, email"
                style={{ border: "none", width: "82%", fontSize: 15 }}
              />
              <button type="button" style={{ width: "18%" }}>
                Tìm kiếm
              </button>
            </form>
          </div>
          <div className={styles.main_control_new}>
            <div className={styles.dropdown_action_btn}>
              <button
                onClick={showDrawer}
                className={styles.btn_light_filter}
                style={{ color: "#4C5BD4", fontWeight: 600, fontSize: 15 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 4,
                  }}
                >
                  <div>
                    <Image
                      src={"/crm/icon_search.svg"}
                      alt="filter"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div>Bộ lọc</div>
                </div>
              </button>
            </div>
            <div className={styles.dropdown_action_btn}>
              <Link
                className={styles.api_connect_btn}
                href={"/crm/setting/api"}
              >
                <button
                  className={styles.btn_light_api}
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'Roboto-Medium'",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "Roboto-Medium",
                      paddingTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    <div>
                      <Image
                        src={"/crm/h_export_cus.svg"}
                        alt="filter"
                        width={15}
                        height={15}
                      />
                    </div>
                    <div>Kết nối API</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <CustomerListAction
          clearOption={clearOption}
          chooseAllOption={chooseAllOption}
          isSelectedRow={isSelectedRow}
          numberSelected={numberSelected}
          selectedCus={selectedCus}
        />

        <div className={`${styles.main__control_add}`}>
          <Link href="/crm/customer/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>

          <button
            type="button"
            onClick={handleClickFile}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
          >
            <img src="/crm/h_import_cus.svg" />
            Nhập từ file
            <input type="file" hidden ref={inputFileRef} />
          </button>
          <button
            type="button"
            onClick={handleExportToExcel}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
          >
            <img src="/crm/icon_excel.svg" />
            Xuất excel
          </button>
        </div>
      </div>

      <Drawer
        title={<div style={{ color: "#fff" }}>Bộ lọc</div>}
        placement="right"
        onClose={onClose}
        open={open}
        style={{ overflowY: "hidden" }}
        className="custom_drawer"
        footer
        closable
        headerStyle={{ textAlign: "center", background: "#4C5BD4" }}
      >
        <div>
          <CustomerListFilterBox
            dataStatusCustomer={dataStatusCustomer}
            setOpen={setOpen}
            setStatus={setStatus}
            fetchData={fetchData}
            setResoure={setResoure}
            datatable={datatable}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
          />
        </div>
      </Drawer>
    </>
  );
}
