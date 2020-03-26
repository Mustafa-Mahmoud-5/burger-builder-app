import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/CheckOut';
import Orders from './Containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';
class App extends Component {

  render(){

    return (
  
      <Layout>
        <Switch>
            <Route path ='/' exact component ={BurgerBuilder}/>
            <Route path ='/checkout'  component ={CheckOut} />
            <Route path = '/orders' exact component ={Orders} />
            <Route render ={() => <h1 style={{color: 'red', textAlign: 'center'}}>Page Not Found</h1>} />
        </Switch>
        </Layout>
 
    );
  
  }
}

export default App;
