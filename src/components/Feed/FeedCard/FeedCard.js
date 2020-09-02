import React from 'react';
import Image from './Image/Image';
import Preview from './Preview/Preview';
import ActionButtons from './ActionButtons/ActionButtons';
import classes from './FeedCard.css';

const feedCard = (props) => {
    return (
        <div className={classes.FeedCard}>
            <Image image={props.image} />
            <Preview 
                title={props.title} 
                content={props.content}
                URL={props.articleURL} 
                clicked={props.clicked} />
            <ActionButtons URL={props.articleURL} shareClick={props.shareClick} />
        </div>
    );
}

export default feedCard;