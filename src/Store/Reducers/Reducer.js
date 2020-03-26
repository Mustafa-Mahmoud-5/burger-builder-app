// import our actions

import * as Actions from '../Actions/Actions';


// the ingredients price 
const INGREDIENTS_PRICES = {
    meat: 1.7,
    cheese: 0.5,
    salad: 0.6,
    bacon: 0.7,
}


// our global state
const intitalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0,
    },
    totalPrice: 2
}

// intialize the reducer

const reducer = (state = intitalState, action) => {
    switch (action.type){
        // get the ingredients immutablly then update specific ingredient based on the passed actoin.ingrdientType by adding it with 1
        case Actions.ADD_INGREDIENT:
            let updatedIngredients = {...state.ingredients}
            updatedIngredients[action.ingType] = state.ingredients[action.ingType] +1

            // deal with the price after adding ingredient
            let oldPrice = state.totalPrice;
            let newPrice = oldPrice + INGREDIENTS_PRICES[action.ingType]

            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice
            } 

        case Actions.REMOVE_INGREDIENT:
            let updatedIngredientss = {...state.ingredients}
            updatedIngredientss[action.ingType] = state.ingredients[action.ingType] - 1

            // dealing with the price after removing ingredient
            let prevPrice = state.totalPrice;
            let nextPrice = prevPrice - INGREDIENTS_PRICES[action.ingType]
            return {
                ...state,
                ingredients: updatedIngredientss,
                totalPrice: nextPrice
            }

        default:
            return state
    }
}

export default reducer
