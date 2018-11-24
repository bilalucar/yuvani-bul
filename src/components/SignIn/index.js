import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';

import './index.css';

const SignInPage = ({history}) =>
    <div>
        <SignInForm history={history}/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.ACCOUNT);
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="container p-5 mt-5">
                <div className="text-center">
                    <img src="/images/seatting.png" width="240" height="240" alt="logo" className="img-fluid"/>
                </div>
                <h2 className="form-signin-heading text-center mt-3 mb-3">Giriş Yap</h2>
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <input
                        className="form-control mb-3"
                        value={email}
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="email"
                        placeholder="Email Adres"
                    />
                    <input
                        className="form-control mb-3"
                        value={password}
                        onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                        type="password"
                        placeholder="Parola"
                    />
                    <button className="btn btn-button btn-block" disabled={isInvalid} type="submit">
                        😊 Giriş Yap
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};
