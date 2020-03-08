import React from 'react';
import Aux from '../../../../HOC/Auxi';
import Button from '../../../Button/Button';
const OrderSummary = (props) => {
    // the order summary will simply be the las update of our ingredients object in the state so i loop through it to output it in a p element here in this component 

    let order = Object.keys(props.ingredients).map(ingredient =>{

    return <p key = {ingredient}>
        <span style={{textTransform: "capitalize"}}>{ingredient}</span>: {props.ingredients[ingredient]}</p>
    })

    
    return (
        <Aux>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            {order}
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType = {'Danger'} click ={props.closeModal}>Cancel</Button>
            <Button btnType = {'Success'} click = {props.continuePurchasing}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;