import React from 'react';
import './App.css';
import { Route,Switch } from 'react-router-dom'
import Submit from './containers/submit'
import Jumbotron from './components/Jumbotron'
import SignUp from './containers/SignUp'
import Login from './containers/Login'
import Gallery from './containers/Gallery'
import Detail from './containers/Detail'
import Navbar from './containers/Navbar'
import Profile from './pages/Profile'
import OtherProfiles from './pages/OtherProfiles'
import Homepage from './pages/Homepage'
import Braintree from './pages/btnew'
import Purchase from './pages/Purchase'
import Experiment from './containers/experiment'


class App extends React.Component {
  

  render() {
  
    return (
      <>
      <Jumbotron/>
      <Navbar/>
      

      <Switch>
        <Route exact path="/" render={() => (<Homepage />)} />	 
        <Route exact path="/Submit" component={Submit} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Gallery" component={Gallery} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/OtherProfiles/:id" component={OtherProfiles} />
        <Route exact path="/Braintree" component={Braintree} />
        <Route exact path="/Purchase" component={Purchase} />
        <Route exact path="/experiment" component={Experiment} />
      </Switch>
      </>
    )
  }
}

export default App;
