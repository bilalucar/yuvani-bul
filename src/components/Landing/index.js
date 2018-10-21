import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { db } from '../../firebase';

class LandingPage extends Component {
    constructor() {
        super();

        this.state = {
            adverts: []
        };
    }

    componentWillMount() {
        db.getAdverts((snapshot) => {
            this.setState(prevState => ({
                adverts: [ snapshot.val(), ...prevState.adverts ],
            }));
        });
    }

    render() {
        const {
            adverts
        } = this.state;

        return (
            <div>
                <div>
                    <br/><br/>
                    <div className="container">

                        <h1 className="my-4">Son Eklenen İlanlar</h1>

                        <div className="row">
                            {adverts.map((adverts, key) =>
                            <div className="col-lg-4 col-md-4 col-sm-6 portfolio-item">
                                <div className="card h-100">
                                    <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            <a href="#">{adverts.name}</a>
                                        </h4>
                                        <p className="card-text">{adverts.description}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;

