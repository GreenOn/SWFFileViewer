import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem,makeSelectable} from 'material-ui/List';
import { Link } from 'react-router-dom'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentInfo from 'material-ui/svg-icons/action/info';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import PlayList from 'material-ui/svg-icons/av/playlist-play';

import axios from 'axios';


let SelectableList = makeSelectable(List);

class Display extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selectedIndex: 0
        };
    }
    handleToggle = () => this.setState({open: !this.state.open});
    
    handleRequestChange (event, index) {
        console.log("Selected index is: ",index);
    this.setState({
        selectedIndex: index
    })
    }
    componentDidMount() {
        console.log("I am in display.");
        console.log(this.props);
    }
    render () {
        return (
            <div>
                <AppBar
                    title='SWF Viewer'
                    onClick={this.handleToggle}
                    style={{backgroundColor: '#052334'}}
                />
                <Drawer 
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                      <h1> SWF Viewer...</h1>
                    <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
                        <ListItem 
                            value={0}
                            primaryText = {<Link to="/ByURL"> View multiple swf files </Link>}
                            leftIcon={<PlayList />} />
                        <ListItem
                            primaryText = {<Link to="/ByFileName"> View a single swf file </Link>}
                            value={1}
                            leftIcon={<PlayArrow />}
                            initiallyOpen={false}
                            />
                    </SelectableList>
                </Drawer>
            </div>
        )
    }
}
export default Display