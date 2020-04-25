import React from "react";

import Icon, { iconType, iconColor } from "../Icon";
import Symbol, { symbolType } from "../Symbol";

require("./style.scss");

interface Props {
  className?: string; // passthrough for className
  color?: iconColor;
  disabled?: boolean;
  icon: iconType;
  onClick: () => void; // passthrough for onClick
  symbol?: symbolType;
}

const IconButton: React.FC<Props> = (props: Props): JSX.Element => {
  const { className, color, disabled, icon, onClick, symbol } = props;

  return (
    <button
      className={`icon-button ${className ? className : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="icon-button-icon">
        {icon && <Icon iconType={icon} color={color} />}
        {symbol && <Symbol symbolType={symbol} />}
      </span>
    </button>
  );
};

IconButton.defaultProps = {
  color: iconColor.grey,
};

export default IconButton;
