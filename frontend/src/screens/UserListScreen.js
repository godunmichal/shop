import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div className="usersList">
      <div>
        <h1>Users</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CREATED AT</th>
              <th>IS ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
