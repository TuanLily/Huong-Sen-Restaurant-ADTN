import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import './uploadImage.css'

const ImageUploadComponent = ({ id }) => {
    const [pictures, setPictures] = useState([]);

    const onDrop = (pictureFiles, pictureDataURLs) => {
        setPictures(pictures.concat(pictureDataURLs));
    };

    return (
        <ImageUploader
            withIcon={true}
            buttonText='Chọn ảnh'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
            fileContainerStyle={{ backgroundColor: '#f8f9fa' }}  // Áp dụng style tùy chỉnh trực tiếp
            id={id}
        />
    );
};

export default ImageUploadComponent;
