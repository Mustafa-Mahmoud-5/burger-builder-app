import React from 'react';
import classes from './BackDrop.module.css'
const BackDrop = (props) => {

    return (
        // show if the showModal state props is true, otherwise hide
        props.show ? <div className={classes.BackDrop} onClick ={props.close}></div> : null
        // and once we click, we excute the function that will set showmodal to false so it get closed along with the modal
    )
}
// this is justa BackDrop (parent Element) with transparent black bg color

export default BackDrop;