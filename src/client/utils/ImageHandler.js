import Resizer from "react-image-file-resizer";

export function fileChangedHandler(file, callback) {

    var fileInput = false;
    if (file) {
        fileInput = true;
    }
    if (fileInput) {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            uri => {
                callback(dataURLtoFile(uri, 'cropped_avatar'));
            },
            'base64'
        );
    }
}

export function multipleFileChangedHandler(files, callback, compressed_files = []) {
    console.log(files);
    const file = files[0];
    if (file) {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            uri => {
                compressed_files.push(dataURLtoFile(uri, `cropped_${file.name}`));
                multipleFileChangedHandler(files.slice(1, files.length), callback, compressed_files);
            },
            'base64'
        );
    } else {
        callback(compressed_files);
    }
}

export function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}

export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

export function arrayBufferToUrl(buffer) {
    var base64Flag = 'data:image/jpeg;base64,';
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    var imageStr = window.btoa(binary);
    return (base64Flag + imageStr);
}

export function getImgSrc(buffer) {
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = this.arrayBufferToBase64(buffer);
    return base64Flag + imageStr

}




