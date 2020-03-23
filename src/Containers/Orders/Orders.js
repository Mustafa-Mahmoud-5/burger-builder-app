import React, { Component } from 'react'
import Order from '../../Components/Order/Order';
import axios from 'axios';
import Loader from '../../Components/Layout/UI/Loader/Loader';
class Orders extends Component {

    // this component will be concerned with the order history , as it saved at the firebase so i will fetch the data and manipulate it to render Order component based on stored data
    state = {
        loading: true,
        error: false,
        errorMessage: null,
        orders: []
    }

    componentDidMount() {

        this.setState({loading: true})
        axios.get('https://burger-builder-39626.firebaseio.com/orders.json').then(response =>{
            console.log(response.data);
            this.setState({loading: false, error: false})

            // the returned data from firebase is object of objects so i want to turn them to array of objects and add extra id to be used as the key so i need to use the spread operator to extract the real data and addd new data to them
            let fetchedOrders = Object.keys(response.data).map(order =>{
                return {...response.data[order], id: order}
            })
            console.log(fetchedOrders);
            

            this.setState({orders: fetchedOrders})            
        })
        .catch(error =>{
            this.setState({loading: false, error: true, errorMessage: error.message})
        })
    }

    render() {

        

        let order = null;



            if(this.state.loading){
                order = <Loader />  
            }
            else{
                order = <div>

                        <h1 style={{textAlign: 'center', margin: '20px 0'}}>Your Orders History</h1>
    
                        {this.state.orders.map(order => {
                            return <Order ingredients = {order.ingredients} totalPrice = {+order.totalPrice} key={order.id}/>
                        })}
                </div>
            }
    
            if(this.state.error) {
            order = <h1 style ={{color: 'red', textAlign: 'center'}}>No Orders Yet Or network Issue</h1>
            }
    

        

        return (
           <div>
               {order}
           </div>
        )
    }
}

export default Orders
