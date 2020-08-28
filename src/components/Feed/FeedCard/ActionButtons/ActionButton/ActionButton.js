import React from 'react';
import classes from './ActionButton.css';


const actionButton = (props) => {

   const clicked = () => {
        switch(props.text){
            case 'Share':
                console.log('share-modal-activated');
            break;
            case 'Read Later':
                console.log('article saved');
            break;
            default: console.log(props.text);
        }
    }

    return (
    <div>
        <button className={classes.ActionButton} onClick={clicked}>
            {props.text}
        </button>
    </div>
    );
}

export default actionButton;