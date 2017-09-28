var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

var config = {
    wssHost: 'wss://wotpal.club'
    // wssHost: 'wss://example.com/myWebSocket'
  };

var localVideoElem = null, 
remoteVideoElem = null, 
localVideoStream = null,
start_button = null, 
stop_button = null;
var peerConn = null,
wsc = new WebSocket(config.wssHost),
peerConnCfg = {'iceServers': 
  [{'url': 'stun:stun.services.mozilla.com'}, 
   {'url': 'stun:stun.l.google.com:19302'}]
};

function pageReady() {
    // check browser WebRTC availability 
    if(navigator.getUserMedia) {
      start_button = document.getElementById("start_button");
      endCallButton = document.getElementById("stop_button");
//      localVideo = document.getElementById('localVideo');
      remoteVideo = document.getElementById('remoteVideo');
      start_button.removeAttribute("disabled");
      start_button.addEventListener("click", initiateCall);
      stop_button.addEventListener("click", function (evt) {
      wsc.send(JSON.stringify({"closeConnection": true }));
      });
    } else {
      alert("Sorry, your browser does not support WebRTC!")
    }
  };

  // run start(true) to initiate a call
function initiateCall() {
    prepareCall();
    // get the local stream, show it in the local video element and send it
    //navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
    //  localVideoStream = stream;
    //  localVideo.src = URL.createObjectURL(localVideoStream);
    //  peerConn.addStream(localVideoStream);
    //  createAndSendOffer();
    //}, function(error) { console.log(error);});
  };
  
  function answerCall() {
    prepareCall();
    // get the local stream, show it in the local video element and send it
    navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
      localVideoStream = stream;
      localVideo.src = URL.createObjectURL(localVideoStream);
      peerConn.addStream(localVideoStream);
      createAndSendAnswer();
    }, function(error) { console.log(error);});
  };
  
  wsc.onmessage = function (evt) {
    var signal = null;
    if (!peerConn) answerCall();
    signal = JSON.parse(evt.data);
    if (signal.sdp) {
      console.log("Received SDP from remote peer.");
      peerConn.setRemoteDescription(new RTCSessionDescription(signal.sdp));
    }
    else if (signal.candidate) {
      console.log("Received ICECandidate from remote peer.");
      peerConn.addIceCandidate(new RTCIceCandidate(signal.candidate));
    } else if ( signal.closeConnection){
      console.log("Received 'close call' signal from remote peer.");
      endCall();
    }
  };
  
  function createAndSendOffer() {
    peerConn.createOffer(
      function (offer) {
        var off = new RTCSessionDescription(offer);
        peerConn.setLocalDescription(new RTCSessionDescription(off), 
          function() {
            wsc.send(JSON.stringify({"sdp": off }));
          }, 
          function(error) { console.log(error);}
        );
      }, 
      function (error) { console.log(error);}
    );
  };
  
  function createAndSendAnswer() {
    peerConn.createAnswer(
      function (answer) {
        var ans = new RTCSessionDescription(answer);
        peerConn.setLocalDescription(ans, function() {
            wsc.send(JSON.stringify({"sdp": ans }));
          }, 
          function (error) { console.log(error);}
        );
      },
      function (error) {console.log(error);}
    );
  };
  
  function prepareCall() {
    peerConn = new RTCPeerConnection(peerConnCfg);
    peerConn.onicecandidate = onIceCandidateHandler;
    peerConn.onaddstream = onAddStreamHandler;
  };
  
  function onIceCandidateHandler(evt) {
    if (!evt || !evt.candidate) return;
    wsc.send(JSON.stringify({"candidate": evt.candidate }));
  };
  
  function onAddStreamHandler(evt) {
    start_button.setAttribute("disabled", true);
    stop_button.removeAttribute("disabled"); 
    // set remote video stream as source for remote video HTML5 element
    remoteVideo.src = URL.createObjectURL(evt.stream);
  };
  
  function endCall() {
    peerConn.close();
    peerConn = null;
    start_button.removeAttribute("disabled");
    stop_button.setAttribute("disabled", true);
    if (localVideoStream) {
      localVideoStream.getTracks().forEach(function (track) {
        track.stop();
      });
      localVideo.src = "";
    }
    if (remoteVideo) remoteVideo.src = "";
  };

