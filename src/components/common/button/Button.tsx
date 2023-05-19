import React, { Children } from "react";

import styles from './button.module.css';

interface ButtonProps {
    type?: "button" | "submit";
    children: React.ReactNode;
    onClick?: () => void;
    red?: boolean;
    small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = "button", children, onClick, red, small }) => {
    const buttonClass = small ? `${styles.smallButton}` : `${styles.button} ${red && styles.deleteButton}`;
  
    return (
      <button type={type} onClick={onClick} className={buttonClass}>
        {children}
      </button>
    );
  };
  

export default Button;