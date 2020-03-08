import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'
const BuildControls = (props) => {
    // this is can be a fake state because i  want to use a type and label and i don`t want to change the main state shape so i can loop through it and display a control tool (buildControl component) for each obj
    const controls = [
        // label is used to display the ingredient with capitalize way while most importantly type is used to be passed as argument so i can determine which type i need to update in the state
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Salad', type: 'salad'},
        { label: 'Bacon', type: 'bacon' },
    ]

    return (

        <div className={classes.BuildControls}>

            <p>Total Price : $<strong>{props.totalPrice.toFixed(2)}</strong></p>

            {/* loop through the controls arr of objs and display the build control component based on each object label and type */}
            {controls.map(control => <BuildControl 
            label = {control.label} 
            key={control.label}
            addIngredientFunc = {() => props.addIngredientFunc(control.type)
            }
            RemoveIngredientHandler = {() =>{props.RemoveIngredientHandler(control.type)}}

            disabledInfo = {props.disabledInfo[control.type]} // this will be true or false based on the ingredient type as the props.disabledInfo is a copy of ingredients object but the values are replace with true or false instead of 1 or 2 or .....
            />)}


            {/* Purchase button should be disabled if the total ingredients sum =< 0 */}
            <button className={classes.OrderButton} disabled = {!props.purchasable} onClick={props.showModal}>Order Now</button>


        </div>
    )

}
export default BuildControls;