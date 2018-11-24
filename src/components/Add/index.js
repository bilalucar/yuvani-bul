import React, {Component} from 'react';
import * as db from "../../firebase/db";
import * as firebase from "../../firebase/firebase";
import FileUploader from 'react-firebase-file-uploader';
import {ProgressBar} from "react-bootstrap";
import {writeAdvertsId} from "../../firebase/db";
import withAuthorization from "../Session/withAuthorization";
import {getUser} from "../../firebase/auth";

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
            gender: '',
            city: '',
            cities: [],
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

    componentWillMount() {
        this.setState({
            uid: getUser().uid
        });
        this.getCities();
    }

    async getCities () {
        const items = [];
        db.getCities((callback) => {
            callback.forEach((city) => {
                const item = city.val();
                item.key = city.key;
                items.push(item);
            });
            this.setState({
                cities: items.map((item) => {
                    return item
                })
            })
        });
    }

    onSubmit = (event) => {
        const {
            name,
            description,
            category,
            city,
            gender,
            phone,
            imageUrl,
            uid,
            id
        } = this.state;

        const date = new Date().getDate();

        db.create(name, description, category, phone, date, imageUrl, uid, id, gender, city)
            .then((data) => {
                this.setState(() => (this.state));
                writeAdvertsId(data.key);
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
            gender,
            city,
            error,
            progress
        } = this.state;

        const isInvalid =
            category === '' ||
            phone === '' ||
            description === '' ||
            name === '' ||
            gender === '' ||
            city === '' ||
            progress !== 100;

        return (
            <div className="container">
                <h3 className="mt-3 mb-3">Yeni Sahiplendirme İlanı</h3>

                <form className="form-add" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-4">
                            <input
                                className="form-control mb-3"
                                value={name}
                                onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
                                type="text"
                                placeholder="İlan Başlığı"
                            />

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
                            <select className="form-control mb-3"
                                    value={gender}
                                    onChange={event => this.setState(updateByPropertyName('gender', event.target.value))}>
                                <option value="-1">Cinsiyet</option>
                                <option value="Erkek">Erkek</option>
                                <option value="Dişi">Dişi</option>
                            </select>
                            <select className="form-control mb-3"
                                    value={city}
                                    onChange={event => this.setState(updateByPropertyName('city', event.target.value))}>
                                <option value="-1">Şehir</option>
                                {
                                    this.state.cities.map(city => <option key={city.id}>{city.name}</option>)
                                }
                            </select>
                            <input
                                className="form-control mb-3"
                                value={phone}
                                onChange={event => this.setState(updateByPropertyName('phone', event.target.value))}
                                type="tel"
                                placeholder="Telefon Numarası"
                            />
                        </div>
                        <div className="col-7 offset-1">
                            <label>Açıklama</label>
                            <textarea className="form-control mb-3"
                                      value={description}
                                      onChange={event => this.setState(updateByPropertyName('description', event.target.value))}
                                      type="text"
                                      placeholder="Evcil hayvanımla ilgili bilinmesi gerekenler..." rows="8" id="comment"/>
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
                            <div className="text-right">
                                <button className="btn btn-button" disabled={isInvalid} type="submit">
                                    👉️ İlan Ekle
                                </button>
                                {error && <p>{error.message}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddPage);