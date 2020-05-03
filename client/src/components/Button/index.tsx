import React from "react";

require("./style.scss");

export enum buttonColor {
  green = "green",
  orange = "orange",
  purple = "purple",
}

interface Props {
  border?: boolean;
  children?: any;
  className?: string; // passthrough for className
  color?: buttonColor; // color of icon
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = (props: Props): JSX.Element => {
  const { border, color, className, disabled, onClick } = props;

  return (
    <button
      disabled={disabled}
      className={`button 
        ${border ? "" : "no-border"} 
        ${className ? className : ""} 
        ${color ? color : ""} 
        ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      <span className="button-text">{props.children}</span>
    </button>
  );
};

Button.defaultProps = {
  border: true,
};

export default Button;
