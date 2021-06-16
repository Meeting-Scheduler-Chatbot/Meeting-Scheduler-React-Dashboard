import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import Login from './containers/auth/login'
import SignUp from './containers/auth/signup'
import NotFoundPage from './components/NotFoundPage/notFoundPage'
import Home from './containers/Home/home'
import Drawer from "./components/Drawer/drawer"

import List from "./components/Lists/List/index.js"
import Lists from "./components/Lists/index.js"

import Parent from "./components/Parent/index.js"
import Profile from "./components/Profile/index.js"

import GroupListCard from "./components/GroupList/GroupListCard/groupListCard"
import GroupList from "./components/GroupList/groupList"

import MyGroupsPage from "./containers/MyGroupsPage/MyGroupsPage"

import NarrowGroupList from "./components/NarrowGroupList/narrowGroupList"

import AddGroupMemberPage from "./containers/AddGroupMemberPage/addGroupMemberPage"

import SeeAndAddMembers from "./components/SeeAndAddMembers/seeAndAddMembers"

import SettingsPage from "./containers/Settings/settings"


// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import './App.css';


const data = [{"name":"Gökberk","surname":"Yar"},{"name":"Kaya","surname":"Kapagan"},]
const App = () => (
  <>
    <React.Fragment>
      <CssBaseline />

      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/' >
            <Drawer content= {<Home  />}/>
          </Route > */}

          <Route path='/signup' component={SignUp}/>
          
          <Route path='/login' component={Login}/>
          <Route path='/drawer' component={Drawer} />

          <Route path='/page-not-found' component={NotFoundPage} />
          <Route path='/parent' component={Parent} />
          <Route path='/profile' >
            <Profile redirectPath="/login" content={ <List/>} />
          </Route>
          <Route path='/list'  >

          <List name="Gokberk" surname="Yar"/>
          </Route>
          <Route path='/lists'  >
          <Lists data={data}/>
          </Route>

          <Route path='/my-groups' >
            <Profile redirectPath="/login" content={ <Drawer content= {<MyGroupsPage />}/> } />
          </Route>

          <Route path='/add-member' >
            <Profile redirectPath="/login" content={ <Drawer content= {<AddGroupMemberPage />}/> } />
          </Route>

          <Route path='/settings' >
            <Profile redirectPath="/login" content={ <Drawer content= {<SettingsPage />}/> } />
          </Route>

          {/* <Route exact path='/my-groups' >
            <Drawer content= {<MyGroupsPage />}/>
          </Route > */}
          
          {/* <Route path='/my-groups' component={MyGroupsPage} /> */}
          
          {/* TRIALS START */}
          <Route path='/see-add-mem' component={SeeAndAddMembers}/>
          <Route path='/narrow-group' component={NarrowGroupList}/>
          <Route path='/card' component={GroupListCard} />
          <Route path='/card-list' component={GroupList} />

          {/* TRIALS ENDS */}

          
          <Route component={NotFoundPage} />

        </Switch>
      </Router>
    </React.Fragment>
  </>
);

export default App;
