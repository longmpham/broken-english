import React from "react";

import "../../Styles/variables.scss";

const ButtonGroup = ({ buttons, handleTolerance }) => {
  return (
    <div className="btn-group">
      {buttons.map((button) => {
        return (
          <button
            key={button}
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
