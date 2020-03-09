import React, { Component } from 'react';
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../../HOC/Auxi';
class Modal extends Component {



    // this component should only update when the props.showModal is updated, so we can make it only update on such case for saving some performance
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.showModal !== this.props.showModal
    }
    componentDidUpdate(){
        console.log('updated')
    }


    render(){
    // hide the scrolling bar when the user open the modal
    if(this.props.showModal === true){
        document.querySelector('html').style.overflow = 'hidden'
    }
    else{
        document.querySelector('html').style.overflow = 'auto'
    }

        
        return (

            <Aux>
            {/* adding the backdrop that the user will clock on it to close the modal*/}
            <BackDrop show = {this.props.showModal} close  = {this.props.closeModal}/>
    
    
            {/* add inline style in the component to dynamically show the modal with some animation */}
            <div className={classes.Modal} style = {{
                transform: this.props.showModal ? 'translateY(0)' : 'translateY(-150vh)'
            }}>
                {this.props.children}
            </div>
            </Aux>
    
        )
    
    }

    

}

export default Modal