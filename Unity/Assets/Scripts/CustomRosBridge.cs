using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.std_msgs;
using SimpleJSON;
using System;
using VRTK;

public class CustomRosBridge : MonoBehaviour {
    
	public static ROSBridgeWebSocketConnection ros = null;
	public static bool isMoving;

	private const string HOST_IP = "10.186.111.40";

    private IEnumerator coroutine;
    
	// Use this for initialization
    void Start () {
		ros = new ROSBridgeWebSocketConnection("ws://" + HOST_IP, 9090);
        
		//Add subscriber
        //ros.AddSubscriber(typeof(RobotDataSubscriber));

        //Add publisher
        ros.AddPublisher(typeof(RobotDataPublisher));
		ros.AddPublisher(typeof(RobotVelPublisher));
		ros.AddPublisher (typeof(RobotMovingPublisher));

        //Add ServiceResponse
        //ros.AddServiceResponse(typeof(OculusServiceResponse));
		isMoving = false;

        ros.Connect();

        coroutine = WaitAndPrint(0.3f);
        StartCoroutine(coroutine);
	}
	
    void OnApplicationQuit()
    {
        if (ros != null)
        {
            ros.Disconnect();
        }
    }

    // Update is called once per 0.3 seconds
    private IEnumerator WaitAndPrint(float waitTime) {

        BoolMsg msg = new BoolMsg(true);
        //string str;

        while (true)
        {
            yield return new WaitForSeconds(waitTime);
            ros.Publish(RobotMovingPublisher.GetMessageTopic(), msg);
            
            //str = UnityEngine.StackTraceUtility.ExtractStackTrace();
            Debug.Log("hihi");
            ros.Render();
        }
    }

   
}