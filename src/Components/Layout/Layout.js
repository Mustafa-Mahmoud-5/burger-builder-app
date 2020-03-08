import React from 'react';
import Aux from '../../HOC/Auxi';
import classes from './Layout.module.css'

const Layout = (props) => {

    return (

        <Aux>
            <div>Toolbar, SideDrawer, BackDrop</div>


            <main className = {classes.Content}>
                {/* Burger Builder Component */}
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;