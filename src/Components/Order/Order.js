import React from 'react'
import classes from './Order.module.css'
const Order = (props) => {


    

    // convert the ingredients obj to ana array of the keys(prop names) then loop through it to fetch its properties and name and show them in a span
    let ings = Object.keys(props.ingredients).map(ingName => {

        return <span
        key={ingName} 
        style={
            {textTransform: 'capitalize', 
            display:'inline-block', 
            margin: '0 8px', 
            border: '1px solid #ccc' , 
            padding: '5px'}}>{ingName} ({props.ingredients[ingName]})</span>
    })

    console.log(ings)

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ings} </p>
            <p>Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
