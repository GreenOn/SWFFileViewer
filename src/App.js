import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import UrlInput from './UrlInput';
import SwfFileList from './SwfFileList';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      url_id: '',
      fileList: null,
      url_error: false
    };
  }
  addUrl = (urlInfo) => {
    this.setState({ 
      url_id: urlInfo
    })
    axios({
      method:'get',
      headers: {
        'Access-Control-Allow-Origin': '*'
     },
      url: urlInfo,
      responseType:'stream'
    })
      .then(this.successAjaxHandler)
      .catch(this.handleError)
  }
  handleError= (err)=>{
    this.setState({
      fileList: null,
      url_error: true
    });
    console.log(err);
  }
  successAjaxHandler =(res) => {
    console.log("Ajax req is success.");
    console.log(res.data);
    var str = res.data;
    var regex = /href\s*=\s*" *.*.swf"/g;
    var found = str.match(regex);
    var fileList = [];
    if(found){
      found.map( a => {
        a =a.replace(/ /g,'');
        a = a.replace('href=','');
        var a1 = "".concat("<object width=\"500\" height=\"500\" data=");
        a =a.replace(/"/g,'');
        fileList.push({a,a1});
      });
    }
    console.log(fileList);
    if (fileList === undefined || fileList.length == 0) return;
    console.log(this);
    this.setState({
      fileList: fileList,
      url_error: false
    });
    return(fileList);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <UrlInput urlUpdate={this.addUrl}/>
        <SwfFileList url_id={this.state.url_id} url_error={this.state.url_error}fileList= {this.state.fileList}/>
        <Footer/>
      </div>
    );
  }
}
const Footer = () =>{
  return(
    <p>A quick app by friends at https://www.Dynos.io</p>
  )
}
export default App;
