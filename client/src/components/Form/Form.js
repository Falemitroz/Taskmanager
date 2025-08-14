import React from "react";
import { Button } from '../../components';
import styles from './Form.module.css';

const Form = ({ children, title, onClose, onSubmit }) => {
    function handleSubmit(e){
        e.preventDefault();
        onSubmit();
        onClose();
    }
    return (
        <div className={styles.form} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className={styles.content}>
                <div style={{display: 'flex', justifyContent:'end'}}>
                    <Button onClick={onClose} className={styles.closeBtn}>&times;</Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.wrapper}>
                        <h1>{title}</h1>
                        {children}
                        <Button onClick={handleSubmit}>Conferma</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;