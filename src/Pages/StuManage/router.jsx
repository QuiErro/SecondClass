import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

import StuManage from './StuManage'

class StuManageRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/stumanage/list" component={StuManage}/>
                <Redirect exact form="/stumanage" to="/stumanage/list"/>
            </Switch>
        );
    }
}

export default StuManageRouter;