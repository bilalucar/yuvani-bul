import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';
import AddPage from "../Add";

const App = () =>
    <Router>
        <div className="app">

            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">Yuvanı Bul</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <Navigation/>
                    </div>
                </nav>
            </div>
            <Route exact path={routes.LANDING} component={() => <LandingPage/>}/>
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>
            <Route exact path={routes.ADD} component={() => <AddPage/>}/>
        </div>
    </Router>

export default withAuthentication(App);