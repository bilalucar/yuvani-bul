import React from 'react';

import {auth} from '../../firebase';
import './index.css';

const SignOutButton = () =>
    <a href="" className={'nav-link'} onClick={auth.doSignOut}>
        🙄 Çıkış Yap
    </a>;

export default SignOutButton;