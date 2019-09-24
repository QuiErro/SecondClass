import React, {Component} from 'react'
import u184 from './../../Common/images/u184.svg'

class SignInStuItem extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const {stuItem, goToMain} = this.props;

        return (
            <div className="body_row"
                onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                onClick={()=> goToMain()}
            >
                <div className="row_column">
                    <img src={u184}/>
                    {stuItem.student_name}
                </div>
                <div className="row_column">{stuItem.student_sex}</div>
                <div className="row_column">{stuItem.student_id}</div>
                <div className="row_column">{stuItem.major_name}</div>
                <div className="row_column">{stuItem.student_phone}</div>
                <div className="row_column">{stuItem.point}</div>
                <div className="row_column">{stuItem.award}</div>
            </div>
        )
    }

    // 鼠标移入/移出单元活动  0--移入 1--移出
    _itemEnterOrLeave(e, flag){
        let parent = e.target.parentNode;
        let node;
        if(parent.classList.contains('body_row')){
            node = parent;
        }else if(parent.parentNode.classList.contains('body_row')){
            node = parent.parentNode;
        }else if(e.target.classList.contains('body_row')){
            node =  e.target;
        }else if(e.target.classList === 'items_container'){
            node =  e.target.children[0];
        }
        if(!flag && node && node.classList.contains('body_row')){
            node.classList.add('hover');
        }else if(flag && node && node.classList.contains('body_row')){
            node.classList.remove('hover');
        }
    }
}

export default SignInStuItem;