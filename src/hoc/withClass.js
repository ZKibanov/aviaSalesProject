import React from "react";

const withClass = (Component, className) => (props) => {
    <div className={className}>
      <Component {...props} />
    </div>;
  };
export default withClass;
