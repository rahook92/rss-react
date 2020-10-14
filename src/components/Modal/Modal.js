import React from 'react';
import Backdrop from './Backdrop/Backdrop';
import SidebarMobile from '../Sidebar/SidebarMobile/SidebarMobile';
import classes from './Modal.css';

const modal = (props) => (
    <React.Fragment>
        <Backdrop modalVisible={props.modalVisible} clicked={props.showModal} />
        <div 
            style={{
                transform: props.modalVisible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.modalVisible ? '1' : '0' }}
            className={classes.Modal}>
            <SidebarMobile xmlURL={props.xmlURL} getRecent={props.getRecent} showModal={props.showModal} clicked={props.clicked} />
        </div>
    </React.Fragment>
)

export default modal;