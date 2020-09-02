import React from 'react';
import classes from './Image.css';

const image = (props) => {
    return (
        <div className={classes.Image}>
            <img alt='thumb' src={props.image} />
        </div>
    );
}

export default image;