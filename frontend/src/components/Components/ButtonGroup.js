import React from "react";

import "../../Styles/variables.scss";

const ButtonGroup = ({ buttons, handleTolerance }) => {
  console.log(buttons);
  return (
    <div className="btn-group">
      {buttons.map((button) => {
        return (
          <button
            type="text"
            value={button}
            onClick={handleTolerance}
            className="btn btn-tertiary"
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
