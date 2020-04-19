import React, { Component } from 'react'
import classes from './Login.module.css';
import Input from '../../Components/Layout/UI/Input/Input';
import Button from '../../Components/Button/Button';

export class Login extends Component {


    state ={
        loginForm: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    at: '@'
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        fakeVal :''
    }


    checkValidity = (value, rules) => {

        // value is the e.target.value, rules are the orderForm[targetedInp].validation object that has the rules we want to apply to the specific element

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }


        if(rules.at) {
            isValid = value.includes('@') && value.includes('.com') && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= 6 && isValid
        }
        

        return isValid
        
    }


    changed = (e, inpIdentifier) => {

        // change the value as the user input

        // take a copy of the loginForm obj
        let updatedLoginForm = {...this.state.loginForm}


        // take a copy of the targeted inputType obj inside the loginForm obj
        let updatedInput = {...updatedLoginForm[inpIdentifier]}

        // update the targetedInput values
        updatedInput.value = e.target.value;
        
        updatedInput.valid  = this.checkValidity(e.target.value, updatedInput.validation)

        updatedInput.touched = true

        // most imortantly, update the targeted input obj itself as we only copied it
        updatedLoginForm[inpIdentifier] = updatedInput;

        this.setState({loginForm: updatedLoginForm});
    }
    render() {

        let form = (

            <form >
                {/* inputs */}
                {Object.keys(this.state.loginForm).map(inp => {
                    return <Input 
                    key ={inp}
                    inputtype={this.state.loginForm[inp].elementType}
                    elementconfig = {this.state.loginForm[inp].elementConfig}
                    value = {this.state.loginForm[inp].value}
                    invalid ={!this.state.loginForm[inp].valid}
                    shouldValidate={this.state.loginForm[inp].validation}
                    touched ={this.state.loginForm[inp].touched}
                    changed = {(e) => this.changed(e, inp)}
                    />
                })}


                {/* submit */}
                <Button btnType ='Success'>Log In</Button>
            </form>
        )


        return (
            <div className={classes.cont}>
                <h1>LOGIN</h1>
                {form}
            </div>
        )
    }
}

export default Login
