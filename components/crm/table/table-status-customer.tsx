import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import CancelModal from "../potential/potential_steps/cancel_modal";
import EditStatusCustomerModal from "../customer/status/modal_status_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import Image from "next/image";
import AddStatusCustomerModal from "../customer/status/modal_add_customer_status";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");
interface DataType {
  key: number;
  name: string;
  created_user: number;
  created_at: string;
  status: number;
  stt_id: any;
}

interface TableStatusCustomerProps {}

const TableStatusCustomer: React.FC<TableStatusCustomerProps> = ({}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [stt, setStt] = useState<any>("");
  const [id, setId] = useState();
  const [name, setName] = useState();
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${base_url}/api/crm/customerStatus/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { stt_name: `${stt}`, pageSize: 10000 }
  );
  useEffect(() => {
    fetchData();
  }, []);
  const datatable = data?.data?.listStatus.map((item: any, index: number) => {
    return {
      key: index + 1,
      name: item.stt_name,
      created_user: item.created_user,
      created_at: item.created_at,
      status: item.status,
      stt_id: item.stt_id,
    };
  });
  const handelChangeSwicth = (e: any, id: any) => {
    if (!e && id) {
      updateData(
        `${base_url}/api/crm/customerStatus/update`,
        `${Cookies.get("token_base365")}`,
        "POST",
        { stt_id: id, status: 0 }
      );
    } else {
      updateData(
        `${base_url}/api/crm/customerStatus/update`,
        `${Cookies.get("token_base365")}`,
        "POST",
        { stt_id: id, status: 1 }
      );
    }
  };
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 100,
      dataIndex: "key",
      key: "1",
    },
    {
      title: "Tên tình trạng",
      width: 250,
      dataIndex: "name",
      key: "name",
      render: (data) => <span style={{ color: "#4C5BD4" }}>{data}</span>,
    },
    {
      title: "Người tạo",
      width: 160,
      dataIndex: "created_user",
      key: "5",
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "created_at",
      key: "1",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "8",
      width: 180,
      render: (data, record) => (
        <Switch
          className="status_cus"
          defaultChecked={record.status === 1 ? true : false}
          onChange={(e) => handelChangeSwicth(e, record.stt_id)}
        />
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "6",
      width: 200,
      // fixed:"right",
      render: (text, record: any) => (
        <>
          {/* <Link href={`/customer/group/edit/${id}`}> */}
          <button
            onClick={() => (
              setOpenSharedModal(true),
              setName(record.name),
              setId(record.stt_id)
            )}
          >
            <Image
              src="h_edit_cus.svg" // Đường dẫn tới tệp tin SVG trong thư mục 'public'
              alt="My SVG Image"
              width={15}
              height={15}
              className={styles.icon_edit}
            />
            Sửa
          </button>
          {/* </Link> */}
          <button onClick={() => (setIsOpenCancel(true), setId(record.stt_id))}>
            <Image
              src="h_delete_cus.svg" // Đường dẫn tới tệp tin SVG trong thư mục 'public'
              alt="My SVG Image"
              width={15}
              height={15}
              className={styles.icon_delete}
            />
            Xóa
          </button>
        </>
      ),
    },
  ];
  const handleChangePage = (currents: number, pageSizes: number) => {
    console.log(current);
    if (currents != current) {
      setcurrent(currents);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <div className="custom_table" style={{ marginTop: 10 }}>
      <div className={styles.main__control} style={{ paddingBottom: 40 }}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form
              className={styles.main__control_search}
              style={{ width: "100%" }}
              action=""
              onSubmit={() => handleSubmit(event)}
            >
              <input
                style={{ height: 40, fontSize: 16 }}
                type="text"
                className={styles.input__search}
                name="search"
                onChange={(e) => setStt(e.target.value)}
                value={stt}
                placeholder="Tìm kiếm theo tình trạng khách hàng"
              />
              <button
                className={styles.kinh_lup}
                onClick={() => {
                  fetchData();
                }}
              >
                <img
                  style={{ marginBottom: 100 }}
                  className={styles.img__search}
                  src="https://crm.timviec365.vn/assets/icons/search.svg"
                  alt=""
                />
              </button>
            </form>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image src="add.svg" alt="My SVG Image" width={15} height={15} />
              Thêm mới
            </button>
          </div>
        </div>

        <AddStatusCustomerModal
          isModalCancel={isOpen}
          setIsModalCancel={setIsOpen}
          updateData={updateData}
        />
      </div>
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        pagination={{
          current: current,
          pageSize: pageSize,
          onChange: (currents, pageSizes) => {
            handleChangePage(currents, pageSizes);
          },
        }}
        scroll={{ x: 992, y: 400 }}
      />

      <CancelModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
        content={"Bạn có chắc chắn muốn xóa ???"}
        title={"Xác nhận xóa tình trạng khách hàng"}
        link={"#"}
        id={id}
        updateData={updateData}
      />

      <EditStatusCustomerModal
        isModalCancel={openSharedModal}
        setIsModalCancel={setOpenSharedModal}
        updateData={updateData}
        name={name}
        id={id}
      />
    </div>
  );
};

export default TableStatusCustomer;
