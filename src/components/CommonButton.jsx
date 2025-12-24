import React from "react";

export default function CommonButton({
  icon,
  label,
  onClick,
  size = "md",
  className = "",
  disabled = false,
  style = {},
}) {
  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";

  return (
    <button
      className={`btn btn-primary ${sizeClass} ${className}`}
      style={{ marginRight: 5, ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`fa fa-${icon} fa-fw`}></i>}
      {label}
    </button>
  );
}
