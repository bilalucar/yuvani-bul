import React, {Component} from 'react';
import * as routes from "../../constants/routes";
import {withRouter} from "react-router-dom";
import * as db from "../../firebase/db";
import * as storage from "../../firebase/storage";
import * as firebase from "../../firebase/firebase";
import FileUploader from 'react-firebase-file-uploader';
import {imageReference} from "../../firebase/storage";
import {ProgressBar} from "react-bootstrap";

const AddPage = ({history}) =>
    <div>
        <AddFormPage history={history}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    name: '',
    description: '',
    category: '',
    phone: '',
    date: '',
    storagePath: '',
    uid: '',
    error: null,
    isUploading: false,
    progress: 0,
    imageUrl: '',
    image: ''
};

class AddFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            INITIAL_STATE.uid = authUser.uid
        });
    }

    onSubmit = (event) => {
        const {
            name,
            description,
            category,
            phone,
            storagePath,
            uid,
        } = this.state;

        const {
            history,
        } = this.props;

        const date = new Date().toLocaleString();

        db.doCreateAdverts(name, description, category, phone, date, storagePath, uid)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => <ProgressBar now={progress} />;
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage.ref('images').child(filename).getDownloadURL().then(url => this.setState({imageUrl: url}));
    };

    render() {
        const {
            name,
            description,
            category,
            phone,
            error,
        } = this.state;

        const isInvalid =
            category === '' ||
            phone === '' ||
            description === '' ||
            name === '';

        return (
            // TODO storage eksik
            <div className="container">
                <h2 className="form-signin-heading text-center mt-3 mb-3">Yeni İlan Ekle</h2>
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <input
                        className="form-control mb-3"
                        value={name}
                        onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
                        type="text"
                        placeholder="İlan Başlığı"
                    />
                    <textarea className="form-control mb-3"
                              value={description}
                              onChange={event => this.setState(updateByPropertyName('description', event.target.value))}
                              type="text"
                              placeholder="Açıklama" rows="5" id="comment"/>
                    <select className="form-control mb-3"
                            value={category}
                            onChange={event => this.setState(updateByPropertyName('category', event.target.value))}>
                        <option value="-1">Evcil Hayvan Türü</option>
                        <option value="kedi">Kedi</option>
                        <option value="kopek">Köpek</option>
                        <option value="kus">Kuş</option>
                        <option value="balik">Balık</option>
                        <option value="diger">Diğer</option>
                    </select>
                    <input
                        className="form-control mb-3"
                        value={phone}
                        onChange={event => this.setState(updateByPropertyName('phone', event.target.value))}
                        type="tel"
                        placeholder="Telefon Numarası"
                    />
                    <FileUploader
                        className="form-control mb-3"
                        accept="image/*"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage.ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                    />
                    <button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
                        <i className="fa fa-plus" aria-hidden="true"></i> İlan Ekle
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default withRouter(AddPage);

export {
    AddPage,
};
