import React, { useRef, useCallback, useState,useEffect  } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
const reader = new FileReader();
import alarmSound from '../static/alarm_sound.mp3';
const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
       
      capture();
    }, 5000); 
    return () => clearInterval(interval);
  }, []);
  // Capture the screenshot from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    setImageSrc(imageSrc);
    sendImageToDjango(imageSrc)
  }, [webcamRef]);
  // Function to send base64 image to Django API
const sendImageToDjango = async (base64Image) => {
  try {
    
    const response = await fetch('http://localhost:8000/api/detect_drowsiness/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    let checkStatus = data && data.status ? data.status:'';
    if(checkStatus!='Awake'){    
      playAudio()
    }else{
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start      
    }
    console.log(data);  // Check the response for the drowsiness status
  } catch (error) {
    console.error('Error:', error);
  }
};
const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      alert('hiiii')
      audioRef.current.play();
      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to start
      }, 10000); // 10 seconds in milliseconds
    }
  };

  return (
    <div>
      <h2>Webcam Capture</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={700}
        height={950}
      />
      <div>
      {/* <audio ref={audioRef}>
        <source src="../static/alarm_sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
      <audio ref={audioRef} src={alarmSound} >
     
      </audio>
    </div>
    </div>
  );
};

export default WebcamCapture;
