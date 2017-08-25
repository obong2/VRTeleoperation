## Description

This is a prototype for thesis proposal.
It streams Theta S video (works as a webcam) to the web (http server).

## Run

Use Node.js http-server

```
$ npm install http-server -g
$ http-server
```

access http://127.0.0.1:8080 on Chrome.

## Resources

* [OpenVR](https://github.com/ValveSoftware/openvr.git)
* [OpenVR API Documentation](https://github.com/ValveSoftware/openvr/wiki/API-Documentation)
* [OverLeaf](https://www.overleaf.com/8935687yqqmsddbyghx)
* [Theta+SteamVR+Unity](http://lists.theta360.guide/t/tutorial-live-ricoh-theta-s-dual-fish-eye-for-steamvr-in-unity/938)

## ToDos

* On VR Device,
    - Stream 360 Video taken by the Theta S
    - Add functions to operate two controllers
    - ~~From the controllers, the system accepts coordinate info (2D..? 3D? Needs double check)) ~~
    - Check ROS compatibility
* Path planning
    - ~~Coordinate transformation (2D -> 3D): How can I get the depth info?)~~
    - Global path planning: Landmark based Pre-assigned spots. APs will be installed on the spots
    - Use a directional antenna attached on the mobile robot
    - Local path planning by AP control: Find a local path using AP signal strength
    - Obstacle detection
    - Create a suitable path based on the points (Currently, use Bezier Curve)
* User Interface
    - Feedback in VR Sys
    - Show a list of pre-assigned spots
    - User can find a new path while exploring
    - Show a global view on the display (Overview of the map + current position of the robot)
