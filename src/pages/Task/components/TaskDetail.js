import React from "react";
import { Link } from "react-router-dom";

const TaskDetail = () => {
  return (
    <div className="container card p-2 px-4 under-navbar">
      <div className="my-5 d-flex align-items-center justify-content-between">
        <Link to="/tasks" className="btn btn-secondary px-4">
          Back
        </Link>
        <h1 className="text-center">Add task</h1>
        <br />
      </div>
    </div>
  );
};

export default TaskDetail;
