import React, { Component } from 'react';
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux'
// this will be the check out component where we display the burger user ordered when he click on continue button (i will show the burger itself not the summary)
class CheckOut extends Component {

    componentDidMount(){
        // parse the sent search query url and convert to it an object
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
                ingredients = {this.props.ingredients}
                purchaseCancel={this.purchaseCancel}
                purchaseContinue ={this.purchaseContinue}
                />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}


export default connect(mapStateToProps)(CheckOut);