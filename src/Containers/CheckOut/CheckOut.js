import React, { Component } from 'react';
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
// this will be the check out component where we display the burger user ordered when he click on continue button (i will show the burger itself not the summary)
class CheckOut extends Component {

    state = {

        ingredients: {},
        totalPrice: null

    }

    componentDidMount(){
        
        // parse the sent search query url and convert to it an object

        let query = new URLSearchParams(this.props.location.search)

        let ingredients ={}
        let price = null
        for(let param of query.entries() ){
            if(param[0] === 'totalPrice'){
                // i have totalPrice inside the query search url so if it is included i want to set it to the price variable not the ingredients object
                price = +param[1]
            }
            else{
                ingredients[param[0]] = +param[1]

            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})

        // to get the URLSearchParam we use this obj and pass the stored location.search query then use for of to loop over the iteratable values of the returned object and for each value (like the first time will be ['salad': 1] for instance i need to assign the prop and the value to the instantiated object ) 

    }

    purchaseCancel = () => {
        this.props.history.push({pathname: '/'})
    }

    purchaseContinue = () => {
        // i don`t want the user to retuen back to the previous (checkout summary) page so i use .replace 
        this.props.history.replace({pathname: '/checkout/contact-data'})
        
    }
    render(){
        console.log(this.state);
        
        
        return (

            <div>
                <CheckOutSummary 
                ingredients = {this.state.ingredients}
                purchaseCancel={this.purchaseCancel}
                purchaseContinue ={this.purchaseContinue}
                />


                <Route path={this.props.match.url + '/contact-data'} render={(props) => <ContactData {...props} ingredients ={this.state.ingredients} totalPrice={this.state.totalPrice}/>} />

            </div>
        );
    }
}

export default CheckOut;