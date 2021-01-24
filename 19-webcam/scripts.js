const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getMedia() {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then((localMediaStream) => {
      // console.log(localMediaStream);
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`Ewwww, you deny the camera👩‍💻`, error);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width, height);
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = splitEffect(pixels);
    ctx.globalAlpha = 0.4;
    ctx.putImageData(pixels, 0, 0);
  }, 20);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "cool");
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="queer"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 80; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 10; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}

function splitEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i + 0]; // red
    pixels.data[i + 120] = pixels.data[i + 1]; // green
    pixels.data[i - 100] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

getMedia();

video.addEventListener("canplay", paintToCanvas);
