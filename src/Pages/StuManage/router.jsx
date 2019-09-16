import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

import StuManage from './StuManage'
import StuMain from './StuMain'
import StuEnclosure from './StuEnclosure'

class StuManageRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/stumanage/list" component={StuManage}/>
                <Route path="/stumanage/main" component={StuMain}/>
                <Route path="/stumanage/enclosure" component={StuEnclosure}/>
                <Redirect exact form="/stumanage" to="/stumanage/list"/>
            </Switch>
        );
    }
}

export default StuManageRouter;