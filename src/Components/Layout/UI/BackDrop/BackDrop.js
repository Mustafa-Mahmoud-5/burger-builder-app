import React from 'react';
import classes from './BackDrop.module.css'
const BackDrop = (props) => {

    return (
        // show if the showModal state props is true, otherwise hide
        props.showModal ? <div className={classes.BackDrop} onClick ={props.closeModal}></div> : null
    )
}
// this is justa BackDrop (parent Element) with transparent black bg color

export default BackDrop;