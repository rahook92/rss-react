import React from 'react';
import ActionButton from './ActionButton/ActionButton';
import classes from './ActionButtons.css';

const actionButtons = (props) => {
    return (
        <div className={classes.ActionButtons}>
            <ActionButton />
            <ActionButton />
            <ActionButton />
        </div>
    );
}

export default actionButtons;