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
        db.get(this.props.match.params.id)((snapshot) => {
            this.setState({
                data: snapshot.val()
            });
        });
    }

    formatDate(date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + '.' + monthIndex + '.' + year;
    }

    render() {
        const data = this.state.data;
        return(
            <div className='container pt-5 pb-5 mt-5 mb-5'>
                <div className="row col-12 mb-3">
                    <h3 className='text-center'>😌 {data.name}</h3>
                </div>
                <div className="row detail">
                    <div className="col-6 text-center">
                        <img src={data.imageUrl} alt={data.name} className="img-fluid detail-img"/>
                    </div>
                    <div className="col-6">
                        <h5>📖 İlan Detayları</h5>
                        <div className="detail-meta">
                             {data.description}
                        </div>
                        <div className="detail-meta">
                            🏷️ {data.category}
                        </div>
                        <div className="detail-meta">
                            📍 {data.city}
                        </div>
                        <div className="detail-meta">
                            ♂️ {data.gender}
                        </div>
                        <div className="detail-meta">
                            🎂 {data.age}
                        </div>
                        <div className="detail-meta">
                            📅 {this.formatDate(new Date(data.date))}
                        </div>
                        <div className="detail-meta">
                            📱 {data.phone}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {AdvertDetail};