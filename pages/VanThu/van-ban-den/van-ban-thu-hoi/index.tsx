import Day_top from "@/components/VanThu/components/day_top/Day_top";
import styles from "./alternative.module.scss";
import React, { useState } from "react";
import Table from "@/components/VanThu/components/incoming_doc_table/Table";
import Head from "next/head";
import { fetchData } from "@/utils/BaseApi";
import { parse } from "cookie";

const Revocation_doc = ({ data }: any) => {
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const handleDataArrayChange = (newDataArray: string[]) => {
    setDataArray(newDataArray);
  };
  const resetArray = () => {
    setIsSearch(true);
    setDataArray([]);
  };

  return (
    <>
      <Head>
        <title> Văn bản thu hồi </title>
        <meta name="keywords" content="Văn bản thu hồi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          from_to_date={true}
          url="van-ban-thu-hoi"
          api="/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanThuHoi"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
        />
        <Table
          listdocs={isSearch ? dataArray : data?.listVanBanDaThuHoi}
          href_url="van-ban-thu-hoi"
        />
      </div>
    </>
  );
};

export default Revocation_doc;
export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
    if (!token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const data = await fetchData(
      token,
      "/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanThuHoi"
    );
    // console.log(data.data.message);

    return {
      props: {
        data: data?.data ? data?.data : null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
