import React, {Component} from 'react'
import { Checkbox } from 'antd'

class ClassroomItem extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { click, item, flagCount, index, checked, checkedChange } = this.props;

        return (
            <div 
                className="con_item"
                onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                onClick={()=> click(item.id, item.title)}
            >
                <div className="item_num">{flagCount + index + 1}</div>
                    <div className="item_check">
                        <Checkbox
                            checked={checked === (index + 1) ? true : false}
                            onClick={(e)=> checkedChange(e, index, item)}
                        ></Checkbox>
                        </div>
                        <div className="item_img">
                            <img src={item.image || ''} alt=""/>
                        </div>
                        <div className="item_name">
                            {item.title}
                        </div>
                        <div className="item_people">{item.signUp}人</div>
                        <div className="item_time">{item.signUp_end_format}</div>
                        <div className="item_address">{item.position}</div>
                        <div className="item_pub">{item.status === 0 ? '已发布' : '未发布'}</div>
            </div>
        )
    }

    // 鼠标移入/移出单元活动  0--移入 1--移出
    _itemEnterOrLeave = (e, flag) => {
        let parent = e.target.parentNode;
        let node;
        if(parent.classList.contains('con_item')){
            node = parent;
        }else if(parent.parentNode.classList.contains('con_item')){
            node = parent.parentNode;
        }else if(e.target.classList.contains('con_item')){
            node =  e.target;
        }else if(e.target.classList === 'items_container'){
            node =  e.target.children[0];
        }
        if(!flag && node && node.classList.contains('con_item')){
            node.classList.add('hover');
        }else if(flag && node && node.classList.contains('con_item')){
            node.classList.remove('hover');
        }
    }
}

export default ClassroomItem;