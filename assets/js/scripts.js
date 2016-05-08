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

  $('body').on("click", ".next", function(e){
    e.preventDefault();
    slideTo();
  });

  $('.tag').on("click", function(e){
    e.preventDefault();
    $(this).toggleClass('active');
  });


  // ### CAM ### //
  var video = document.getElementById("videoElement");
  var canvas = document.querySelector("#vidCanvas");
  var localMediaStream = null;
  var vid_w = $('#videoElement').width();
  var vid_h = $('#videoElement').height();
  $('#canvas').width(vid_w)
  $('#canvas').height(vid_h)
  var context = canvas.getContext("2d");
  var vid_constraints = {
    mandatory: {
      maxWidth: 400,
      maxHeight: 300
    }
  }

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

  // Not showing vendor prefixes or code that works cross-browser.
  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, function(){ console.log('error'); });


  var state = 0
  document.getElementById("snap").addEventListener("click", function(e) {
    e.preventDefault();
    var _w = video.videoWidth;
    var _h = video.videoHeight;
    context.drawImage(video, 0, 0, 200, 150);
    flash();
    if(state <= 0){
      $('.img-wrap').eq(0).append(convertCanvasToImage());
      $('.img-wrap').eq(2).append(convertCanvasToImage());
      state++;
    } else {
      $('.round_btn__snap').addClass('next');
      $('.img-wrap').eq(1).append(convertCanvasToImage());
      $('.img-wrap').eq(3).append(convertCanvasToImage());
    }
  });

  function flash(){
    $('.cam_container').append("<div class='cam_overlay'>")
  }

  function convertCanvasToImage() {
  	var image = new Image();
  	image.src = canvas.toDataURL("image/png");
  	return image;
  }


});

//EXTENSIONS
