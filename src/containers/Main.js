import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import classes from '../App.css';

const main = () => {
    return (
        <div className={classes.MainContainer}>
            <Sidebar />
            <Feed />
        </div>
    );
}

export default main;

