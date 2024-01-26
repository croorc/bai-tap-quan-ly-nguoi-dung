import { ADD_USER, DEL_USER, EDIT_USER, UPDATE_USER } from "./QuanLyNguoiDungTypes";

export const addUser = (newUser) => ({
  type: ADD_USER,
  newUser
})


export const deleteUser = (id) => ({
  type: DEL_USER,
  id
})

export const editUser = (user) => ({
  type: EDIT_USER,
  user
})

export const updateUser = (newUser) => ({
  type: UPDATE_USER,
  newUser
})


