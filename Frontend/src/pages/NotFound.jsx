import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="content">
        <h1>404 Not Found</h1>
        <p>The page you visited was not found. You may return to the homepage.</p>
        <Link to={"/"} className="btn">
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;