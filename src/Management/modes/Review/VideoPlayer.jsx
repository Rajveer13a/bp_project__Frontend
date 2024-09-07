import React, { useState, useRef } from 'react';

const VideoPlayer = ({ baseUrl }) => {


  const [videoUrl, setVideoUrl] = useState(baseUrl);

  const videoRef = useRef(null);

  
  function generateTransformedUrl(width, height) {
    const [prefix, suffix] = baseUrl.split("/upload/");
    return `${prefix}/upload/w_${width},h_${height}/${suffix}`;
  }

  const handleResolutionChange = (width, height) => {

    const transformedUrl = generateTransformedUrl(width, height);

    setVideoUrl(transformedUrl);
  };

  

    

  return (

      <video ref={videoRef} controls controlsList='nodownload' width="50%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
   
  );
};

export default VideoPlayer;
