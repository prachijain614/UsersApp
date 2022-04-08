import React, { useEffect, useState } from "react";
import WebService from "../../api";
import Users from "../../Components/Users";
import { useDispatch } from "react-redux";
import { setUsers } from "../../redux/users/action";
import { handleError } from "../../utils/helper";
import { debounce } from "lodash";

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

  /** debounce will optimize searching */
  const onSearch = debounce((e) => setSearch(e), 500);

  return (
    <>
      <a className="logout" href="/" onClick={onLogout}>
        Logout
      </a>
      <Users onSearch={(e) => onSearch(e)} />
    </>
  );
};

export default Page;
