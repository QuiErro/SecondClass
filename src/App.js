import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as constants from "./Store/actionTypes";

import LayOut from './Components/LayOut'
import Login from './Pages/Login/Login'
import RacePub from './Pages/RacePub/RacePub'
import ActivityPub from './Pages/ActivityPub/ActivityPub'
import Elite from './Pages/Elite/Elite'
import StuManage from './Pages/StuManage/StuManage'

import RaceManageRouter from './Pages/RaceManage/router'
import ActivityManageRouter from './Pages/ActivityManage/router'

import { message } from 'antd'

message.config({
  top: 150,
});

class App extends Component {

  componentWillMount() {
    this.props.reqLocalData();
  }

  render(){
	// 主面板
    let LayOutRouter = (
        <LayOut>
            <Switch>
                <Route path="/publishrace" component={RacePub}/>
                <Route path="/publishactivity" component={ActivityPub}/>
                <Route path="/racemanage" component={RaceManageRouter}/>
                <Route path="/activitymanage" component={ActivityManageRouter}/>
                <Route path="/elite" component={Elite}/>
                <Route path="/stumanage" component={StuManage}/>
                <Redirect to="/publishrace" />
            </Switch>
        </LayOut>
    );
		
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route
            path="/"
            render={
              this.props.userData ?
                (props)=> LayOutRouter :
                ()=> <Redirect to="/login"  push/>
            }
          />
        </Switch>
      </Router>
    ) 
  }
}

const mapStateToProps = (state)=>{
  return {
      userData: state.userData
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      reqLocalData(){
        const userData = JSON.parse(window.sessionStorage.getItem('tempUser'));
        dispatch({
            type: constants.INIT_USER_DATA,
            userData
        });
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
