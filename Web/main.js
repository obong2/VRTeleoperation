var theta_view = function(video_id){
    init(video_id);
    animate();
}

function init(){
    webcaminit(video_id);
    THETA_GL.init(video_id, true, true);
}

function animate(){
    requestAnimationFrame(animate);
    THETA_GL.startAnimate();
    update();
}

function webcaminit(video_id) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;
  
    video = document.getElementById( video_id );
    video.autoplay = true;
  
    var option = {
      video: { mandatory:{ minWidth: 1280 } },
      audio: true
    }
  
    // 1st try FullHD
    navigator.getUserMedia(option,
      function(stream) { // for success case
        video.src = window.URL.createObjectURL(stream);
      },
      function(err) { // for error case
        console.log(err);
      }
    );
  
    video.addEventListener('loadeddata', function() {
      // retry getting camera.
      (function getVideoResolution() {
        vidWidth = video.videoWidth;
        vidHeight = video.videoHeight;
        console.log(vidWidth);
        if(vidWidth != 0) {
          console.log("video width: " + vidWidth + " height: " + vidHeight);
        } else {
          setTimeout(getVideoResolution, 250);
        }
      })();
    });
}