// ## interface ### //
$(document).ready(function(){
  var slideTo = function(){
    var current = $('.slider').attr('data-slide');
    var page_len = $('.page').length-1;
    $('.page.active').removeClass('active');
    if(current >= page_len){
      current = 0
    } else {
      current++;
    }
    $('.page').eq(current).addClass('active');
    $('.slider').attr('data-slide', current)
  };

  // $('body').on("click", function(e){
  //   e.preventDefault();
  //   slideTo();
  // });



  // ### CAM ### //
  var video = document.getElementById("videoElement");
  var canvas = document.querySelector("#vidCanvas");
  var context = canvas.getContext("2d");
  var localMediaStream = null;
  var _w = video.videoWidth/2;
  var _h = video.videoHeight/2;


  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio: false}, handleVideo, videoError);
  }
  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
  }

  function videoError(err) {
    console.log("An error occured! " + err);
  }

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
  }

  video.addEventListener('click', snapshot, false);

  // Not showing vendor prefixes or code that works cross-browser.
  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, function(){ console.log('error'); });


  document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, _w/2, _h/2);

    var dataURL = canvas.toDataURL();
    // set canvasImg image src to dataURL
    // so it can be saved as an image
    document.getElementById('canvasImg').src = dataURL
  });



});

//EXTENSIONS
