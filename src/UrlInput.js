import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class UrlInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'http:\\'
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleSubmit = (e) => {
    this.props.urlUpdate(this.state.value);
  }


  render() {  
    return (
      <div>
        <TextField
          id="text-field-controlled"
          hintText="Enter url here."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <FlatButton label="Submit" primary={true} onClick={this.handleSubmit}/>

      </div>
    );
  }
}

export default UrlInput