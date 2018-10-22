import React from 'react';

import {auth} from '../../firebase';
import {Link} from "react-router-dom";

const SignOutButton = () =>
    <a href="" className='nav-link' onClick={auth.doSignOut}><i className="fa fa-sign-out" aria-hidden="true"></i> Çıkış Yap</a>

export default SignOutButton;
