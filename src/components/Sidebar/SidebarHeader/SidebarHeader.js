import React from 'react';
import classes from './SidebarHeader.css';

const sidebarHeader = (props) => {
    return (
        <div className={classes.SidebarHeader}>
            <p className={classes.Browse}>Browse</p>
            <button onClick={props.getRecent} className={classes.Recent}>Recent</button>
        </div>
    );
}

export default sidebarHeader;