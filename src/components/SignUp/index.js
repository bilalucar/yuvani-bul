import React, {Component} from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import {auth, db} from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({history}) =>
    <div>
        <SignUpForm history={history}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your own accessible Firebase Database too
                db.createUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState(() => ({...INITIAL_STATE}));
                        history.push(routes.ACCOUNT);
                    })
                    .catch(error => {
                        this.setState(updateByPropertyName('error', error));
                    });

            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            username === '' ||
            email === '';

        return (
            <div className="container p-5 mt-5">
                <div className="text-center">
                    <img src="/images/bath.png" width="240" height="240" alt="logo" className="img-fluid"/>
                </div>
                <h2 className="form-signin-heading text-center mt-3 mb-3">KAYIT OL</h2>

                <form className="form-signin" onSubmit={this.onSubmit}>
                    <input
                        className="form-control mb-3"
                        value={username}
                        onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                        type="text"
                        placeholder="Kullanıcı Adı"
                    />
                    <input
                        className="form-control mb-3"
                        value={email}
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="text"
                        placeholder="Email Adres"
                    />
                    <input
                        className="form-control mb-3"
                        value={passwordOne}
                        onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                        type="password"
                        placeholder="Parola"
                    />
                    <input
                        className="form-control mb-3"
                        value={passwordTwo}
                        onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Parolanızı Doğrulayın"
                    />
                    <button className="btn btn-button btn-block" disabled={isInvalid} type="submit">
                        🥰 Kayıt Ol
                    </button>

                    {error && <p>{error.message}</p>}
                </form>

            </div>
        );
    }
}

const SignUpLink = () =>
    <p className="text-center">
        Hesabın yok mu?
        {' '}
        <Link to={routes.SIGN_UP}> 🙏 Kayıt Ol</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};