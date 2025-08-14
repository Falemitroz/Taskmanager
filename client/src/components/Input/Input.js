import React from "react";
import styles from "./Input.module.css";

const Input = ({
  className = "",
  id,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  required = false,
  value,
  onChange,
  ...props
}) => {
  const Component = type === "textarea" ? "textarea" : "input";

  return (
    <div className={`${styles.wrapper} ${className}`} {...props}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <Component
        id={id}
        type={type !== "textarea" ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`${styles.input} ${type === "textarea" ? styles.textarea : ""}`}
      />
    </div>
  );
};

export default Input;
