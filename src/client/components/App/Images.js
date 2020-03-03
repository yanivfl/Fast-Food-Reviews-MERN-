import React, { Component } from 'react';
class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: []
        };
    };

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        fetch('http://localhost:8080/api/get_photos')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log(data.imgs);
                var base64Flag = 'data:image/jpeg;base64,';
                var imgs = data.imgs.map( img=>base64Flag + this.arrayBufferToBase64(img.data.data) );
                this.setState({
                    imgs: imgs
                })
            })
    }

    render() {
        const {imgs} = this.state;
        console.log(imgs);
        const rendered_imgs = imgs.map((img, index)=>
                 <img
                     key={index}
                    src={img}
                    alt='Helpful alt text'
                 />
                    );
        return (
            <div>
                {rendered_imgs}
            </div>
        );
    }
}
export default Images;