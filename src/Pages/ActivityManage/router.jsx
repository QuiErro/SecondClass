import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

import ActivityEdit from './ActivityEdit'
import ActivityMain from './ActivityMain'
import ActivityManage from './ActivityManage'

class ActivityManageRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/activitymanage/list" component={ActivityManage}/>
                <Route path="/activitymanage/edit" component={ActivityEdit}/>
                <Route path="/activitymanage/main" component={ActivityMain}/>
                <Redirect exact form="/activitymanage" to="/activitymanage/list"/>
            </Switch>
        );
    }
}

export default ActivityManageRouter;