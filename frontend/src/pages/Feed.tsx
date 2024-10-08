import React from "react";
import { Link } from "react-router-dom";

const Feed: React.FC = () => {
  return (
    <div>
      <Link to={"/login"}>
      login
      </Link> <br />
      <Link to={"/signup"}>
      singup
      </Link>
    </div>
  );
};

export default Feed;
