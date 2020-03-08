import React from 'react';
import classes from './BuildControl.module.css'

const BuildControl = (props) => {

    return (
        // return the Control (this will get looped and displayed for each ingredient so we have a control tool for each ingredient)
        <div className = {classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>

            <button className={classes.Less} 
            onClick = {props.RemoveIngredientHandler}
            disabled = {props.disabledInfo}
            >Less</button>

            <button className={classes.More} onClick = {props.addIngredientFunc}>More</button>
        </div>
    )
}

export default BuildControl;