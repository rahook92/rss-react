import React from 'react';
import classes from './Image.css';

const image = (props) => {
    if(props.image){
        return (
            <div className={classes.Image}>
                <img alt='thumb' src={props.image} />
            </div>
        );
    } else {
        return null;
    }
}

export default image;