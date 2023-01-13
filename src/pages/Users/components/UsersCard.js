import React from "react";
import "./usestyle.css";

const UsersCard = ({ usersData }) => {
  const users = usersData;

  return (
    <div className="m-5">
      <h1 className="text-center">Users Card</h1>

      {users.map((item, index) => {
        return (
          <div key={index} className="user-card">
            <div className="avatar">
              {item.photo ? (
                <img src={item.photo} alt={item.username} />
              ) : (
                <img
                  src="https://www.w3schools.com/w3images/avatar1.png"
                  alt="alt"
                />
              )}
            </div>
            <div className="info">
              <h4 className="text-secondary">
                <span className="text-dark">{"#" + item.id} </span>
                {"@" + item.username}
              </h4>
              <h6>{item.first_name + " " + item.last_name}</h6>
              <h6>
                {item.status ? (
                  <span className="text-success">active</span>
                ) : (
                  <span className="text-danger">inactive</span>
                )}
              </h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersCard;
