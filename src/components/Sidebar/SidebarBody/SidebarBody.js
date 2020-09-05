import React from 'react';
import classes from './SidebarBody.css';
import Filters from '../Filters/Filters';

const sidebarBody = (props) => {

    let feeds = [];
    for(let key in props.xmlURL){
        feeds.push(key);
    }

    return (
        <div classes={classes.SidebarBody}>
            <Filters getRecent={props.getRecent} />
            {
                feeds.map(feed => {
                    return (
                    <button key={Math.random() * 100} onClick={() => { props.clicked(feed) }} className={classes.Link}>{ feed }</button>
                    )
                })
            }
        </div>
    );
}

export default sidebarBody;