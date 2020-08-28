import React from 'react';
import classes from './SidebarBody.css';

const sidebarBody = (props) => {
    return (
        <div classes={classes.SidebarBody}>
            <button onClick={() => { props.clicked('Guardian') }} className={classes.Link}>Guardian</button>
            <button onClick={() => { props.clicked('NYTimes') }} className={classes.Link}>New York Times</button>
            <button onClick={() => { props.clicked('News') }} className={classes.Link}>News-API</button>
        </div>
    );
}

export default sidebarBody;