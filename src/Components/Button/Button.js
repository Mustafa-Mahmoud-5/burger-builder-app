import React from 'react';
import classes from './Button.module.css'
// i figured out that i need a custom button style so i made its own component
const Button = (props) => {

    const btnClasses = [classes.Button, classes[props.btnType]]

    return  (

        <button className={btnClasses.join(' ')} onClick={props.click}>{props.children}</button>

    )
}

export default Button;
