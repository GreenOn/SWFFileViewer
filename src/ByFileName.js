import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import UrlInput from './UrlInput';
class SWFFile extends React.Component{
    constructor(props){
      super(props);
    }
    createSWFContent = (f, c) =>{
      var k = "".concat(c,'"',f,'">')
      console.log(k);
      return {__html: k};
    }
    render(){
      return(
        <div>
          <p>{this.props.fileName}</p>
        <div dangerouslySetInnerHTML={this.createSWFContent(this.props.fileName, this.props.objContent)} />
        </div>
      )
    }
  }

class ByFileName extends Component {
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
    };

  render() {
    return (
      <div className="App">
        <UrlInput hintText={"Enter URL for a swf file here."} urlUpdate={this.addUrl}/>
        <h4>Example: http://ontrack-media.net/chemistry/cm3l113interactive2.swf </h4>
        <SWFFile fileName={this.state.url_id} objContent ={"<object width=\"500\" height=\"500\" data="} />
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
export default ByFileName;
