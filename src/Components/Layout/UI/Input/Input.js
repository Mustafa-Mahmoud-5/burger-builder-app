import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {

    // in this component, i will have a custom prototype of the input



    // i expect to get the invalid prop to check if it is true then make the inp color red and aslo get the should validate prop so to check if the current element has a validation object or not because the select box validation isn`t required and i don`t want to make its color red and also pass a touched prop so we can check if the user touched the input or not to only show red alerts when he start typing invalid things not when he immediatlly (sorry for speeling :) visit the form 
    let inpClasses = [classes.InputElement];
    let errorMessage;

    if(props.invalid && props.shouldValidate && props.touched) {
        inpClasses.push(classes.Invalid)

        // show error message to each input
        errorMessage = `please enter a valid ${props.elementconfig.placeholder}`

    }



    // i need a text area and input so i will make some condition to determine it based on the passed props

    let inp;
    if(props.inputtype === 'input'){
        // i may have input type text or email so instead of decide it as prop, i will extreact all the props the user write and put them here as attribute for more flexability
        inp = <input {...props.elementconfig} className={inpClasses.join(' ')} value={props.value} onChange={props.changed}/>
    }
    else if (props.inputtype === 'textarea'){
        inp = <textarea {...props.elementconfig} className={inpClasses.join(' ')} value={props.value} onChange={props.changed}/>
    }
    else if (props.inputtype === 'select'){
        inp = <select className={inpClasses.join(' ')} 
        value={props.value} onChange={props.changed}>
            {props.elementconfig.options.map(option => {
                return <option value={option.value} key={option.value}>{option.displayValue}</option>
            })}
        </select>
    }
    return (
        <div className={classes.Input}>
            {inp}
        <p style={{color: 'red' , margin: '0'}}>{errorMessage}</p>
        </div>
    )
}

export default Input;
