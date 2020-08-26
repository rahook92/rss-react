import React from 'react';
import classes from './SidebarBody.css';

const sidebarBody = (props) => {
    return (
        <div classes={classes.SidebarBody}>
            <a className={classes.Link} href='#'><div>Link</div></a>
            <a className={classes.Link} href='#'><div>Link</div></a>
            <a className={classes.Link} href='#'><div>Link</div></a>
        </div>
    );
}

export default sidebarBody;