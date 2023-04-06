import { Typography } from "antd";
import React from "react";

const Footer = () => {
  return (
    <div className="DbFooter">
      <Typography.Link href="tel:+84944585537">+84 944 585 537</Typography.Link>
      <Typography.Link href="https://github.com/vuhoangquoc" target={"_blank"}>
        Quyền riêng tư
      </Typography.Link>
      <Typography.Link href="https://github.com/vuhoangquoc" target={"_blank"}>
        Điều khoản sử dụng
      </Typography.Link>
    </div>
  );
};

export default Footer;
