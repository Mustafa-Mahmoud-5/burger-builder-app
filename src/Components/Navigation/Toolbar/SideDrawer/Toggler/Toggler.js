import React from 'react';
import classes from './Toggler.module.css';

const Toggler = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.open}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Toggler;






// use rafce to create a es6 component, use rce to create class-based one