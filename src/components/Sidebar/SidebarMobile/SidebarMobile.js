import React from 'react';
import classes from './SidebarMobile.css';
import Filters from '../Filters/Filters';

const SidebarMobile = (props) => {

    let feeds = [];
    for(let key in props.xmlURL){
        feeds.push(key);
    }

    
    return (
        <div className={classes.SidebarMobile}>
            <React.Fragment>            
            <Filters getRecent={props.getRecent} />
            <div className='feed-buttons'>
                {
                    feeds.map(feed => {
                        return (
                        <button key={Math.random() * 100} onClick={() => { props.clicked(feed) }} className={classes.Link}>{ feed }</button>
                        )
                    })
                }
            </div>
            </React.Fragment>
        </div>
    );
}

export default SidebarMobile;