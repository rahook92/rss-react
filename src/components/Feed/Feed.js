import React from 'react';
import FeedCard from './FeedCard/FeedCard';
import classes from './Feed.css';

const feed = (props) => {
    return (
        <div className={classes.Feed}>
            <FeedCard />
        </div>
    );
}

export default feed;