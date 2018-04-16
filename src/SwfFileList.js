import React from 'react'
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import { map, get } from 'lodash'

class SWFFile extends React.Component{
  constructor(props){
    super(props);
  }
  createSWFContent = (h, f, c) =>{
    var k = "".concat(c,'"',h,f,'">')
    console.log(k);
    return {__html: k};
  }
  render(){
    return(
      <div>
        <p>{this.props.fileName}</p>
      <div dangerouslySetInnerHTML={this.createSWFContent(this.props.url_id, this.props.fileName, this.props.objContent)} />
      </div>
    )
  }
}

const Header = () => {
  return (
    <AppBar title="SWF File viewer">
    </AppBar>
  )
}
class SwfFileList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: false
    }
  }
  showFileList(){
    var responseData = this.props.fileList;
    if(this.props.url_error){
      return(
        <p>URL not found or Network Error.</p>
      )
    }
    else if(responseData && responseData.length == 0){
      return(
        <p>No SWF Files Found </p>
      )
    }
    else if (responseData) {
      return map(responseData, d => {
        return (
          <SWFFile url_id={this.props.url_id} fileName ={d.a} objContent ={d.a1} />
        )
      })
    } else {
      return !this.state.error && <CircularProgress />
    }
  }

  render(){
    return (
      <div>
        <h1> List of SWF Files </h1>
        {this.showFileList()}
        <h5>{this.props.id}</h5>

       </div>
    )
  }
}

export default SwfFileList