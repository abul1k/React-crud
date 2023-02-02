import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// style
import "../style.css";
import { toast } from "react-toastify";

const TaskDetail = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    project_name: "",
    logo: "",
    start_date: "",
    end_date: "",
    description: "",
    done: 0,
  });

  const [image, setImage] = useState(
    "https://archive.org/download/no-photo-available/no-photo-available.png"
  );

  const getLogo = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const createProject = () => {
    toast.success("Created successfuly");
    navigate("/tasks");
  };

  return (
    <div className="container card p-2 px-4 under-navbar">
      <div className="my-5 d-flex align-items-center justify-content-between">
        <Link to="/tasks" className="text-success px-4 text-decoration-none">
          <AiOutlineLeft size="14" /> Back
        </Link>
        <h1 className="text-center">Add task</h1>
        <br />
      </div>
      <div className="row p-5 m-3 rounded border  bg-light">
        <div className="col-md-7">
          <div className="d-flex justify-content-between">
            <div className="project-logo">
              <img alt="logo" src={image} className="w-100 h-100" />
            </div>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Project logo</Form.Label>
                <Form.Control type="file" onInput={getLogo} accept="image/*" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Start date:</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>End date:</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="col-md-5">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of project:</Form.Label>
              <Form.Control type="test" placeholder="Name of project" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project URL:</Form.Label>
              <Form.Control type="test" placeholder="for.example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About project</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Text here..." />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="action d-flex justify-content-end pe-3">
        <Button size="lg" variant="secondary">
          <Link to="/tasks" className="text-white text-decoration-none">
            Cancel
          </Link>
        </Button>
        <Button
          onClick={createProject}
          size="lg"
          variant="success"
          className="ms-2"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
