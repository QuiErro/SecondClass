import React, {Component} from 'react'
import {connect} from 'react-redux'

class RaceManage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="race_manage"></div>
        )
    }
}

export default connect(null, null)(RaceManage);