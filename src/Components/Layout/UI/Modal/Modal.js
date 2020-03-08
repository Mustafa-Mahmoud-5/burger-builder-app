import React from 'react';
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../../HOC/Auxi';
const Modal = (props) => {


    // hide the scrolling bar when the user open the modal
    if(props.showModal === true){
        document.querySelector('html').style.overflow = 'hidden'
    }
    else{
        document.querySelector('html').style.overflow = 'auto'
    }

    return (

        <Aux>
        {/* adding the backdrop that the user will clock on it to close the modal*/}
        <BackDrop showModal = {props.showModal} closeModal  = {props.closeModal}/>


        {/* add inline style in the component to dynamically show the modal with some animation */}
        <div className={classes.Modal} style = {{
            transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)'
        }}>
            {props.children}
        </div>
        </Aux>

    )
}

export default Modal