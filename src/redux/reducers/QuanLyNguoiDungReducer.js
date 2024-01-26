import {
  ADD_USER,
  DEL_USER,
  EDIT_USER,
  UPDATE_USER,
} from "../actions/QuanLyNguoiDungTypes";

const initialState = {
  userList: [
    {
      id: 1,
      taiKhoan: "nguyenvana",
      hoTen: "Nguyen Van A",
      matKhau: "123",
      email: "nguyenvana@gmail.com",
      soDienThoai: "0123456789",
      loaiNguoiDung: "khachHang",
    },
    {
      id: 2,
      taiKhoan: "nguyenvanb",
      hoTen: "Nguyen Van B",
      matKhau: "123",
      email: "nguyenvanb@gmail.com",
      soDienThoai: "0123456789",
      loaiNguoiDung: "khachHang",
    },
  ],
  
  userEdit: {
    id: -1,
    taiKhoan: "",
    hoTen: "",
    matKhau: "",
    email: "",
    soDienThoai: "",
    loaiNguoiDung: "",
  },
  isUpdate: false,
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        userList: [...state.userList, action.newUser],
      };
    }
    case DEL_USER: {
      const newUserList = state.userList.filter(
        (user) => user.id !== action.id
      );

      return { ...state, userList: newUserList };
    }
    case EDIT_USER: {
      const { userList } = state;
      const { id } = action.user;

      const userListUpdated = userList.map((user) => {
        if (user.id === id) {
          const updatedUser = { ...user };
          Object.keys(updatedUser).forEach((key) => {
            updatedUser[key] = key === "id" ? id : "Đang cập nhật...";
          });
          return updatedUser;
        }
        return user;
      });

      return {
        ...state,
        userList: userListUpdated,
        userEdit: action.user,
        isUpdate: true,
      };
    }

    case UPDATE_USER: {
      const { userList } = state;
      const { newUser } = action;
      const userListUpdated = userList.map((user) =>
        user.id === newUser.id ? { ...newUser } : user
      );
      state.userEdit = {
        id: -1,
        taiKhoan: "",
        hoTen: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        loaiNguoiDung: "",
      };
      state.isUpdate = false
      return {
        ...state,
        userList: userListUpdated,
      };
    }
    default:
      return { ...state };
  }
};
