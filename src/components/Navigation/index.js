import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

import './index.css';

const Navigation = (props, {authUser}) =>
    <div>
        {authUser
            ? <NavigationAuth/>
            : <NavigationNonAuth/>
        }
    </div>

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = () =>
    <ul className="nav navbar-nav navbar-right">
        <li className="nav-item"><Link to={routes.LANDING}><i className="fa fa-home"
                                                              aria-hidden="true"></i> Anasayfa</Link></li>
        <li className="nav-item"><Link to={routes.ADD}><i className="fa fa-plus" aria-hidden="true"></i> İlan Ekle</Link></li>
        <li className="nav-item"><Link to={routes.ACCOUNT}><i className="fa fa-user" aria-hidden="true"></i> Hesap</Link></li>
        <li className="nav-item"><SignOutButton/></li>
    </ul>

const NavigationNonAuth = () =>
    <ul className="nav navbar-nav navbar-right">
        <li className="nav-item"><Link to={routes.LANDING}><i className="fa fa-home"
                                                              aria-hidden="true"></i> Anasayfa</Link></li>
        <li className="nav-item"><Link to={routes.SIGN_IN}><i className="fa fa-sign-in" aria-hidden="true"></i> Giriş
            Yap</Link></li>
    </ul>

export default Navigation;
