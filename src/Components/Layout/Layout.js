import React, { Component } from 'react';
import Aux from '../../HOC/Auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/Toolbar/SideDrawer/SideDrawer';
    // in this component i will call the toolbar and the sideDrawer and the BurgerBuilder and iwill make this component a stateful component because i want to set a state that is could get seen by the toolbar and the side drawer componenets

class Layout extends Component  {

    state = {
        showSideDrawer: false
    }

    // close the drawer and its backdrop
    closeDrawer = () =>{
        this.setState(()=>{
            return{
                showSideDrawer: false
            }
        })
    }

    openDrawer = ()=>{
        this.setState(()=>{
            return{
                showSideDrawer: true
            }
        })
    }
    // close the sideDrawer if the user scrolled so he can`t get a conflict seeing the both toolbars if he is resizing the window
    componentDidMount(){
        window.addEventListener('resize', ()=>{
            this.setState(()=>{
                return{
                    showSideDrawer:false
                }
            })
        })
    }

    render(){
        return (

            <Aux>
    
                <Toolbar openSideDrawer={this.openDrawer}/>
    
                <SideDrawer 
                showDrawer = {this.state.showSideDrawer}
                close = {this.closeDrawer}
                />
    
                <main className = {classes.Content}>
                    {/* Burger Builder  or orders or check out component using routing */}
                    {this.props.children}
                </main>
            </Aux>
        )
    
    }

}

export default Layout;