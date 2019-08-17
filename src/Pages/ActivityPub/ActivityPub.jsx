import React, {Component} from 'react'
import {connect} from 'react-redux'

class ActivityPub extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="activity_pub"></div>
        )
    }
}

export default connect(null, null)(ActivityPub);