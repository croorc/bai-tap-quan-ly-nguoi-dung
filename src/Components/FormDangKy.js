import React, { Component } from "react";
import { connect } from "react-redux";
import FromInput from "./FormInput";
import { addUser, updateUser } from "../redux/actions/QuanLyNguoiDungActions";
import Swal from "sweetalert2";

class FormDangKy extends Component {
  state = {
    values: {
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDienThoai: "",
      loaiNguoiDung: "",
    },
    errorMessage: {
      taiKhoan: { name: "Tài khoản", error: "" },
      hoTen: { name: "Họ tên", error: "" },
      matKhau: { name: "Mật khẩu", error: "" },
      email: { name: "Email", error: "" },
      soDienThoai: { name: "Số điện thoại", error: "" },
      loaiNguoiDung: { name: "loại người dùng", error: "" },
    },
    isUpdate: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { ...this.state.values, id: Date.now() };

    if (this.isFormValid()) {
      if (this.state.isUpdate) {
        this.props.dispatch(updateUser(this.state.values));
        this.setState({ isUpdate: false });
      } else {
        this.props.dispatch(addUser(newUser));
      }
      this.clearForm();
    }
    Swal.fire({
      title: this.isFormValid() ? "Success!" : "Error!",
      icon: this.isFormValid() ? "success" : "error",
      confirmButtonText: "Close",
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      values: { ...this.state.values, [name]: value },
    });

    this.validateInput(name, value);
  };
  validateInput = (key, value) => {
    const errorMessageUpdated= {...this.state.errorMessage}
    let newMessage = "";

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTel = /([0-9]{10})\b/;

    if (value.trim() === "") {
      newMessage = errorMessageUpdated[key].name + " không được bỏ trống";
    } else {
      newMessage = "";
    }
    if (key === "taiKhoan") {
      if (this.props.userList.some((user) => user.taiKhoan === value)) {
        newMessage = errorMessageUpdated[key].name + " đã tồn tại";
      }
    }

    if (key === "email") {
      if (!regexEmail.test(value)) {
        newMessage = errorMessageUpdated[key].name + " không hợp lệ";
      }
    }

    if (key === "soDienThoai") {
      if (!regexTel.test(value)) {
        newMessage = errorMessageUpdated[key].name + " không hợp lệ";
      }
    }

    this.setState({
      errorMessage: {
        ...this.state.errorMessage,
        [key]: {...errorMessageUpdated[key], error: newMessage},
      },
    });
  };
  validateForm = () => {
    let values = { ...this.state.values };
    let errorMessage = { ...this.state.errorMessage };
    Object.entries(values).forEach(([key, value]) => {
      if(key === "id"){
        return
      }
      
      if (value === "") {
        if (key === "loaiNguoiDung") {
          errorMessage[key].error = "Bạn chưa chọn " + errorMessage[key].name;
        } else {
          errorMessage[key].error =
            errorMessage[key].name + " không được bỏ trống";
        }
      }
    });

    this.setState({
      errorMessage: errorMessage,
    });
    return { values, errorMessage };
  };

  isFormValid = () => {
    const { values, errorMessage } = this.validateForm();

    const isValuesEmpty = Object.values(values).some((value) => value === "");

    const hasError = Object.values(errorMessage).some(
      (message) => message.error !== ""
    );

    return !isValuesEmpty && !hasError;
  };

  clearForm = () => {
    this.setState({
      values: {
        taiKhoan: "",
        hoTen: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        loaiNguoiDung: "",
      },
    });
  };

  componentDidUpdate(prevProps) {
    const { userEdit, isUpdate } = this.props;
    if (this.props.userEdit.id !== prevProps.userEdit.id) {
      this.setState({
        values: userEdit,
        isUpdate: isUpdate,
        errorMessage: {
          taiKhoan: { name: "Tài khoản", error: "" },
          hoTen: { name: "Họ tên", error: "" },
          matKhau: { name: "Mật khẩu", error: "" },
          email: { name: "Email", error: "" },
          soDienThoai: { name: "Số điện thoại", error: "" },
          loaiNguoiDung: { name: "loại người dùng", error: "" },
        },
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="text-white bg-dark p-3 mb-3">
          {this.state.isUpdate ? "Thông tin người dùng" : "Form đăng ký"}
        </h3>
        <form className="container-fluid" onSubmit={this.handleSubmit}>
          <div className="row">
            <FromInput
              label="Tài khoản"
              name="taiKhoan"
              type="text"
              value={this.state.values.taiKhoan}
              handleChange={this.handleChange}
              errorMessage={this.state.errorMessage.taiKhoan.error}
            />
            <FromInput
              label="Họ tên"
              name="hoTen"
              value={this.state.values.hoTen}
              type="text"
              handleChange={this.handleChange}
              errorMessage={this.state.errorMessage.hoTen.error}
            />
            <FromInput
              label="Mật khẩu"
              name="matKhau"
              value={this.state.values.matKhau}
              type="password"
              handleChange={this.handleChange}
              errorMessage={this.state.errorMessage.matKhau.error}
            />
            <FromInput
              label="Số điện thoại"
              name="soDienThoai"
              value={this.state.values.soDienThoai}
              type="tel"
              handleChange={this.handleChange}
              errorMessage={this.state.errorMessage.soDienThoai.error}
            />
            <FromInput
              label="Email"
              name="email"
              value={this.state.values.email}
              type="email"
              handleChange={this.handleChange}
              errorMessage={this.state.errorMessage.email.error}
            />

            <div className="col-6 mb-3">
              <label>Mã loại người dùng</label>
              <select
                className="w-100 mt-1"
                style={{ padding: "3px" }}
                value={this.state.values.loaiNguoiDung}
                name="loaiNguoiDung"
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  Vui lòng chọn loại người dùng
                </option>
                <option value="khachHang">Khách hàng</option>
                <option value="quanTri">Quản trị</option>
              </select>
              <span className="text text-danger">
                {this.state.errorMessage.loaiNguoiDung.error}
              </span>
            </div>
          </div>
          {this.state.isUpdate ? (
            <button className="btn btn-primary">Cập nhật</button>
          ) : (
            <button className="btn btn-success no-drop" type="submit">
              Đăng ký
            </button>
          )}
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userEdit: state.QuanLyNguoiDungReducer.userEdit,
    userList: state.QuanLyNguoiDungReducer.userList,
    isUpdate: state.QuanLyNguoiDungReducer.isUpdate,
  };
};

export default connect(mapStateToProps)(FormDangKy);
