import React from "react";

const CheckboxItem = ({ children, name, checkboxId }) => (
  <div className="CheckboxItem">
    <input
      type="checkbox"
      className="CheckboxItem-label"
      id={checkboxId}
      name={name}
    />
    {children}
  </div>
);

export default CheckboxItem;
