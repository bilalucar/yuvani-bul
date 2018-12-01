import React, {Component} from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../Session/withAuthorization';
import * as db from "../../firebase/db";

import './index.css';
import {Link} from "react-router-dom";

const AccountPage = ({history}, { authUser }) =>
    <div>
        <AccountDetailPage history={history} auth={authUser}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

class AccountDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            cities: [],
            city: '',
            adverts: [],
            loader: true
        }
    }

    componentWillMount() {
        this.getData(this.props.auth.uid);
    }

    async getData (id) {
        db.getProfile(id)((callback) => {
            this.setState({
                email: callback.val().email,
                username: callback.val().username,
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
                adverts: items,
                loader: false
            });
        });

        const sehir = [];
        db.getCities((callback) => {
            callback.forEach((city) => {
                const item = city.val();
                item.key = city.key;
                sehir.push(item);
            });
            this.setState({
                cities: sehir.map((item) => {
                    return item
                })
            })
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
            email,
            username,
            adverts,
            city,
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
                <div>
                    <div className="container profile">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="text-center">
                                    <h1>{username}</h1>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/yuvani-bul.appspot.com/o/cat.jpg?alt=media&token=a3fd7dd8-209f-45cb-abfe-57addcb3f04f"
                                         className="avatar img-circle img-thumbnail" alt="avatar"/>
                                    <h6>Farklı bir fotoğraf yükle...</h6>
                                    <input type="file" className="text-center center-block file-upload"/>
                                </div>
                                <br/>

                                <ul className="list-group">
                                    <li className="list-group-item text-muted">Profil Detayları <i className="fa fa-dashboard fa-1x"></i>
                                    </li>
                                    <li className="list-group-item text-right"><span
                                        className="pull-left"><strong>İlan Sayısı</strong></span> 125
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-9">
                                <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#home">İlanlar</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#messages">Profili Güncelle</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home">
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
                                                            <p className="card-text">{this.formatDate(new Date(adverts.date))} </p>
                                                            <p className="card-text">{adverts.category} - {adverts.city}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="messages">
                                        <div className="col-lg-12 text-right">
                                            <span>Sadece güncellemek istediğiniz alanları doldurun!</span>
                                        </div>
                                        <form className="form" action="#" method="post" id="registrationForm">
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="first_name"><h4>📛 Ad - Soyad</h4></label>
                                                    <input type="text" className="form-control"
                                                           placeholder="adınızı ve soyadınızı girin" title="adınızı girin"/>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="last_name"><h4>🆔 Kullanıcı Adı</h4></label>
                                                    <input type="text" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                                                           placeholder={username} title="kullanıcı adınızı girin"/>
                                                </div>
                                            </div>

                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="phone"><h4>📱 Telefon</h4></label>
                                                    <input type="text" className="form-control"
                                                           placeholder="telefon numaranızı girin" title="telefon numaranızı girin"/>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="email"><h4>📧 Email</h4></label>
                                                    <input type="email" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                                                           value={email} title="enter your email."/>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="email"><h4>📍 Şehir</h4></label>
                                                    <select className="form-control mb-3"
                                                            value={city}
                                                            onChange={event => this.setState(updateByPropertyName('city', event.target.value))}>
                                                        <option value="-1">Şehir</option>
                                                        {
                                                            this.state.cities.map(city => <option key={city.id}>{city.name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="password"><h4>🗝️ Parola</h4></label>
                                                    <input type="password" className="form-control"
                                                           placeholder="parolanızı girin." title="enter your password."/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-xs-12 text-right">
                                                    <button className="btn btn-lg" type="reset"><i
                                                        className="glyphicon glyphicon-repeat"></i> Sıfırla
                                                    </button>
                                                    <button className="btn btn-lg btn-success" type="submit"><i
                                                        className="glyphicon glyphicon-ok-sign"></i> Kaydet
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
        )
    }
}

AccountPage.contextTypes = {
    authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);