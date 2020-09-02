import React from 'react';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import SidebarBody from './SidebarBody/SidebarBody';
import classes from './Sidebar.css';

const sidebar = (props) => {
    return (
        <div className={classes.Sidebar}>
            <button onClick={props.xmlRead}>getXML</button>
            <SidebarHeader getRecent={props.getRecent} />
            <SidebarBody clicked={props.clicked} />
        </div>
    );
}

export default sidebar;