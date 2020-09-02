import React from 'react';
import classes from './ActionButton.css';


const actionButton = (props) => {

    return (
    <div>
        <button className={classes.ActionButton} onClick={() => { props.shareClick(props.URL) }}>
            {props.text}
        </button>
    </div>
    );
}

export default actionButton;