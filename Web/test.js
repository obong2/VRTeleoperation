var vrEffect, effect;
var vrControls, controls;
var isVrMode = false;

// Adding initialization processing
vrEffect = new THREE.VREffect( renderer );
effect = renderer;
vrControls = new THREE.VRControls( camera );
controls = vrControls;

// Setting VR mode to on/off based on key events
function onkey( event ) {
    if(event.keyCode == '79' || event.keyCode =='86') { // v || o
        if(isVrMode) {
            escapeVr();
            isVrMode = false;
        } else {
            enterVr();
            isVrMode = true;
        } 
    } 
    event.stopPropagation();
}
window.addEventListener("keydown", onkey, true);
function enterVr() {
    // check to see if we are in iframe before setting fullscreen.
    if(!window.frameElement) {
        controls = vrControls;
        effect = vrEffect;
        effect.setFullScreen( true );
    }
}
function escapeVr() {
    // check to see if we are in iframe before setting fullscreen.
    if(!window.frameElement) {
        //effect.setFullScreen( false );
        effect = renderer;
        if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen(); //FF10+
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen(); //IE11+
        } else if(document.cancelFullScreen) {
            document.cancelFullScreen(); //Gecko:FullScreenAPI interface
        } else if(document.exitFullscreen) {
            document.exitFullscreen(); // HTML5 Fullscreen API interface
        }
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// managing windows size 
function update() {
    if(isVrMode) {
        // handling head tracking 
        if (typeof controls.update == 'function') {
            controls.update();
        } 
    }
    else {
        // handling the results of mouse actions 
        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.Math.degToRad(90 - lat);
        theta = THREE.Math.degToRad(lon);

        camera.target.x = Math.sin(phi) * Math.cos(theta);
        camera.target.y = Math.cos(phi);
        camera.target.z = Math.sin(phi) * Math.sin(theta);

        camera.lookAt(camera.target);
    }

    // video to image
    videoImageContext.drawImage(localVideo, 0, 0, videoImage.width, videoImage.height);
    if (videoTexture) {
        videoTexture.needsUpdate = true;
    }

    //renderer.render(scene, camera); // making existing handling invalid
    effect.render(scene, camera); // doing rendering for VR
}