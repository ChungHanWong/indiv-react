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
import Carousel from './containers/Carousel'


class App extends React.Component {
  

  render() {
  
    return (
      <>
      <Jumbotron/>
      <Navbar/>
      <h1>Welcome to Artsy Fartsy</h1>
      <Carousel/>
      <Switch>
        <Route exact path="/Submit" component={Submit} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Gallery" component={Gallery} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/Profile" component={Profile} />
      </Switch>
      </>
    )
  }
}

export default App;
