import React from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div className="height flex-column d-flex justify-content-center align-items-center">
      <p className="title">Choose Your Play Mode</p>

      <NavLink
        style={{ textDecoration: "none" }}
        className=" landing-btn mb-2 shadow"
        to="/ai"
      >
        Play With AI
      </NavLink>
      <NavLink
        style={{ textDecoration: "none" }}
        className=" landing-btn mt-2 shadow"
        to="/friend"
      >
        Play With Friend
      </NavLink>
    </div>
  );
}
