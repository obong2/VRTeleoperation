## Description

This repository include the source codes for AR Teleoperation Project.
The purpose of this project is controlling a mobile robot using VR device, especially 'Oculus Rift'.

You will need two computers (1: Connected to a mobile robot that will use ROS and run 'rosbridge', 2: Connected to Oculus). 

The first computer (COM1) streams dual fish eye video, that works as a webcam (Theta S), through 'VLC' with its public ip. Also, it controls the mobile robot based on ROSARIA package (intended work as a submodule in this repo).

The second computer (COM2) receives the video from COM1 and converts the dual fish eye video into a equirectangular format on Unity interface.

COM1 and COM2 communicate using rosbridge (COM1: [rosbridge](http://wiki.ros.org/rosbridge_suite), COM2: [ROSBridgeLib](https://github.com/MathiasCiarlo/ROSBridgeLib) )

## Run
1. In COM1,
    1) Install ROS, ROSARIA, and ROSBridge
    2) Connect Mobile Robot (Pioneer 3AT) with serial cable to one of COM1 USB Ports
    3) Request a service / publish & subscribe message required
    
       For this project, I defined a new message type 'PathName' that contains SSID of APs
    4) Open 'VLC' and start a streaming.
        * Best setting for the streaming should be a 'webm' format with appropriate resolution.

2. In COM2,
    1) Open Unity project
    2) Make sure your 'steamVR' is online.
    3) Click 'Play' button to run and play the video.

## Resources

* [Theta S + Oculus + WebRTC/WebVR](http://lists.theta360.guide/t/theta-s-webrtc-webgl-webvr-oculus/82)
* [OpenVR](https://github.com/ValveSoftware/openvr.git)
* [OpenVR API Documentation](https://github.com/ValveSoftware/openvr/wiki/API-Documentation)
* [Link to thesis](https://www.overleaf.com/8935687yqqmsddbyghx)
* [Theta+SteamVR+Unity](http://lists.theta360.guide/t/tutorial-live-ricoh-theta-s-dual-fish-eye-for-steamvr-in-unity/938)

## ToDos
Basic structure is streamer(Robot)-watcher(VR).
- [ ] Check if the public IP access is available in the school network (PAL3.0).

- [X] VLC: ~~video streaming with a equirectangular format~~ (Not supported)
- [X] VLC: video streaming with a dual fish eye format
- [X] Unity: Render a video on a Sphere obj
- [ ] Unity: Remove tortions in the shader (Maya)
- [ ] Unity: Connect with Rosbridge (COM1)
- [ ] Unity: Send waypoints to COM1 with a format of service
- [ ] Unity: Create UI that shows accessible SSID
- [X] ROS: Setup
- [ ] ROS: Define topics to be published/subscribed
- [ ] ROS: Modify ROSARIA source code if needed (possibly required for scanning wifi signals)
- [ ] ROS: Path planning algorithm based on wifi fingerprinted data
- [ ] Thesis: Update abstract, intro
- [ ] Thesis: Remove deprecated sections (related work, methodology)
- [ ] Thesis: Summarize experiments