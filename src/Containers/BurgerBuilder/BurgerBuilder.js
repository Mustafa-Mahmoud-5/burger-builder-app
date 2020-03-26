import React, { Component } from 'react';
import Aux from '../../HOC/Auxi';
import Burger from '../../Components/Layout/Burger/Burger';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Modal from '../../Components/Layout/UI/Modal/Modal';
import OrderSummary from '../../Components/Layout/Burger/OrderSummary/OrderSummary';
import axios from 'axios';
import Loader from '../../Components/Layout/UI/Loader/Loader';
import * as Actions from '../../Store/Actions/Actions';
import { connect } from 'react-redux'
class BurgerBuilder extends Component {
    // Managing the App State
    state = {
        showModal: false,
        loading: false,
        error: false,
        errorMessage: null,
        getError: false,
        getErrorMessage: null
    }

    // get the ingredients data from firebase 
    componentDidMount() {

    //     axios.get('https://burger-builder-39626.firebaseio.com/ingredients.json').then(response => {
    //         this.setState({ingredients: response.data})
    //     }).catch(error => {
    //         this.setState({getError:true, getErrorMessage: error.message})
    //     })
    }

    purchase = (UpdatedIngredients) => {

        // receive the ingredients from the reducer state then check if the ingredients total is greater than 0, then excute a func and pass it to the buildcontrols to check the result and disable the button if the total isn`t greater than 0 

        let totalIngredients = 0;
        for(let ingredient in UpdatedIngredients){

            totalIngredients += UpdatedIngredients[ingredient];

        }

        if(totalIngredients > 0){
                return  true;
        }
        else {
            return false;
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
        // navigate to the checkout component
        this.props.history.push({pathname: '/checkout'});
    }

    render(){

        // get a copy of the ingredient and set their value to true or false so i can get each property and set the Less button to disabled based on the value of each property
        const disabledInfo = {...this.props.ingredients}
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
        if(this.props.ingredients) {

            
            burger = (
                <Aux>

                    <Burger ingredients = {this.props.ingredients}/>

                    <BuildControls
                    totalPrice = {this.props.totalPrice}
                    purchasable = {this.purchase(this.props.ingredients)} 
                    addIngredientFunc = {this.props.AddIngredientHandler}
                    RemoveIngredientHandler = {this.props.RemoveIngredientHandler}
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
                totalPrice = {this.props.totalPrice} 
                ingredients = {this.props.ingredients}
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

// get the state from the store as props
const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice

    }
}

// make a functions that able to send dispatches to the reducer as props
const mapDispatchesToProps = dispatch => {

    return {
        AddIngredientHandler: (ingType) => dispatch({type: Actions.ADD_INGREDIENT, ingType: ingType}),
        RemoveIngredientHandler: (ingType) => dispatch({type: Actions.REMOVE_INGREDIENT, ingType: ingType})
    }
}



export default connect(mapStateToProps,mapDispatchesToProps)(BurgerBuilder)