import React, { Component } from "react";
import FormDangKy from "./FormDangKy";
import TableDanhSachNguoiDung from "./TableDanhSachNguoiDung";


export default class QuanLyNguoiDung extends Component {
  render() {
    return (
      <div >
        <FormDangKy />
        <TableDanhSachNguoiDung />
      </div>
    );
  }
}
