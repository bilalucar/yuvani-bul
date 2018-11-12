import React from 'react';

import {auth} from '../../firebase';

const SignOutButton = () =>
    <a className={'nav-link'} onClick={auth.doSignOut}>
        <i className="fa fa-sign-out" aria-hidden="true"/> Çıkış Yap
    </a>;

export default SignOutButton;