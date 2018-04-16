import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import UrlInput from './UrlInput';
import SwfFileList from './SwfFileList';

class ByURL extends Component {
  constructor(props){
    super(props);
    this.state = {
      url_id: '',
      fileList: null,
      url_error: false
    };
  }
  getURLInfo = (url) => {
      var self = this;
      this.doCORSRequest({
        method: 'GET',
        url: url,
        data: null
      }, function printResult(result) {
        self.successAjaxHandler(result);
    });
     
    };
    doCORSRequest =(options, printResult)=> {
        var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function() {
          printResult(
            options.method + ' ' + options.url + '\n' +
            x.status + ' ' + x.statusText + '\n\n' +
            (x.responseText || '')
          );
        };
        if (/^POST/i.test(options.method)) {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          }
          x.send(options.data);
      }
   
  addUrl = (urlInfo) => {
    this.setState({ 
      url_id: urlInfo
    })
    console.log("urlInfo is");
    console.log(urlInfo);
    this.getURLInfo(urlInfo);
     };
  handleError= (err)=>{
    this.setState({
      fileList: null,
      url_error: true
    });
    console.log(err);
  }
  successAjaxHandler =(res) => {
    console.log("Ajax req is success.");
    console.log(res);
    var str = res;
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
        <UrlInput hintText={"URL for a html file here."} urlUpdate={this.addUrl}/>
        <h4>Example: http://pages.uoregon.edu/tgreenbo/ </h4>
        <SwfFileList url_id={this.state.url_id} url_error={this.state.url_error}fileList= {this.state.fileList}/>
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
export default ByURL;
