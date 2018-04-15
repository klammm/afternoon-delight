import React, { Component } from "react";

import CheckboxItem from "./checkbox-item";

class Header extends Component {
  render () {
    return (
      <nav className="Header">
        <div className="Header-wrapper">
          Header
          <CheckboxItem>
            Checkbox Item within Header
          </CheckboxItem>
        </div>
      </nav>
    )
  }
}

export default Header;
