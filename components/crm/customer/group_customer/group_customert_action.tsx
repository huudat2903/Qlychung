import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import styles from "../../potential/potential.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import CancelModalDelGroup from "./delete_mdal_gr_cus";
import { useApi } from "../../hooks/useApi";

export default function GroupCustomerAction({
  isSelectedRow,
  selectedRow,
  updateData,
}: any) {
  const [isDelOpen, setIsDelOpen] = useState(false);

  const {
    data,
    loading,
    error,
    fetchData,
    updateData: updateDataDel,
    deleteData,
  } = useApi(
    "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    process.env.ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    "POST",
    { page: 1, perPage: 1000 }
  );

  console.log("check", data?.data?.showGr);
  const handleClickAction = (e: any) => {
    console.log(selectedRow);
    setIsDelOpen(true);
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <>
          <button
            className="flex-start-btn"
            onClick={(e) => handleClickAction(e)}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 3.7998H3.15H14.35"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.24844 3.8V2.4C5.24844 2.0287 5.39594 1.6726 5.65849 1.41005C5.92104 1.1475 6.27713 1 6.64844 1H9.44844C9.81974 1 10.1758 1.1475 10.4384 1.41005C10.7009 1.6726 10.8484 2.0287 10.8484 2.4V3.8M12.9484 3.8V13.6C12.9484 13.9713 12.8009 14.3274 12.5384 14.5899C12.2758 14.8525 11.9197 15 11.5484 15H4.54844C4.17713 15 3.82104 14.8525 3.55849 14.5899C3.29594 14.3274 3.14844 13.9713 3.14844 13.6V3.8H12.9484Z"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.65039 7.2998V11.4998"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.44922 7.2998V11.4998"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Xoá
          </button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.div__thaotac}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}>0</b>
      </div>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={false}
        className={!isSelectedRow ? "opacity" : ""}
        trigger={[isSelectedRow ? "hover" : "contextMenu"]}
      >
        <button className={styles.button_thaotac}>
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown>

      <CancelModalDelGroup
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        content={"Bạn có đồng ý xóa nhóm khách hàng này không?"}
        title={"Xác nhận xóa nhóm khách hàng"}
        link={"#"}
        keyDeleted={selectedRow}
        updateData={updateDataDel}
        setChange={updateData}
      />
    </div>
  );
}
