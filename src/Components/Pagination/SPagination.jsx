import React, {Component} from 'react';
import { Pagination } from 'antd';

class SPagination extends Component {
    
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