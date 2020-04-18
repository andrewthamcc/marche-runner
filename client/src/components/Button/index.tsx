import React from "react";

require("./style.scss");

export enum buttonColor {
  green = "green",
  orange = "orange",
  purple = "purple",
}

interface OwnProps {
  color?: buttonColor; // color of icon
  border?: boolean;
  className?: string; // passthrough for className
  disabled?: boolean;
  children?: any;
  onClick?: () => void;
}

type Props = OwnProps;

const Button: React.FC<Props> = (props: Props): JSX.Element => {
  const { color, border, disabled, className, onClick } = props;

  return (
    <button
      disabled={disabled}
      className={`button 
        ${className ? className : ""} 
        ${color ? color : ""} 
        ${border ? "" : "no-border"} 
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
