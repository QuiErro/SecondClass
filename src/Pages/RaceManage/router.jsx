import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

import RaceEdit from './RaceEdit'
import RaceMain from './RaceMain'
import RaceManage from './RaceManage'

class RaceManageRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/racemanage/list" component={RaceManage}/>
                <Route path="/racemanage/edit" component={RaceEdit}/>
                <Route path="/racemanage/main" component={RaceMain}/>
                <Redirect exact form="/racemanage" to="/racemanage/list"/>
            </Switch>
        );
    }
}

export default RaceManageRouter;