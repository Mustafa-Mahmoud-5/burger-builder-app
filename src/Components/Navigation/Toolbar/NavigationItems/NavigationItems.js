import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/'} active>link</NavigationItem>
        <NavigationItem link={'/'}>Link</NavigationItem>
        <NavigationItem link={'/'}>Link</NavigationItem>
    </ul>

)

export default NavigationItems;