import React from 'react';
import classes from './SidebarHeader.css';

const sidebarHeader = (props) => {
    return (
        <div className={classes.SidebarHeader}>
            <p className={classes.Browse}>Browse</p>
        </div>
    );
}

export default sidebarHeader;