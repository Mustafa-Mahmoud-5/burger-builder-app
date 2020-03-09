import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../../Layout/UI/BackDrop/BackDrop';
import Aux from '../../../../HOC/Auxi';

// i want to set some classes dynamically (i want to open and close the sideDrawer with animation (of course i could do it using ternary operator inside the inline style but this would be better at least to me))
const SideDrawer = (props) => {

    let sideDrawerClasses =[classes.SideDrawer];

    if(props.showDrawer){
        sideDrawerClasses.push(classes.open);
    }
    else{
        sideDrawerClasses.push(classes.close);
    }

    return (


        <Aux>
            
            <BackDrop show={props.showDrawer} close={props.close}/>


            <div className={sideDrawerClasses.join(' ')}>
                <Logo height = {'11%'}/>

                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;