import React, {Component} from 'react';

import * as db from "../../firebase/db";

import './index.css';
import {Link} from "react-router-dom";

class PublicProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            name: '',
            phone: '',
            profilePicture: '',
            adverts: [],
            loader: true,
        };
    }

    componentWillMount() {
        this.getData(this.props.match.params.id);
    }

    async getData (id) {
        db.getProfile(id)((callback) => {
            this.setState({
                email: callback.val().email,
                username: callback.val().username,
                name: callback.val().name,
                phone: callback.val().phone,
                password: callback.val().password,
                city: callback.val().city,
                profilePicture: callback.val().profilePicture,
            });
        });

        const items = [];
        db.list((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                if (item.uid === id) {
                    items.push(item);
                }
            });
            this.setState({
                adverts: items.reverse(),
                loader: false
            });
        });
    }

    render() {
        const {
            phone,
            error,
            email,
            username,
            adverts,
            name,
            loader,
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
                <div>
                    <div className="container profile">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="text-center">
                                    <h1>{username}</h1>
                                    <img src={this.state.profilePicture ? this.state.profilePicture : 'https://firebasestorage.googleapis.com/v0/b/yuvani-bul.appspot.com/o/cat.jpg?alt=media&token=a3fd7dd8-209f-45cb-abfe-57addcb3f04f'}
                                         className="avatar img-circle img-thumbnail" alt="avatar"/>
                                </div>
                                <br/>

                                <ul className="list-group">
                                    <li className="list-group-item text-muted">Profil Detayları <i className="fa fa-dashboard fa-1x"></i>
                                    </li>
                                    { name ? <li className="list-group-item text-right profile-info"><span
                                        className="pull-left"><strong>Ad</strong></span>
                                        <span title={name}>{name}</span>
                                    </li> : <div></div> }
                                    <li className="list-group-item text-right profile-info"><span
                                        className="pull-left"><strong>Mail</strong></span>
                                        <span title={email}>{email}</span>
                                    </li>
                                    { phone ? <li className="list-group-item text-right profile-info"><span
                                        className="pull-left"><strong>Telefon</strong></span>
                                        <span title={phone}>{phone}</span>
                                    </li> : <div></div> }
                                    <li className="list-group-item text-right profile-info"><span
                                        className="pull-left"><strong>İlan Sayısı</strong></span>
                                        <span title={adverts.length}>{adverts.length}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-9">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home">
                                        <h3>Aktif İlanlar</h3>
                                        <div className="row">
                                            {adverts.map((adverts, key) =>
                                                <div className="col-lg-4 col-md-4 col-sm-6 portfolio-item" key={key.toString()}>
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
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default PublicProfilePage;