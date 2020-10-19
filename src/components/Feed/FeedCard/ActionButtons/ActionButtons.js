import React from 'react';
import classes from './ActionButtons.css';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon } from 'react-share';

const actionButtons = (props) => {
    let title = props.title;
    return (
        <div className={classes.ActionButtons}>
            <div className={classes.buttonsContainer}>
                <TwitterShareButton children={<TwitterIcon size={24} round={true} />} url={props.URL} />
                <FacebookShareButton children={<FacebookIcon size={24} round={true} />} url={props.URL} />
                <RedditShareButton children={<RedditIcon size={24} round={true} />} url={props.URL} />
            </div>
        </div>
    );
}

export default actionButtons;