import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import {db} from '../../firebase';

import './index.css';

class CategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adverts: [],
            icon: '',
            loader: true
        };
    }

    componentDidMount() {
        this.getData(this.props.match.params.id);
        this.setIcon(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getData(nextProps.match.params.id);
        this.setIcon(nextProps.match.params.id);
    }

    formatDate(date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + '.' + monthIndex + '.' + year;
    }

    setIcon (id) {
        if (id === "kedi"){
            this.setState({
                icon: '🐈'
            })
        } else  if (id === "kopek") {
            this.setState({
                icon: '🐕'
            })
        } else  if (id === "kus") {
            this.setState({
                icon: '🦜'
            })
        } else {
            this.setState({
                icon: '🐁'
            })
        }
    }

    async getData(propsId) {
        const items = [];
        db.getCategory((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                if (item.category === propsId) {
                    items.push(item);
                }
            });
            this.setState({
                adverts: items.reverse(),
                loader: false
            })
        });
    }

    render() {
        const {
            adverts,
            icon,
            loader
        } = this.state;

        return (
            loader ?
                <div className="loader-container">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
                :
            adverts.length ?
            <div>
                    <div className="container mb-5">
                        <h3 className="my-4">Son Eklenen {icon} İlanları</h3>

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
                                            <p className="card-text">{this.formatDate(new Date(adverts.date))} </p>
                                            <p className="card-text">{adverts.category} - {adverts.city}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
            </div>
                :
                <div className="container">
                    <div className="text-center">
                        <h4 className="pt-3">☹️ Bu kategoride hiç ilan bulunamadı!</h4>
                        <img src="/images/sad-cat.png" className="img-fluid mt-3" alt="sad-cat"/>
                    </div>
                </div>
    );
    }
    }

    export default CategoryPage;

