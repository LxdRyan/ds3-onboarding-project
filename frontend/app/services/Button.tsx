import React from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button type="button" className={`login100-form-btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
