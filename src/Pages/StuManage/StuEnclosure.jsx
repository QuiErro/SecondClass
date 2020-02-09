import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Select } from 'antd'
import cover01 from './../../Common/images/cover01.png'

const { Option } = Select;

class StuEnclosure extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            term: '201801', // 学期
        }
    }

    render() {
        const {term} = this.state;

        return (
            <div id="stu_enclosure">
                <div id="en_select">
                    <Select
                      style={{ width: 200 }}
                      value={term}
                      onChange={(val)=> this._onSelectChange(val)}
                    >
                        <Option value="201801">2018年第一学期</Option>
                        <Option value="201802">2018年第二学期</Option>
                    </Select>  
                </div>
                <div id="en_container">
                    <div className="en_item">
                        <img src={cover01} alt=""/>
                        <div>
                            <p>数计学院心理情景剧</p>
                            <p>一等奖</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(!this.props.location.state || !this.props.location.state.id){
            this.props.history.goBack();
        }
    }

    // 1. 选择学期
    _onSelectChange(term){
        this.setState({
            term
        })
    }
}

export default connect(null, null)(StuEnclosure);