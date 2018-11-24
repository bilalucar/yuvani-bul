import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () =>
    <div>
        <PasswordForgetForm/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {email} = this.state;

        auth.doPasswordReset(email)
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
            email,
            error,
        } = this.state;

        const isInvalid = email === '';

        return (
            <div className="container p-5 mt-5">
                <div className="text-center">
                    <img src="/images/knees.png" width="240" height="240" alt="logo" className="img-fluid"/>
                </div>
                <h2 className="form-signin-heading text-center mt-3 mb-3">Parolanızı Sıfırlayın</h2>
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <input
                        className="form-control mb-3"
                        value={this.state.email}
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="text"
                        placeholder="Email Adres"
                    />
                    <button className="btn btn-button btn-block" disabled={isInvalid} type="submit">
                        😭 Parolanızı Sıfırlayın
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () =>
    <p className="text-center">
        <Link to={routes.PASSWORD_FORGET}>😔 Parolanızı mı unuttunuz?</Link>
    </p>

export default PasswordForgetPage;

export {
    PasswordForgetForm,
    PasswordForgetLink,
};
