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
    </div>;

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = () =>
    <ul className="nav navbar-nav navbar-right">
        <li className="nav-item"><Link className='nav-link' to={routes.ADD}>✍️ İlan Ekle</Link>
        </li>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                😎 Hesap
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className='dropdown-item' to={routes.ACCOUNT}>Profil</Link>
                <Link className='dropdown-item' to={routes.PASSWORD_CHANGE}>Parola Güncelle</Link>
            </div>
        </li>
        <li className="nav-item"><SignOutButton/></li>
    </ul>;

const NavigationNonAuth = () =>
    <ul className="nav navbar-nav navbar-right">
        <li className="nav-item"><Link className='nav-link' to={routes.SIGN_IN}>😊 Giriş
            Yap</Link></li>
    </ul>;

export default Navigation;
