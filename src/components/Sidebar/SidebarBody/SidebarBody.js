import React from 'react';
import classes from './SidebarBody.css';
import Filters from '../Filters/Filters';

const sidebarBody = (props) => {
    return (
        <div classes={classes.SidebarBody}>
            <Filters />
            <button onClick={() => { props.clicked('Guardian') }} className={classes.Link}>Complex</button>
        </div>
    );
}

export default sidebarBody;