import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
        // we need to loop through an object so we can`t , so we can use Object.key to return an array of the object properties
        // but we need to return an array that has a number of properties equal to the object property value to each property
        // the Array method returns an array of spaces(undefined) elements , the number of the elements is based on the number you path..
        // Array(3) this returns [undefined,undefined,undefined]
        // the idea here is to get an array of the number of each ingredient so we don`t care about the undefined value

        let transformedIngredients = Object.keys(props.ingredients).map(ingredient =>{
            return [...Array(props.ingredients[ingredient])].map( (_, index) =>{
                return <BurgerIngredient key = {ingredient + index} type={ingredient} />
            })
        }).reduce((storedElements, currentElement) => {
            return storedElements.concat(currentElement)
        }, []);

        // i simplified(reduced) the array of arrays of burger components to just an array of burger component to check if it is empty easily but using the length property 


        // check if the array is emty (no ingredients) then add a hint paragraph
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please Start Adding Ingredients!</p>
        }

        
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type = 'bread-top'/> 
                {transformedIngredients}
                <BurgerIngredient type = 'bread-bottom'/>
            </div>
        )
}

export default Burger;
