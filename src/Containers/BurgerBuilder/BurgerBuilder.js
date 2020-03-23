import React, { Component } from 'react';
import Aux from '../../HOC/Auxi';
import Burger from '../../Components/Layout/Burger/Burger';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Modal from '../../Components/Layout/UI/Modal/Modal';
import OrderSummary from '../../Components/Layout/Burger/OrderSummary/OrderSummary';
import axios from 'axios';
import Loader from '../../Components/Layout/UI/Loader/Loader';
// make a list of prices (i didn` add them to the state because they will be fixed and i have no intentions to update them)
const INGREDIENTS_PRICES = {
    meat: 1.7,
    cheese: 0.5,
    salad: 0.6,
    bacon: 0.7,
}
class BurgerBuilder extends Component {
    // Managing the App State
    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        showModal: false,
        loading: false,
        error: false,
        errorMessage: null,
        getError: false,
        getErrorMessage: null
    }

    // get the ingredients data from firebase 
    componentDidMount() {

        axios.get('https://burger-builder-39626.firebaseio.com/ingredients.json').then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({getError:true, getErrorMessage: error.message})
        })
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


        // i need to pass the ingredients object to the query param(this.props.history.search) as an string of 

        let ingredients = {...this.state.ingredients}

        // i get a copy of ingredients` body then change it to array and map it to another array of the form of (element1=value1&element2=value2&..)
        let passesIngs = Object.keys(ingredients).map(ing => {
            return `${ing}=${ingredients[ing]}`
        })

        passesIngs.push(`totalPrice=${this.state.totalPrice}`)
        let query = passesIngs.join('&')

        this.props.history.push({search: `?${query}`, pathname: '/checkout'});
        
       

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


        let orderSummary = null;

        let burger = <Loader/>;

        // when i make a request it takes time, and i use the ingredients object in the ui with many different components so i will get error cuz it is set to null initially, theni will just start doing things when it is not null
        if(this.state.ingredients) {

            
            burger = (
                <Aux>

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



            // showing order summary dynamically 
            if(this.state.loading) {
                orderSummary = <Loader />
            }
            else{
                orderSummary = <OrderSummary
                totalPrice = {this.state.totalPrice} 
                ingredients = {this.state.ingredients}
                closeModal = {this.closeModalHandler}
                continuePurchasing = {this.continuePurchasing}
                />
            }
            // this check is must so i can check if the error is true then dispaly error message i got from .catch in axios so it over ride the previous orderSummary settings
            if(this.state.error) {
            orderSummary = <h2 style={{color: 'red'}}>{this.state.errorMessage}</h2>
            }

        }

        // Handling the get error

        if(this.state.getError){
            burger = <h1 style ={{color: 'red', textAlign: 'center'}}>{this.state.getErrorMessage}</h1>
        }

        return (
            <Aux>
                {/* in this component i will call the Burger and the Burger Build Control and the modal that contains the user order summary*/}

                {/* when we update some components(buildControls for instance as it changes some state)  state manager component will re renders so its children component will get re rendered, so that`s mean that if we update other components, Modal component and order Summary component (bec it is its child) will get re rendered, so we can use shouldComponentUpdate LifeCycle hook for updating them only when they really update*/}

                <Modal showModal = {this.state.showModal} closeModal = {this.closeModalHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        )
    }
}

export default BurgerBuilder