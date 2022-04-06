import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WebService from "../../api";
import { setUsers } from "../../redux/users/action";
import { handleError } from "../../utils/helper";
import "./style.css";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Users = () => {
  let users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const onEditRow = async (row) => {
    try {
      const action = `${WebService.Action.edit}${row._id}`;
      let params = {
        firstname: row.firstname,
        lastname: row.lastname,
        email: row.email,
      };
      let response = await WebService.post(action, params);
      let data = users?.map((d) => {
        if (response.payload._id === row._id) {
          d["editable"] = false;
        }
        return d;
      });
      dispatch(setUsers(data));
    } catch (err) {
      handleError(err?.response);
    }
  };
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <TableHead />
        </thead>
        <tbody>
          <TableRow data={users} onEdit={onEditRow} />
        </tbody>
      </table>
    </>
  );
};

export default Users;
