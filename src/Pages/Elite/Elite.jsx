import React, {Component} from 'react'
import {connect} from 'react-redux'

class Elite extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="elite"></div>
        )
    }
}

export default connect(null, null)(Elite);