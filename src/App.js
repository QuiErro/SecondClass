import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as constants from "./Store/actionTypes";

import LayOut from './Components/LayOut'
import Login from './Pages/Login/Login'
import RacePub from './Pages/RacePub/RacePub'
import RaceManage from './Pages/RaceManage/RaceManage'
import ActivityPub from './Pages/ActivityPub/ActivityPub'
import ActivityManage from './Pages/ActivityManage/ActivityManage'
import Elite from './Pages/Elite/Elite'
import StuManage from './Pages/StuManage/StuManage'

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
                <Route path="/racemanage" component={RaceManage}/>
                <Route path="/activitymanage" component={ActivityManage}/>
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
        const userData = JSON.parse(sessionStorage.getItem('tempUser'));
        dispatch({
            type: constants.INIT_USER_DATA,
            userData
        });
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
