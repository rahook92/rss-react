import React from 'react';
import classes from './Preview.css';

const preview = (props) => {
    return (
        <div className={ props.noImg === false ? classes.Preview : classes.PreviewNoImg }>
            <a className={classes.Link} target="_blank" rel="noopener noreferrer" href={props.URL}><p className={classes.articleTitle} onClick={props.clicked}>{props.title}</p></a>
        </div>
    );
}

export default preview;