const liveStream = document.querySelector("#liveStream");

export function initCaptureImage() {
  const liveCaptureCanvas = document.querySelector("#liveCapture");
  const captureImageBtn = document.querySelector("#captureImage");
  const retakeImage = document.querySelector("#retakeImage");
  const controlBtns = document.querySelector(".control-buttons");
  const imageOk = document.querySelector("#img-okay");
  const takeSnapShotDiv = document.querySelector(".take-snapshot");
  const capturedImageImg = document.querySelector("#capturedImage");
  console.log("Live stream started");

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
    })
    .then((stream) => {
      liveStream.srcObject = stream;
    });

  liveStream.addEventListener("canplay", function () {
    liveCaptureCanvas.width = liveStream.videoWidth;
    liveCaptureCanvas.height = liveStream.videoHeight;
  });

  captureImageBtn.addEventListener("click", function () {
    const ctx = liveCaptureCanvas.getContext("2d");
    liveStream.style.display = "none";
    liveCaptureCanvas.style.display = "block";
    ctx.drawImage(liveStream, 0, 0);
    const imageDataUrl = liveCaptureCanvas.toDataURL("image/png");
    capturedImageImg.src = imageDataUrl;
    // console.log(imageDataUrl);
    controlBtns.style.display = "flex";
  });

  retakeImage.addEventListener("click", () => {
    liveStream.style.display = "block";
    liveCaptureCanvas.style.display = "none";
    controlBtns.style.display = "none";
  });

  const imgInnerDiv = document.querySelector(".img-inner");
  const newItemSection = document.querySelector(".addNewItemSection");
  imageOk.addEventListener("click", () => {
    liveCaptureCanvas.style.display = "none";
    liveStream.style.display = "block";
    imgInnerDiv.style.display = "none";
    newItemSection.style.display = "block";
    takeSnapShotDiv.style.display = "none";
  });
}
