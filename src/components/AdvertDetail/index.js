import {Component} from "react";
import React from "react";
import * as db from "../../firebase/db";
import logo from "../SignIn/logo.png";

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
                    <div className="col-6">
                        <img src={data.imageUrl} className="img-fluid"/>
                    </div>
                    <div className="col-6">
                        <p>{data.description}</p>
                        <p><b>Pet Türü:</b> {data.category}</p>
                        <p><b>İlan Tarihi:</b> {data.date}</p>
                        <p><b>İletişim:</b> {data.phone}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export {AdvertDetail};