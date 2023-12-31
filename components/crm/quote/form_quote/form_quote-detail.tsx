import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ButtonControlForm from "../quote_detail/quote_button_form_quote";

type Props = {};

const Form_quote_detail = (props: Props) => {
  const router = useRouter();

  const path = router.query.id;

  return (
    <div>
      <ButtonControlForm />
      <img
        width={"100%"}
        style={{
          padding: "0 100px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
        src={`https://crm.timviec365.vn/assets/icons/quote/mau_bg${
          path=="ĐH-0000" ? 1 : path
        }.svg`}
        alt=""
      />
    </div>
  );
};
export default Form_quote_detail;
