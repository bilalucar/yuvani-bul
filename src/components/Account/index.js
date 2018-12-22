import React, {Component} from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../Session/withAuthorization';
import * as db from "../../firebase/db";

import './index.css';
import {Link} from "react-router-dom";
import {auth} from '../../firebase';
import * as firebase from "../../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";

const AccountPage = ({history}, { authUser }) =>
    <div>
        <AccountDetailPage history={history} auth={authUser}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class AccountDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            username: '',
            name: '',
            phone: '',
            passwordOne: '',
            passwordTwo: '',
            error: '',
            city: '',
            profilePicture: '',
            cities: [],
            adverts: [],
            profileUpdate: false,
            loader: true,
            isUploading: false,
            progress: 0
        };

        this.deleteAdverts = this.deleteAdverts.bind(this);
    }

    componentWillMount() {
        this.setState({user: this.props.auth});
        this.getData(this.props.auth.uid);
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

    async deleteAdverts(id) {
        db.deleteAdvert(id);
        this.getData(this.props.auth.uid);
    }

    updateProfile () {
        db.updateProfile(this.state.user.uid, this.state);
        this.setState({profileUpdate: true});
    }

    onSubmit = ((event) => {
        this.updateProfile();
        event.preventDefault();
    });

    passwordUpdate = ((event) => {
        const {passwordOne} = this.state;

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                auth.doSignOut();
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    });

    handleUploadStart = () => this.setState({isUploading: true, progress: 1});
    handleProgress = (progress) => this.setState({progress: progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };
    handleUploadSuccess = (filename) => {
        this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage.ref('profilePicture/').child(filename).getDownloadURL().then(url => {
                this.setState({profilePicture: url});
                this.updateProfile();
            }
        );
    };

    render() {
        const {
            phone,
            passwordOne,
            passwordTwo,
            error,
            email,
            username,
            adverts,
            city,
            name,
            loader
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

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
                                    <FileUploader
                                        className="custom-file-input"
                                        accept="image/*"
                                        name="image"
                                        type="file" className="form-control-file"
                                        filename={this.state.user.uid}
                                        storageRef={firebase.storage.ref('profilePicture/')}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                </div>
                                <br/>

                                <ul className="list-group">
                                    <li className="list-group-item text-muted">Profil Detayları <i className="fa fa-dashboard fa-1x"></i>
                                    </li>
                                    <li className="list-group-item text-right"><span
                                        className="pull-left"><strong>İlan Sayısı</strong></span> {adverts.length}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-9">
                                <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#home">İlanlar</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#account">Profili Güncelle</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#password">Parola Güncelle</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home">
                                        <h3>Aktif İlanlarınız</h3>
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
                                                        <div className="card-footer text-right">
                                                            <a href="javascript:;" onClick={() => window.confirm("İlanı silmek istediğinize emin misiniz?") &&
                                                                this.deleteAdverts(adverts.id)}>
                                                                <i className="fa fa-trash"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="account">
                                        <div className="col-lg-12 text-right">
                                            <span>Sadece güncellemek istediğiniz alanları doldurun!</span>
                                        </div>
                                        { this.state.profileUpdate ? <div className="alert alert-success" role="alert">Profiliniz başarılı bir şekilde güncellendi!</div> : <div></div> }
                                        <form className="form" onSubmit={this.onSubmit}>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="first_name"><h4>📛 Ad - Soyad</h4></label>
                                                    <input type="text" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
                                                           placeholder="Lütfen adınızı ve soyadınızı girin" value={name}/>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="last_name"><h4>🆔 Kullanıcı Adı (Değiştirilemez)</h4></label>
                                                    <input type="text" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                                                           value={username} disabled/>
                                                </div>
                                            </div>

                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="phone"><h4>📱 Telefon</h4></label>
                                                    <input type="text" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('phone', event.target.value))}
                                                           value={phone}  placeholder="Lütfen telefon numaranızı girin"/>
                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-xs-6">
                                                    <label htmlFor="email"><h4>📧 Email</h4></label>
                                                    <input type="email" className="form-control"
                                                           onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                                                           value={email} placeholder="Lütfen email adresinizi girin"/>
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

                                    <div className="tab-pane" id="password">
                                        <form className="form" onSubmit={this.passwordUpdate}>
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
                                            <button className="btn btn-button btn-block" disabled={isInvalid} type="submit">
                                                😜 Parolamı Değiştir
                                            </button>

                                            {error && <p>{error.message}</p>}
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