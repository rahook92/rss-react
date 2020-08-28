import React from 'react';
import ActionButton from './ActionButton/ActionButton';
import classes from './ActionButtons.css';

const actionButtons = (props) => {
    return (
        <div className={classes.ActionButtons}>
            <ActionButton text={'Share'} />
            <ActionButton text={'Read Later'} />
            <ActionButton />
        </div>
    );
}

export default actionButtons;