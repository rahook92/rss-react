import React from 'react';
import Backdrop from './Backdrop/Backdrop';
import classes from './Modal.css';

const modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.noShow} />
        <div 
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            className={classes.Modal}>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url='https://www.google.com' data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    </React.Fragment>
)

export default modal;