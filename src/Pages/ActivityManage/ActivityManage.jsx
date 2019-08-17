import React, {Component} from 'react'
import {connect} from 'react-redux'

class ActivityManage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="activity_manage"></div>
        )
    }
}

export default connect(null, null)(ActivityManage);