import axios from "axios";
import React, { useState, useEffect } from "react";

// Bootstrap
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";

// style
import "./style.css";

const Task = () => {
  // variables
  const flex = "d-flex justify-content-between align-items-center";

  // default states
  const [tasks, setTasks] = useState([]);

  // actions
  useEffect(() => {
    fetchTasks();
  }, []);

  // function to get tasks from db.json
  const fetchTasks = () => {
    axios.get("http://localhost:6969/projects").then((res) => {
      setTasks(res.data);
    });
  };

  return (
    <div className="container card p-2 under-navbar">
      <h1 className="text-center my-5">Tasks</h1>
      <div className="mx-5">
        <div className={flex}>
          <h3>Projects</h3>
          <Link to="/task-detail">
            <button className="btn btn-success px-4">Add task</button>
          </Link>
        </div>

        <div className="row mt-3">
          {tasks.map((item, index) => {
            return (
              <div key={index} className="col-md-3 mb-4">
                <div className="card pointer bg-secondary text-light">
                  <div className="card-header d-flex justify-content-between align-items-center pb-0">
                    <h5>#{item.id}</h5>
                    <div className="d-flex mt-1">
                      <h6 className="text-white">{item.project_name}</h6>
                    </div>
                  </div>
                  <div className="card-body ">
                    <p>{item.description}</p>
                    <ProgressBar
                      variant={item.done === 100 ? "success" : "warning"}
                      animated={item.done !== 100 ? true : false}
                      now={item.done}
                      label={`${item.done}%`}
                      striped
                      color="dark"
                    />
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center pb-0">
                    <p>
                      {item.start_date} / {item.end_date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
