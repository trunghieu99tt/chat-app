import { useState } from 'react';
import firebase from '../../firebase'
// import uuidv4 from "uuid/v4";



const useFirebase = () => {

    const [fileUrl, setFileUrl] = useState<any>(null);



    const getFileBlob = function (url: string, cb: Function) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function () {
            cb(xhr.response);
        });
        xhr.send();
    };

    const uploadToStorage = (imageURL: any) => {
        getFileBlob(imageURL, (blob: Blob) => {
            firebase.storage().ref('audio').put(blob).then(async (snapshot) => {
                const url = await snapshot.ref.getDownloadURL();
                setFileUrl(url);
            })
        })
    }

    return {
        fileUrl,
        setFileUrl,
        uploadToStorage
    }

}

export { useFirebase };