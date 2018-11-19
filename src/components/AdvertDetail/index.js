import {Component} from "react";
import React from "react";
import * as db from "../../firebase/db";
import './index.css';

class AdvertDetail extends Component {

    constructor() {
        super();

        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        db.get(this.props.match.params.id)((snapshot) => {
            this.setState({
                data: snapshot.val()
            });
        });
    }

    render() {
        const data = this.state.data;
        return(
            <div className='container pt-5 pb-5 mt-5 mb-5'>
                <div className="row col-12 mb-3">
                    <h1 className='text-center'>{data.name}</h1>
                </div>
                <div className="row">
                    <div className="col-6 text-center">
                        <img src={data.imageUrl} alt={data.name} className="img-fluid detail-img"/>
                    </div>
                    <div className="col-6">
                        <h4>Açıklama</h4>
                        <hr/>
                        <p>{data.description}</p>
                        <p><b>Pet Türü:</b> {data.category}</p>
                        <p><b>Şehir:</b> {data.city}</p>
                        <p><b>Cinsiyet:</b> {data.gender}</p>
                        <p><b>İlan Tarihi:</b> {data.date}</p>
                        <p><b>İletişim:</b> {data.phone}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export {AdvertDetail};