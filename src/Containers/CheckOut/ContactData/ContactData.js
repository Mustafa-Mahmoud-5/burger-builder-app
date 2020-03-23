import React, { Component} from 'react';
import Button from '../../../Components/Button/Button';
import classes from './ContactData.module.css'
import axios from 'axios';
import Loader from '../../../Components/Layout/UI/Loader/Loader';
import Input from '../../../Components/Layout/UI/Input/Input';
class ContactData extends Component {

    state ={
        // this object will be transformed to be the form inputs
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                // each input should has a validation obj where we have its own rules and valid prop that changed based on the rules to wheather true or false
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
                
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 5,
                    minLength: 5

                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    at: '@' 
                },
                valid: false,
                touched: false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation : {},
                valid: true

                // setting a true valid value for the selectElement because when i loop to determine the valid prop of each element, if the select element has not, then it will be treated as undefined, and undefned returns false and can`t be assigned to true
            }
        },
        formIsValid: false,
        loading: false,
        error: false,
        errorMessage: null
    }





    checkValidity = (value, rules) => {
        // in this method here, i will excute this function for every time the user writes and i expect to get the e.target.value the user writes as the first parameter, and the rules which i sat to each element in the state as an object.. and based on these two paramaters i will update the valid proprty that each input also has in the form object state. and if the valid prop is true i will make the user pass, else i will make sum hints to the user 


        let isValid = true;

        // if we have required rule set to true, let isValid be true if the user value isn`t empty otherwise let it false
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }


        // if the value.length >= the specified min length, then return true (minLength=5 means that the inp must have 5 elements at least )
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.at) {
            isValid = value.includes('@') && value.includes('.com')
        }


        // when i validate, every time i want to check if is valid was true so i check if the previous rules also was true, and this will prevent any bugs and missconceptions so the base idea here is that the next rule to be true, the previous rule need first to be true then we start checking if its own rule is true or nor. super important.
        return isValid;

    }



    changeValueHandler = (e, inpIdentifier) => {

        // update the value of each input in an immutable way using spread operator

        // get a copy of the whole obj body
        let updatedOrderform = {...this.state.orderForm}

        // get a copy of the copied obj input obj
        let updatedElement = {...updatedOrderform[inpIdentifier]}

        // set the copied inp object value to the written value
        updatedElement.value = e.target.value;
        updatedElement.valid = this.checkValidity(e.target.value, updatedElement.validation)
        updatedElement.touched = true
        console.log(updatedElement);
        
        // update the input obj of the copied oredrForm obj with the new copied input  
        updatedOrderform[inpIdentifier] = updatedElement

        // now i want to check if all my form inputs are valid, if they aren`t i will disable the order button so i loop through all the inputs valid property 

        let formIsValid = true
        for (let input in updatedOrderform) {

            // check if the input valid property is true and also the formIsValid property in general is true so that every element will determine the value of the formIsvalid in an order way so that the formIsValid prop can`t be true if the previous element didn`t make it true so we prevent checking the last element only
            formIsValid = updatedOrderform[input].valid && formIsValid
        }
        
        // setting the state of the orderForm obj with the new updated orderForm 
        this.setState({orderForm: updatedOrderform, formIsValid: formIsValid})


        // this code might seem somehow tricky and i could just have accessed the desired property but iwanted to make sure that i update the object in an immutable way as i always do
        
    }



    orderHandler = (e) => {
        // i need to make a post http request and send the given ingredients to the firebase
        e.preventDefault();
                
        // now, with the order, i need to send the form details but only the input values so i will get the whole form obj and filter it to just be an object with the input name and its value
        let orderForm = this.state.orderForm;

        let orderData={}
        for(let input in orderForm) {
            orderData[input] = orderForm[input].value 
        }

        // show the loading till the request is done
        this.setState({loading: true})
        // store the order in firebase
        // the added order object with the post request 
        let order = {
            totalPrice: this.props.totalPrice,
            ingredients: this.props.ingredients,
            orderData: orderData
        }
        axios.post('https://burger-builder-39626.firebaseio.com/orders.json', order).then(response => {
            // when the request is done, hide the loading spinner, and for more robust validation set the error state to false
            this.setState({loading: false, error: false})

            // alert('Order sent succefully, You can review your order history from the order history nav link')

            this.props.history.replace({pathname: '/'})
        })
        .catch(error => {
            // if the request failed, we also need to hide the spinner so that the use don`t have to wait till the dawn and set the error to true and set the error message to the message we got from    .catch 
            this.setState({loading: false, error: true, errorMessage: error.message})
        })
        // excute this func once the use click on the continue button        
        
    }


    render() {

        let formInputs = Object.keys(this.state.orderForm).map(inp => {
            return <Input
            key={inp}
            changed= {(e) => this.changeValueHandler(e, inp)}
            inputtype={this.state.orderForm[inp].elementType}
            value ={this.state.orderForm[inp].value}
            touched = {this.state.orderForm[inp].touched}
            invalid = {!this.state.orderForm[inp].valid}
            shouldValidate = {this.state.orderForm[inp].validation}
            elementconfig ={this.state.orderForm[inp].elementConfig}
            />
        })

        let form = null;

        if(this.state.loading){
            form = <Loader />
        }
        else{
            form = (
                <form onSubmit = {this.orderHandler}>
                    {formInputs}
                    <Button disabled = {!this.state.formIsValid} btnType ='Success'>ORDER</Button>
                </form>
            )
        }
        // if some thing went wrong
        if(this.state.error){
        form = <h1 style={{color: 'red'}}>{this.state.errorMessage}</h1>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;