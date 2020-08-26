import React from 'react';
import Image from './Image/Image';
import Preview from './Preview/Preview';
import ActionButtons from './ActionButtons/ActionButtons';
import classes from './FeedCard.css';

const feedCard = (props) => {
    return (
        <div className={classes.FeedCard}>
            <Image />
            <Preview 
                title={props.title} 
                content={props.content} 
                clicked={props.clicked} />
            <ActionButtons />
        </div>
    );
}

export default feedCard;