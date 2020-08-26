import React from 'react';
import classes from './Preview.css';

const preview = (props) => {
    return (
        <div className={classes.Preview}>
            <h1 className={classes.articleTitle} onClick={props.clicked}>{props.title}</h1>
            <p className={classes.articleBlurb}>{props.content}</p>
            <button className={classes.Button}>read more</button>
        </div>
    );
}

export default preview;