import React from 'react';
import classes from './Preview.css';

const preview = (props) => {
    
    return (
        <div className={classes.Preview}>
            <a className={classes.Link} target="_blank" rel="noopener noreferrer" href={props.URL}><h1 className={classes.articleTitle} onClick={props.clicked}>{props.title}</h1></a>
            <p className={classes.articleBlurb}>{props.content}</p>
        </div>
    );
}

export default preview;