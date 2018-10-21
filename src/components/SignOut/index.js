import React from 'react';

import {auth} from '../../firebase';

const SignOutButton = () =>
    <a href="" onClick={auth.doSignOut}><i className="fa fa-sign-out" aria-hidden="true"></i> Çıkış Yap</a>

export default SignOutButton;
