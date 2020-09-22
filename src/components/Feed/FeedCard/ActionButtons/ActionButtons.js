import React from 'react';
import classes from './ActionButtons.css';

const actionButtons = (props) => {
    let title = props.title;
    return (
        <div className={classes.ActionButtons}>
            <div>Share</div>
            <a href={"https://twitter.com/intent/tweet?text=" + title + "&url=" + props.URL } className={classes.ActionButton} data-show-count="false">Twitter</a>
            <button className={classes.ActionButton}>Read Later</button>
        </div>
    );
}

export default actionButtons;