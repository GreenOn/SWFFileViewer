import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import UrlInput from './UrlInput';
import SwfFileList from './SwfFileList';
import axios from 'axios';
import ByURL from './ByURL';
import ByFileName from './ByFileName';
import { Switch, Route } from 'react-router-dom'
import MyNav from './MyNav';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      url_id: '',
      fileList: null,
      url_error: false
    };
  }
  render() {
    return (
      <div className="App">
      <MyNav/>
      <Switch>
      <Route path="/ByURL" render={(props)=> (
        <ByURL {...this.state} {...props}/>
        )}/>
      <Route path="/ByFileName" render={(props)=> (
        <ByFileName {...this.state} {...props}/>
        )}/>
      </Switch>
      <Footer/>
      </div>
    );
  }

}
const Footer = () =>{
  return(
    <div>
    <h4>An app by friends at <a href="https://www.Dynos.io">Dynos.io</a></h4>
    </div>
  )
}
export default App;
