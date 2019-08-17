import React, {Component} from 'react';

import Header from "../Header/Header";

class LayOut extends Component {
    render() {
        return (
            <div id="layout">
                <Header/>
                <div id="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayOut; 
