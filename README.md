#Face Detection using face-api.js

This project demonstrates how to implement face detection in a web application using HTML, JavaScript, and the face-api.js library. The application captures an image feed from the user's webcam and performs real-time facial recognition, detecting and displaying facial landmarks and expressions.

##Features
Webcam Integration: Captures live video feed from the user's webcam.
Real-Time Face Detection: Utilizes face-api.js to detect faces in the video feed.
Facial Landmarks: Identifies key facial landmarks (e.g., eyes, nose, mouth).
Expression Recognition: Recognizes and displays different facial expressions (e.g., happy, sad, surprised).
##Technologies Used
HTML5: Structure of the web page.
CSS3: Styling of the web page.
JavaScript: Core logic for capturing video and processing face detection.
face-api.js: JavaScript API for face detection, face landmarks, and face recognition.
##Usage
Access the Application: Open the index.html file in a web browser. Ensure that your browser has access to the webcam.

Start Webcam: The application will prompt you to allow access to your webcam. Grant the necessary permissions.

Face Detection: Once the webcam is active, the application will start detecting faces in real-time. Detected faces, along with their landmarks and expressions, will be highlighted on the video feed.
# IMPORTANT: Bug Fixes

## `navigator.getUserMedia`

`navigator.getUserMedia` is now deprecated and is replaced by `navigator.mediaDevices.getUserMedia`. To fix this bug replace all versions of `navigator.getUserMedia` with `navigator.mediaDevices.getUserMedia`

## Low-end Devices Bug

The video eventListener for `play` fires up too early on low-end machines, before the video is fully loaded, which causes errors to pop up from the Face API and terminates the script (tested on Debian [Firefox] and Windows [Chrome, Firefox]). Replaced by `playing` event, which fires up when the media has enough data to start playing.
