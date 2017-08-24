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

function ros_setup(ros){
  ros.on('connection', function(){
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error){
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function(){
    console.log('Connection to websocket server closed.');
  });
}
var id_no = 0;

function ros_publisher(ros, pos){
  var cmdVel = new ROSLIB.Topic({
    ros:ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
  });
    /*
    ros:ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
    */
  var twist = new ROSLIB.Message({
    linear: {
      x: pos.linear.x,
      y: 0.1,
      z: 0.2
    },
    angular: {
      x: 0.1,
      y: 0.2,
      z: pos.angular.z
    }  
  });

  /*
    linear: {
      x: 0.1,
      y: 0.2,
      z: 0.3
    },
    angular: {
      x: -0.1,
      y: -0.2,
      z: -0.3
    }
  */

  cmdVel.publish(twist);
}

var theta_view = function (video_id) {
	var camera, scene, renderer, raycaster;

  var texture_placeholder;

  isUserInteracting = false;
  isSpect = false;

  onMouseDownMouseX = 0, onMouseDownMouseY = 0;
  lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0,
  distance = 500,
  onPointerDownPointerX = 0,
  onPointerDownPointerY = 0,
  onPointerDownLon = 0,
  onPointerDownLat = 0;

  var width  = window.innerWidth;
  var height = window.innerHeight;
  var fov    = 60;
  var aspect = width / height;
  var near   = 1;
  var far    = 1100;

  var sphere = [];
  var shape = ['SphereGeometry', [10, 16, 8]];
  var sphere_count = 0;

  //ros connection
  var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });
  var listener;
  var robot_cur_pos;

  // main
  init();
  animate();

  // methods
  function init(){
    var element, mesh;
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    element = renderer.domElement;
    document.body.appendChild(element);

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    var geometry = new THREE.SphereBufferGeometry(500, 40, 40);
    geometry.scale(-1, 1, 1);

    webcaminit(video_id);

    var video = document.getElementById (video_id);
    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var material = new THREE.MeshBasicMaterial({map: texture});

    mesh = new THREE.Mesh(geometry, material);

    build.prototype = THREE[shape[0]].prototype;

    scene.add(mesh);

    window.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('wheel', onDocumentMouseWheel, false);
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener("keydown", keydown, false);

    raycaster = new THREE.Raycaster();

    ros_setup(ros);
    
  }


  function animate(){
    requestAnimationFrame(animate);
    update();
  }

  function update(){
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    camera.position.y = distance * Math.cos( phi );
    camera.position.z = distance * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );


    if(sphere_count > 0)
    {
      for(i = 0; i<sphere_count; i++){
        sphere[i].rotation.x += 0.01;
        sphere[i].rotation.y += 0.005;
        sphere[i].rotation.z += 0.0025;
      }
    }
   
    renderer.render(scene, camera);
    ros_subscriber();
    
  }

  function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.Matrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseDown( event ) {

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;

    if(isSpect === true){
      event.preventDefault();
      isUserInteracting = true;  
    }
    else{
      drawCircle(onPointerDownPointerX, onPointerDownPointerY);
    }
  }

  function onDocumentMouseMove( event ) {
    if ( isUserInteracting === true ) {
      lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
      lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
    }
  }
  
  function onDocumentMouseUp( event ) {
    isUserInteracting = false;
  }

  function onDocumentMouseWheel( event ) {
    distance += event.deltaY * 0.05;
  }

  function keydown(e) {
    var keyCode = e.keyCode;
    switch (keyCode) {
      case 40:
        // zoom in
        camera.fov += 2;
        if(camera.fov >= 130) camera.fov = 130;
        camera.updateProjectionMatrix();
        break;
      case 38:
        // zoom out
        camera.fov -= 2;
        if(camera.fov <= 30) camera.fov = 30;
        camera.updateProjectionMatrix();
        break;
      case 83: //s
        if(isSpect)
          isSpect = false;
        else
          isSpect = true;
      case 80: //p
        if(sphere_count > 0 && isSpect)
          create_path(sphere_count-1);
    }
  }
  
  function build(){
    return THREE[shape[0]].apply(this,shape[1]);
  }
  
  function drawCircle(onMouseDownX, onMouseDownY){
    var object_position = new THREE.Vector2(), INTERSECTED;
    
    object_position.x = 2*(onMouseDownX/window.innerWidth) - 1;
    object_position.y = -2*(onMouseDownY/window.innerHeight) + 1;
    object_position.z = 0.5;

    camera.updateMatrixWorld();
    
    raycaster.setFromCamera( object_position, camera );
    
    var intersects = raycaster.intersectObjects(scene.children);
    //console.log(intersects);
    if(intersects.length == 1){
      var shape = new build();
      sphere[sphere_count] = new THREE.Mesh(shape, new THREE.MeshBasicMaterial({color: "red", wireframe: true}));

      console.log(intersects[0].point);
      console.log(onMouseDownY);

      sphere[sphere_count].position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
      scene.add(sphere[sphere_count]);
      var sphereAxis = new THREE.AxisHelper(20);
      sphere[sphere_count].add(sphereAxis);

      if(++sphere_count === 5){
        sphere_count = 0;
       }
    }
  }

  function create_path(degree){
    if(degree === 3) //cubic
    {
      var curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(sphere[0].position.x, sphere[0].position.y, sphere[0].position.z),
        new THREE.Vector3(sphere[1].position.x, sphere[1].position.y, sphere[1].position.z),
        new THREE.Vector3(sphere[2].position.x, sphere[2].position.y, sphere[2].position.z),
        new THREE.Vector3(sphere[3].position.x, sphere[3].position.y, sphere[3].position.z)
      );
    }
    else if(degree === 4)
    {
      var curve = new THREE.QuardraticBezierCurve3(
        new THREE.Vector3(sphere[0].position.x, sphere[0].position.y, sphere[0].position.z),
        new THREE.Vector3(sphere[1].position.x, sphere[1].position.y, sphere[1].position.z),
        new THREE.Vector3(sphere[2].position.x, sphere[2].position.y, sphere[2].position.z),
        new THREE.Vector3(sphere[3].position.x, sphere[3].position.y, sphere[3].position.z),
        new THREE.Vector3(sphere[4].position.x, sphere[4].position.y, sphere[4].position.z)
      );
    }
    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(50);

    var material = new THREE.LineBasicMaterial({color: 0xff0000});

    var curveObject = new THREE.Line(geometry, material);

    scene.add(curveObject);
  
  }

  function ros_subscriber(){
    listener = new ROSLIB.Topic({
      ros: ros,
      name: '/odom',
      serviceType: 'nav_msgs/Odometry'
    });
    
    if(sphere_count > 0){
      listener.subscribe(function(message){
       //console.log(message.pose.pose.position.x);
        robot_cur_pos = {
          x: message.pose.pose.position.x,
          y: message.pose.pose.position.y,
          z: message.pose.pose.position.z
        };
        ros_feedback();
      });
    }    
  }

  function ros_feedback(){
    var request_pos = {
      linear:{
        x:0, y:0, z:0
      },
      angular:{
        x:0, y:0, z:0
      }
    };

    if(sphere[0].position.x > robot_cur_pos.x)
      request_pos.angular.z = 1.25;
    else request_pos.angular.z = -1.24;
    if(sphere[0].position.y > robot_cur_pos.y)
      request_pos.linear.x = 0.3;
    else request_pos.linear.x = -0.3;

    ros_publisher(ros, request_pos);
  }

};