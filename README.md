## Description

This repository include the source codes for AR Teleoperation Project.
The purpose of this project is controlling a mobile robot using VR device, especially 'Oculus Rift'.
You will need two computers (1: Connected to a mobile robot that will use ROS and run HTTP server, 2: Connected to Oculus). And the computers should be in the same network. The first computer (Computer 1) will stream 360 degree video that works as a webcam (Theta S).

## Run
Install required modules on Computer 1. (http-server module, ros, irobot-create driver, rosbridge)
You might need to include 'sudo' before the below commands.
After cloning this project, browse to /Web folder and run these commands (start a web server).

```
$ npm install http-server -g
$ http-server
```
If it makes 'command not found' error, run this command.
Then, try to start a web server again
```
$ npm config set prefix /ser/local
$ http-server
```

On Computer 2, 
access http://IPaddress:8080 (e.g. http://192.168.1.4:8080) on your browser (firefox / chrominum).

## Resources

* [Theta S + Oculus + WebRTC/WebVR](http://lists.theta360.guide/t/theta-s-webrtc-webgl-webvr-oculus/82)
* [OpenVR](https://github.com/ValveSoftware/openvr.git)
* [OpenVR API Documentation](https://github.com/ValveSoftware/openvr/wiki/API-Documentation)
* [OverLeaf](https://www.overleaf.com/8935687yqqmsddbyghx)
* [Theta+SteamVR+Unity](http://lists.theta360.guide/t/tutorial-live-ricoh-theta-s-dual-fish-eye-for-steamvr-in-unity/938)

## ToDos
Basic structure is streamer(Robot)-watcher(VR).
* On VR Device (Watcher),
    - Get 360 Video taken by COM1
    - Add functions to operate two controllers
    - ~~From the controllers, the system accepts coordinate info (2D..? 3D? Needs double check))~~
* Path planning
    - ~~Coordinate transformation (2D -> 3D): How can I get the depth info?)~~
    - Global path planning: Landmark based Pre-assigned spots. APs will be installed on the spots
    - Use a directional antenna attached on the mobile robot
    - Local path planning by AP control: Find a local path using AP signal strength
    - Obstacle detection
    - Create a suitable path based on the points (Currently, use Bezier Curve)
* User Interface (in WebVR)
    - Feedback in VR Sys
    - Show a list of pre-assigned spots
    - User can find a new path while exploring
    - Show a global view on the display (Overview of the map + current position of the robot)
