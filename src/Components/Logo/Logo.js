import React from 'react';
import classes from './Logo.module.css';
import logo from '../../Assets/images/burger-logo.png';

const Logo = (props) => {

    return (

        <div className={classes.Logo} style={{height: props.height}}>
            <img src={logo} alt="Burger App Logo"/>
        </div>
    )
}

export default Logo;