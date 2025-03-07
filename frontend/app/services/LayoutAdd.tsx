import React from "react";
import "../routes/css/util.css";
import "../routes/css/main.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
