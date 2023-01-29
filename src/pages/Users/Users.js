import React, { useState, useEffect } from "react";

// bootstrap
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// icons
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

// react elect
import Select from "react-select";

// some style for users
import "./components/usestyle.css";

// components
import UsersCard from "./components/UsersCard";
import Pagination from "../../components/Pagination";

// axios
import axios from "axios";

// toast
import { toast } from "react-toastify";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = () => {
    axios
      .get(
        `http://localhost:6969/users?_sort=id&_order=desc&username_like=${filterData}&status_like=${userStatus}`
      )
      .then((res) => {
        setUsersData(res.data);
      });
  };

  const onUsefilter = (username) => {
    setFilterData(username);
    fetchUsers();
  };

  const changeStatus = (status) => {
    setUserStatus(status.value);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [id, setId] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  // modal
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  // delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  const [filterData, setFilterData] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const statuses = [
    {
      name: "Both",
      value: "",
    },
    {
      name: "Active",
      value: true,
    },
    {
      name: "Inactive",
      value: false,
    },
  ];

  const handleClose = () => {
    setShow(false);

    // clear userData
    setId(null);
    setFirstName("");
    setLastName("");
    setUsername("");
    setStatus(false);
    setPassword("");
    setPhoto("");
  };

  const handleShow = (one_user) => {
    setShow(true);

    if (one_user.id) {
      setIsEdit(true);
      setId(one_user.id);
      setFirstName(one_user.first_name);
      setLastName(one_user.last_name);
      setUsername(one_user.username);
      setStatus(one_user.status);
      setPhoto(one_user.photo);
      setPassword(one_user.password);
    } else {
      setIsEdit(false);
    }
  };

  const saveUser = () => {
    let addedUser = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      username: username,
      status: status,
      password: password,
      photo: photo,
    };

    if (first_name !== "" && last_name !== "" && username !== "") {
      if (!isEdit) {
        axios.post("http://localhost:6969/users", addedUser).then(() => {
          fetchUsers();
          toast.success("User added successfully");
          handleClose();
        });
      } else {
        axios.patch(`http://localhost:6969/users/${id}`, addedUser).then(() => {
          fetchUsers();
          toast.success("User changed successfully");
          const get_user_local = JSON.parse(localStorage.getItem("user"));
          handleClose();
          if (id === get_user_local.id)
            localStorage.setItem("user", JSON.stringify(addedUser));
        });
      }
    } else {
      toast.error("Fill in the content");
    }
  };

  const [deleteId, setDelete] = useState(null);

  const deleteUser = (user) => {
    setDelete(user);
    setDeleteModal(true);
  };

  const deleted = () => {
    axios.delete(`http://localhost:6969/users/${deleteId}/`).then(() => {
      fetchUsers();
    });

    toast.success("User deleted successfully");
    setDeleteModal(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  // get current users
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const CurrentUser = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const onUsePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container under-navbar card p-2">
      <h1 className="text-center my-5">Users</h1>

      <div className="mx-5">
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex justify-content-between">
            <input
              onChange={(e) => onUsefilter(e.target.value)}
              placeholder="@username"
              className="form-control react-select mr-"
            />
            <Select
              className="basic-single react-select"
              classNamePrefix="select"
              isSearchable={true}
              name="name"
              defaultValue={statuses[0]}
              options={statuses}
              getOptionLabel={(v) => v.name}
              onChange={changeStatus}
            />
          </div>

          <button className="btn btn-success px-4" onClick={handleShow}>
            Add User
          </button>
        </div>

        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>№</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CurrentUser.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{"@" + user.username}</td>
                  <td>
                    {user.status ? (
                      <Badge pill bg="success">
                        active
                      </Badge>
                    ) : (
                      <Badge pill bg="danger">
                        inactive
                      </Badge>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn text-warning"
                      onClick={() => handleShow(user)}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="btn text-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          {/* place for pagination */}
          <Pagination
            perPage={perPage}
            totalUsers={usersData.length}
            paginate={onUsePaginate}
          />
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {isEdit ? "Edit user" : "Add new User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <label>First name</label>
                <input
                  className="form-control"
                  placeholder="First name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Last name</label>
                <input
                  className="form-control"
                  placeholder="Last name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label>Username</label>
                <input
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label>Status</label>
              <Form.Check
                className=""
                type="switch"
                id="custom-switch"
                label={status ? "active" : "inactive"}
                checked={status}
                onChange={() => setStatus(!status)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={saveUser}>
            {isEdit ? "Edit user" : "Add user"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do yo really want to delete this user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={deleted}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <UsersCard usersData={usersData} />
    </div>
  );
};

export default Users;
