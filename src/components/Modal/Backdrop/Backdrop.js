import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.modalVisible ? <div className={classes.Backdrop} onClick={props.clicked} ></div> : null
);

export default backdrop;