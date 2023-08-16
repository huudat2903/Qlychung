import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css"
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Table_Qoute from "@/components/crm/table_delete/table-qoute-delete";
import { ColumQoute } from "@/components/crm/delete_data/colums_field/qoute";
import { dataPotential } from "@/components/crm/delete_data/colums_field/data"

export default function Qoute_List_Delete() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Dữ liệu đã xoá / Báo giá");
    setShowBackButton(true);
    setCurrentPath("/crm/delete_data/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div ref={mainRef} className={styleHome.main}>
  
    <Table_Qoute
        ColumQoute={ColumQoute}
        dataPotential={dataPotential}
        name="Báo giá"
      /> 
    </div>
  );
}
