// const video = document.getElementById('video')
const video = document.querySelector("#videoElement");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const captureButton = document.querySelector("#captureButton");
const capturedImage = document.querySelector("#capturedImage");
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startWebcam)

function startWebcam() {
  if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (mediaStream) {
          stream = mediaStream;
          video.srcObject = stream;
      })
      .catch(function (error) {
          console.log("Something went wrong!");
      });
  } else {
      console.log("getUserMedia not supported");
  }
}

function stopWebcam() {
  if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
  }
}

function captureImage() {
  if (video.srcObject) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      capturedImage.src = canvas.toDataURL('image/png');
      imageCaptured = true;
      updateCaptureButton();
      detectFaces();
  }
}
function updateCaptureButton() {
  if (imageCaptured) {
      captureButton.textContent = "Re-capture Image";
  } else {
      captureButton.textContent = "Capture Image";
  }
}

startButton.addEventListener("click", startWebcam);
stopButton.addEventListener("click", stopWebcam);
captureButton.addEventListener("click", function() {
  captureImage();
  imageCaptured = true;
  updateCaptureButton();
});

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})