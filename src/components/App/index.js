import React from 'react';
import {
    BrowserRouter as Router, Link,
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
import PasswordChangeForm from "../PasswordChange";
import {AdvertDetail} from "../AdvertDetail";
import CategoryPage from "../Category";

const App = () =>
    <Router>
        <div className="app">

            <div>
                <nav className="navbar navbar-expand-md fixed-top">
                    <div className="container">
                        <ul className="nav navbar-nav">
                            <a className="navbar-brand" href="/">🏠 Yuvanı Bul</a>
                            <li className="nav-item"><Link className='nav-link' to={routes.CAT}>🐈 Kedi</Link>
                            </li>
                            <li className="nav-item"><Link className='nav-link' to={routes.DOG}>🐕 Köpek</Link>
                            </li>
                            <li className="nav-item"><Link className='nav-link' to={routes.BIRD}>🦜 Kuş</Link>
                            </li>
                            <li className="nav-item"><Link className='nav-link' to={routes.MOUSE}>🐁 Kemirgen</Link>
                            </li>
                        </ul>
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
            <Route exact path={routes.PASSWORD_CHANGE} component={() => <PasswordChangeForm/>}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>
            <Route exact path={routes.ADD} component={() => <AddPage/>}/>
            <Route path="/adverts/:id" component={AdvertDetail}/>
            <Route path="/category/:id" component={CategoryPage}/>
            <footer className="footer navbar-fixed-bottom font-small blue mt-5">
                <div className="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="/"> Yuvanı Bul</a>
                </div>
            </footer>
        </div>
    </Router>


export default withAuthentication(App);