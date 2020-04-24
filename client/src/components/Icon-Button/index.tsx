import React from "react";

import Icon, { iconType } from "../Icon";

require("./style.scss");

interface Props {
  className?: string; // passthrough for className
  disabled?: boolean;
  icon: iconType;
  onClick: () => void; // passthrough for onClick
}

const IconButton: React.FC<Props> = (props: Props): JSX.Element => {
  const { className, disabled, icon, onClick } = props;

  return (
    <button
      className={`icon-button ${className ? className : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="icon-button-icon">
        <Icon iconType={icon} />
      </span>
    </button>
  );
};

export default IconButton;
