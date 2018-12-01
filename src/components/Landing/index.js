import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import {db} from '../../firebase';

import './index.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adverts: [],
            loader: true
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData () {
        const items = [];
        db.list((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                items.push(item);
            });
            this.setState({
                adverts: items.reverse(),
                loader: false
            });
        });
    }

    render() {
        const {
            adverts,
            loader
        } = this.state;

        return (
            loader ? <div className="loader-container">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
                :
                <div>
                    <div className="container mb-5">
                        <h3 className="my-4">Son Eklenen İlanlar 🐈</h3>

                        <div className="row">
                            {adverts.map((adverts,key) =>
                                <div className="col-lg-3 col-md-3 col-sm-4 portfolio-item" key={key}>
                                    <div className="card h-100">
                                        <Link to={'/adverts/' + adverts.id} >
                                            <img className="card-img-top" src={adverts.imageUrl}
                                                 alt=""/></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link to={'/adverts/' + adverts.id} >{adverts.name}</Link>
                                            </h5>
                                            <p className="card-text">{adverts.date} </p>
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

