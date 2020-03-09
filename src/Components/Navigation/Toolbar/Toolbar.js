import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import Toggler from './SideDrawer/Toggler/Toggler';
const Toolbar = (props) => {

    return (

        <header className={classes.Toolbar}>
            <Toggler open = {props.openSideDrawer}/>

            <Logo height = {'90%'}/>

            <nav>
                <NavigationItems />
            </nav>
        </header>

    )
}

export default Toolbar