import React from "react";
import styles from './Button.module.css'

export default function Button({children, onClick, className, ...style}) {
    return (
        <button 
            className={`${styles.btn} ${className}`} 
            onClick={onClick} 
            style={style}
        >
            {children}
        </button>
    )
}
