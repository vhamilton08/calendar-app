import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth'
import Home from './components/Home'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/auth' component={Auth}/>
    </Switch>
)