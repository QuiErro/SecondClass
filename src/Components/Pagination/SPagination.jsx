import React, {Component} from 'react';
import { Pagination } from 'antd';

class SPagination extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="pagination">
                <Pagination
                    size="small"
                    {...this.props}
                    hideOnSinglePage
                    showQuickJumper
                />
            </div>
        );
    }
}

export default SPagination;