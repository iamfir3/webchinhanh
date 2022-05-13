var img = new Image();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fileName = "";
let cropper;
let funcValue={
  bright:100,
  contrast:100,
  gray:0,
  blur:0,
  hue:0,
  saturate:100,
  invert:0
}
let croppedBtn= document.querySelector('.cropCanvas');
let croppedCanvas=null;
$(document).ready(function() {
        $(".brightSlider").on("input", function(e) {
            let bright =document.querySelector(".brightSlider");
            funcValue.bright=bright.value;
            let value=bright.value;
            let brightValue=document.querySelector('.brightValue');
            brightValue.textContent=value;
            render(funcValue,img);
          });
        $(".contrastSlider").on("input", function(e) {
            let contrast =document.querySelector(".contrastSlider");
            funcValue.contrast=contrast.value;
            let value=contrast.value;
            let contrastValue=document.querySelector('.contrastValue');
            contrastValue.textContent=value;
            render(funcValue,img);
          });
        $(".graySlider").on("input", function(e) {
            let gray =document.querySelector(".graySlider");
            funcValue.gray=gray.value;
            let value=gray.value;
            let grayValue=document.querySelector('.grayValue');
            grayValue.textContent=value;
            render(funcValue,img);
          });
        $(".blurSlider").on("input", function(e) {
            let blur =document.querySelector(".blurSlider");
            funcValue.blur=blur.value;
            let value=blur.value;
            let blurValue=document.querySelector('.blurValue');
            blurValue.textContent=value;
            render(funcValue,img);
          });
        $(".hueSlider").on("input", function(e) {
            let hue =document.querySelector(".hueSlider");
            funcValue.hue=hue.value;
            let value=hue.value;
            let hueValue=document.querySelector('.hueValue');
            hueValue.textContent=value;
            render(funcValue,img);
          });
        $(".saturateSlider").on("input", function(e) {
            let saturate =document.querySelector(".saturateSlider");
            funcValue.saturate=saturate.value;
            let value=saturate.value;
            let saturateValue=document.querySelector('.saturateValue');
            saturateValue.textContent=value;
            render(funcValue,img);
          });
        $(".invertSlider").on("input", function(e) {
            let invert =document.querySelector(".invertSlider");
            funcValue.invert=invert.value;
            let value=invert.value;
            let invertValue=document.querySelector('.invertValue');
            invertValue.textContent=value;
            render(funcValue,img);
          });
let crop=document.querySelector("#crop");
crop.onclick = (e)=>{
  cropper = new Cropper(canvas,{
  
  });
  croppedBtn.classList.remove("disable");
}

croppedBtn.onclick = (e)=>{
  croppedCanvas=cropper.getCroppedCanvas();
  canvas=croppedCanvas;
  alert("Đã cắt xong!");
}

  $(".download").on("click", function(e) {
    var fileExtension = fileName.slice(-4);
    if (fileExtension == ".jpg" || fileExtension == ".png") {
      var actualName = fileName.substring(0, fileName.length - 4);
    }
    download(canvas, actualName + "-edited.jpg");
  });

  $(".upload").on("change", function() {
    var file = document.querySelector(".upload").files[0];
    var reader = new FileReader();

    if (file) {
      fileName = file.name;
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      "load",
      function() {
        img = new Image();
        img.src = reader.result;
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          $("#canvas").removeAttr("data-caman-id");
        };
      },
      false
    );
    let homeContainer=document.querySelector(".home-container");
    homeContainer.classList.add("disable");
    let processContainer=document.querySelector(".process");
    processContainer.classList.remove("disable");
  });
});

function download(canvas, filename) {
  var e;
  var lnk = document.createElement("a");

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/jpeg", 0.8);

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}

function render(funcV,img) {
  ctx.filter=`brightness(${funcV.bright}%) contrast(${funcV.contrast}%) blur(${funcV.blur}px) grayscale(${funcV.gray}%) hue-rotate(${funcV.hue}deg) saturate(${funcV.saturate}%) invert(${funcV.invert}%)`;
  ctx.drawImage(img, 0, 0); 
}
