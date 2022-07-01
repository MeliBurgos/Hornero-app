import { useEffect, useState } from "react";

const CamTest = () => {

  const video = document.querySelector('video')
  const canvas = document.querySelector('canvas')
  let list 
  let devicesArr = []

  navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia);


useEffect(() => {
      list = document.querySelector('select')
    navigator.mediaDevices.enumerateDevices()
    .then(resp => {
      devicesArr = []
      resp.forEach((device) =>
        device.kind === "videoinput" ? devicesArr.push(device) : ""
      );
    })
    .then(() =>
      devicesArr.length > 0 ?
        devicesArr.forEach(dispositivo => {
          const option = document.createElement('option');
          option.value = dispositivo.deviceId;
          option.text = dispositivo.label;
          list.appendChild(option);
        }) : "")

}, [])



const [selectedDevice, setSelectedDevice] = useState(devicesArr[0])


navigator.getMedia(
  // Restricciones (contraints) *Requerido
  {
    video: { deviceId: selectedDevice },
    audio: false
  },
  // Funcion de finalizacion (Succes-Callback) *Requerido
  function (localMediaStream) {
    ;
    var video = document.querySelector('video')
    video.srcObject = localMediaStream;
    video.play()
  },
  // errorCallback *Opcional
  function (err) {
    console.log("Ocurrió el siguiente error: " + err);
  }
)

function handlePhoto() {
  //Pausar reproducción
  video.pause();
  //Obtener contexto del canvas y dibujar sobre él
  let contexto = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
  let foto = canvas.toDataURL(); //Esta es la foto, en base 64
  let enlace = document.createElement('a'); // Crear un <a>
  enlace.download = "profile-photo.png";
  enlace.href = foto;
  enlace.click();
  //Reanudar reproducción
  video.play();
};

return (
  <>
    <h1>Prueba Video</h1>
    <select onChange={(e) => setSelectedDevice(e.target.value)}>
    </select>
    <video muted="muted" id="video" style={{ width: "100%", height: "auto" }}></video>
    <canvas id="canvas" style={{ display: "none" }}></canvas>
    <button onClick={() => handlePhoto()}  >Photo</button>
  </>
)


}

export default CamTest