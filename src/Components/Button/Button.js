import React from 'react';
import classes from './Button.module.css'
// i figured out that i need a custom button style so i made its own component
const Button = (props) => {

    // i have two classes (success and danger for green and red colors so i pass them as props to the button component)
    const btnClasses = [classes.Button, classes[props.btnType]]

    return  (

        <button disabled ={props.disabled} className={btnClasses.join(' ')} onClick={props.click}>{props.children}</button>

    )
}

export default Button;
