import React from 'react';
import Burger from '../../Layout/Burger/Burger';
import Button from '../../../Components/Button/Button';
import classes from './CheckOutSummary.module.css';

const CheckOutSummary = (props) => {

    
    let intro = 'We Hope It Tastes Well!'

    return (
        // this will be the review of the order(it is like the order summary but i will show him the burger he ordered)
        <div className={classes.CheckOutSummary}>
            <h1>{intro}</h1>
            <div>
                <Burger ingredients ={props.ingredients}/>    
            </div>

            <Button btnType = {'Danger'} click ={props.purchaseCancel}>CANCEL</Button>
            <Button btnType = {'Success'} click={props.purchaseContinue}>CONTINUE</Button>
            
        </div>
    )
}

export default CheckOutSummary;
