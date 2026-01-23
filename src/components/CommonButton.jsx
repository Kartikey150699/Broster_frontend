// src/components/CommonButton.jsx
import React from "react";

export default function CommonButton({
  icon,
  label,
  onClick,
  size = "md",
  color = "primary",
  className = "",
  disabled = false,
  style = {},
}) {
  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";

  const colorClass = color === "danger" ? "btn-danger" : "btn-primary";

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
