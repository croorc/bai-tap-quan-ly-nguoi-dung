import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../redux/actions/QuanLyNguoiDungActions";

class TableDanhSachNguoiDung extends Component {
  renderDanhSachNguoiDung = () => {
    return this.props.userList.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.matKhau}</td>
          <td>{user.email}</td>
          <td>{user.soDienThoai}</td>
          <td>
            {user.loaiNguoiDung === "khachHang"
              ? "Khách hàng"
              : user.loaiNguoiDung === "quanTri"
              ? "Quản trị"
              : "Đang cập nhật..."}
          </td>
          <td></td>
          <td>
            <button
              disabled={this.props.isUpdate}
              className="btn btn-primary me-1"
              onClick={() => {
                this.props.dispatch(editUser(user));
              }}
            >
              Chỉnh sửa
            </button>
            <button
              disabled={this.props.isUpdate}
              className="btn btn-danger"
              onClick={() => {
                this.props.dispatch(deleteUser(user.id));
              }}
            >
              Xóa
            </button>
          </td>
          <td></td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="mt-3">
        <h5 className="text-white bg-dark p-2">Danh sách người dùng</h5>
        <div className="container-fluid">
          <div className="table-responsive">
            <table className="table table-white">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th>Mật khẩu</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Loại người dùng</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderDanhSachNguoiDung()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.QuanLyNguoiDungReducer.userList,
    isUpdate: state.QuanLyNguoiDungReducer.isUpdate,
  };
};

export default connect(mapStateToProps)(TableDanhSachNguoiDung);
