import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ErorrPage extends Component {
    render() {
        {/* style 驼峰式 */}
        return (
            <div className="container-fluid"
                 style={{
                     marginTop: 200,
                     textAlign: "center"
                 }}
            >
                <Link to="/">
                    <h3 className="text-primary"
                        style={{
                            fontSize: 30
                        }}
                    >
                        哎呀，迷路了，点我返回首页！
                    </h3>
                </Link>
            </div>
        );
    }
}

export default ErorrPage;