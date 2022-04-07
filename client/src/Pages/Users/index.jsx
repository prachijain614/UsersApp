import React, { useEffect, useState } from "react";
import WebService from "../../api";
import Users from "../../Components/Users";
import { useDispatch } from "react-redux";
import { setUsers } from "../../redux/users/action";
import { handleError } from "../../utils/helper";

const Page = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [search]);

  const getUsers = async () => {
    try {
      const action = `${WebService.Action.list}?search=${search}`;
      let response = await WebService.get(action);
      // debugger;
      /** make table cell non-editable initially */
      let data = response.payload?.map((d) => {
        d["editable"] = false;
        return d;
      });
      dispatch(setUsers([...data]));
    } catch (err) {
      handleError(err?.response);
    }
  };

  const onLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <a className="logout" href="/" onClick={onLogout}>
        Logout
      </a>
      <Users onSearch={setSearch} />
    </>
  );
};

export default Page;
