import React, {Component} from 'react';

import {auth} from '../../firebase';
import logo from "../SignIn/logo.png";

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {passwordOne} = this.state;

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (<div className="container">
                <div className="text-center">
                    <img src={logo} alt="boohoo" className="img-fluid"/>
                </div>
                <h2 className="form-signin-heading text-center mt-3 mb-3">Parola Değiştir</h2>
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <input
                        className="form-control mb-3"
                        value={passwordOne}
                        onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                        type="password"
                        placeholder="Yeni Parola"
                    />
                    <input
                        className="form-control mb-3"
                        value={passwordTwo}
                        onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Parolanızı Tekrarlayın"
                    />
                    <button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
                        Parolamı Değiştir
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default PasswordChangeForm;