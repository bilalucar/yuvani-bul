import React from 'react';

class AdvertDetail extends React.Component {
    state = {
        id: null
    };
    componentDidMount () {
        const { id } = this.props.match.params;
        console.log(this.props.match.params);
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default AdvertDetail;