import React, { useEffect, useState } from 'react';
import classes from './SidebarBody.css';
import Filters from '../Filters/Filters';
import vertIcon from '../../../icons/vertical-menu.png';

const SidebarBody = (props) => {

    let feeds = [];
    for(let key in props.xmlURL){
        feeds.push(key);
    }

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    let handleResize = () => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });


    
    return (
        <div className={classes.SidebarBody}>
            { dimensions.width <= 700 ? <img className={classes.menuIcon} onClick={props.showModal} src={vertIcon} alt='icon' /> :
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
            }
        </div>
    );
}

export default SidebarBody;