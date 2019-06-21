'use strict';

const video = document.querySelector('video#gum');
const canvas1 = document.querySelector('canvas#draw');
const canvas2 = document.querySelector('canvas#filter');
const filterSelect = document.querySelector('select#filter');
const button = document.querySelector('button#photo');
canvas1.width = 640;
canvas1.height = 480;

button.onclick = function() {
    canvas1.width = video.videoWidth;
    canvas1.height = video.videoHeight;
    canvas2.width = video.videoWidth;
    canvas2.height = video.videoHeight;
    canvas2.className = filterSelect.value;
    canvas1.getContext('2d').drawImage(video, 0, 0, canvas1.width, canvas1.height);
    canvas2.getContext('2d').drawImage(video, 0, 0, canvas2.width, canvas2.height);
    
};

filterSelect.onchange = function() {
  video.className = filterSelect.value;
};

const constraints = {
    audio: false,
    video: true
};

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);