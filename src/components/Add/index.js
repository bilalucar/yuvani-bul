import React, {Component} from 'react';
import * as db from "../../firebase/db";
import * as firebase from "../../firebase/firebase";
import FileUploader from 'react-firebase-file-uploader';
import {ProgressBar} from "react-bootstrap";
import {writeAdvertsId} from "../../firebase/db";
import withAuthorization from "../Session/withAuthorization";
import {getUser} from "../../firebase/auth";
import * as routes from "../../constants/routes";

const AddPage = ({history}) =>
    <div>
        <AddFormPage history={history}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

class AddFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            category: '',
            phone: '',
            date: '',
            imageUrl: '',
            uid: '',
            error: null,
            isUploading: false,
            progress: 0,
            image: '',
            id: '0'
        }
    }

    componentDidMount() {
        this.setState({uid: getUser().uid});
    }

    onSubmit = (event) => {
        const {
            name,
            description,
            category,
            phone,
            imageUrl,
            uid,
            id
        } = this.state;

        const {
            history,
        } = this.props;

        const date = new Date().toLocaleString();

        db.create(name, description, category, phone, date, imageUrl, uid, id)
            .then((data) => {
                this.setState(() => (this.state));
                writeAdvertsId(data.key);
                history.push(routes.LANDING);
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => <ProgressBar now={progress}/>;
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };
    handleUploadSuccess = (filename) => {
        this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage.ref('images').child(filename).getDownloadURL().then(url => {
                this.setState({imageUrl: url});
            }
        );
    };

    render() {
        const {
            name,
            description,
            category,
            phone,
            error,
            progress
        } = this.state;

        const isInvalid =
            category === '' ||
            phone === '' ||
            description === '' ||
            name === '' ||
            progress !== 100;

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
                    />
                    <button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
                        <i className="fa fa-plus" aria-hidden="true"/> İlan Ekle
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddPage);