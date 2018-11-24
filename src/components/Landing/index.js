import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import {db} from '../../firebase';

import './index.css';

class LandingPage extends Component {
    constructor() {
        super();

        this.state = {
            adverts: []
        };
    }

    componentWillMount() {
        db.list((snapshot) => {
            this.setState(prevState => ({
                adverts: [snapshot.val(), ...prevState.adverts],
            }));
        });
    }

    formatDate(date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + '.' + monthIndex + '.' + year;
    }

    render() {
        const {
            adverts
        } = this.state;

        return (
            <div>
                    <div className="container mb-5">
                        <h3 className="my-4">Son Eklenen İlanlar 🐈</h3>

                        <div className="row">
                            {adverts.map((adverts) =>
                                <div className="col-lg-3 col-md-3 col-sm-4 portfolio-item">
                                    <div className="card h-100">
                                        <Link to={'/adverts/' + adverts.id} >
                                            <img className="card-img-top" src={adverts.imageUrl}
                                                         alt=""/></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link to={'/adverts/' + adverts.id} >{adverts.name}</Link>
                                            </h5>
                                            <p className="card-text">{this.formatDate(new Date(adverts.date))} </p>
                                            <p className="card-text">{adverts.category} - {adverts.city}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
            </div>
    );
    }
    }

    export default LandingPage;

