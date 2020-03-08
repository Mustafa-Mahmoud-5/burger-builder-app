import React, { Component } from 'react';
import Aux from '../../HOC/Auxi';
import Burger from '../../Components/Layout/Burger/Burger';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Modal from '../../Components/Layout/UI/Modal/Modal';
import OrderSummary from '../../Components/Layout/Burger/OrderSummary/OrderSummary';
// make a list of prices (i didn` them to the state because they will be fixed and i have no intentions to update them)
const INGREDIENTS_PRICES = {
    meat: 1.7,
    cheese: 0.5,
    salad: 0.6,
    bacon: 0.7,
}
class BurgerBuilder extends Component {
    // Managing the App State
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0,
        },
        totalPrice: 2,
        purchasable: false,
        showModal: false
    }


    purchase = (UpdatedIngredients) => {

        // this function will receive the updated ingredients in the state and then loop through the object and add all its properties values to a variable and then check if the total > 0 then the purchasable state should be updated to true so it can be later used to check if the total of the ingredients > 0 so we can enable the Oder Button otherwise disable it
        let totalIngredients = 0;
        for(let ingredient in UpdatedIngredients){

            totalIngredients += UpdatedIngredients[ingredient];

        }

        if(totalIngredients > 0){
            this.setState(()=>{
                return {
                    purchasable : true
                }
            })
        }
        else{
            this.setState(()=>{
                return {
                    purchasable : false
                }
            })

        }

    }

    AddIngredientHandler = (ingredientType) => {
        // receive ingredient type(meat or cheese or bacon or salad) so we can check which ingredient we want to deal with

        // dealing with increasing the ingredient 
        let oldCounter = this.state.ingredients[ingredientType];
        let newCounter = oldCounter + 1;
        let UpdatedIngredients = {...this.state.ingredients};
        UpdatedIngredients[ingredientType] = newCounter;

        // dealing with calculating the price
        let ingredientPrice = INGREDIENTS_PRICES[ingredientType]
        let oldPrice = this.state.totalPrice;
        let updatedTotalPrice = oldPrice + ingredientPrice;

        // updating the state
        this.setState((prevState) => {
            return {
                ingredients: UpdatedIngredients,
                totalPrice: updatedTotalPrice
            }
        })

        this.purchase(UpdatedIngredients)
    }

    RemoveIngredientHandler = (ingredientType) => {
        // receive ingredient type(meat or cheese or bacon or salad) so we can check which ingredient we want to deal with

        // remove only if the value of each ingrediant is greater than 0 (if this type has ione ngredient or more)
        if(this.state.ingredients[ingredientType] > 0){
            // decreasing the value of the ingredient 
            let oldCounter = this.state.ingredients[ingredientType];
            let newCounter = oldCounter - 1;
            let UpdatedIngredients = {...this.state.ingredients};
            UpdatedIngredients[ingredientType] = newCounter;

            // dealing with the price
            let ingredientPrice = INGREDIENTS_PRICES[ingredientType];
            let oldPrice = this.state.totalPrice;
            let newTotalPrice = oldPrice - ingredientPrice;

            // updating the state
            this.setState(()=>{
                return {
                    ingredients: UpdatedIngredients,
                    totalPrice :newTotalPrice
                }
            })

            this.purchase(UpdatedIngredients)

        }
    }

    showModalHandler = () => {
        // open the modal component when we click on it and also close the backDrop component with it

        this.setState(()=>{return {showModal: true}})
    }

    closeModalHandler = () => {
        // close the backDrop component when we click on it and also close the modal with it

        this.setState(()=> {return {showModal: false}})
    }

    continuePurchasing = () =>{
        alert('Purchase Continued')
        // excute this func once the use click on the continue button
    }

    render(){

        
        // get a copy of the ingredient and set their value to true or false so i can get each property and set the Less button to disabled based on the value of each property
        const disabledInfo = {...this.state.ingredients}
        for (let prop in disabledInfo) {
            // if the value <= 0 then that means there`s no ingredient of such type, so i need to disable the Less button
            if(disabledInfo[prop] <= 0){
                disabledInfo[prop] = true
            }
            else{
                disabledInfo[prop] = false
            }
        }
        console.log(disabledInfo)


        return (
            <Aux>
                {/* in this component i will call the Burger and the Burger Build Control and the modal that contains the user order summary*/}

                <Modal showModal = {this.state.showModal} closeModal = {this.closeModalHandler}>
                    <OrderSummary
                    totalPrice = {this.state.totalPrice} 
                    ingredients = {this.state.ingredients}
                    closeModal = {this.closeModalHandler}
                    continuePurchasing = {this.continuePurchasing}
                    />
                </Modal>
                
                <Burger ingredients = {this.state.ingredients}/>
                

                <BuildControls
                totalPrice = {this.state.totalPrice}
                purchasable = {this.state.purchasable} 
                addIngredientFunc = {this.AddIngredientHandler}
                RemoveIngredientHandler = {this.RemoveIngredientHandler}
                disabledInfo = {disabledInfo}
                showModal = {this.showModalHandler}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder