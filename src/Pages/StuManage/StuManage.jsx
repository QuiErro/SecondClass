import React, {Component} from 'react'
import {connect} from 'react-redux'

class StuManage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="stu_manage"></div>
        )
    }
}

export default connect(null, null)(StuManage);