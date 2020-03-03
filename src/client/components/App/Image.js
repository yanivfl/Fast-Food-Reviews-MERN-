import React, { Component } from 'react';
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: ''
        };
    };

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        fetch('http://localhost:8080/api/get_photo')
            .then((res) => res.json())
            .then((data) => {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(data.imgs.data.data);
                this.setState({
                    imgs: base64Flag + imageStr
                })
            })
    }

    render() {
        const {imgs} = this.state;
        console.log(img);
        return (
            <img
                src={img}
                alt='Helpful alt text'/>
        )
    }
}
export default Image;