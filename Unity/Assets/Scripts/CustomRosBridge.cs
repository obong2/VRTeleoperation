using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.std_msgs;
using SimpleJSON;

public class CustomRosBridge : MonoBehaviour {
    private ROSBridgeWebSocketConnection ros = null;

	// Use this for initialization
	void Start () {
        ros = new ROSBridgeWebSocketConnection("ws://192.168.1.4", 1803);
        //Add subscriber
        ros.AddSubscriber(typeof(RobotDataSubscriber));
        //Add publisher
        ros.AddPublisher(typeof(RobotDataPublisher));

        //Add ServiceResponse
        ros.AddServiceResponse(typeof(OculusServiceResponse));

        ros.Connect();
	}
	
    void OnApplicationQuit()
    {
        if (ros != null)
        {
            ros.Disconnect();
        }
    }

	// Update is called once per frame
	void Update () {
        //PoseMsg msg;
        //ros.Publish(RobotDataPublisher.GetMessageTopic(), msg);
        ros.Render();
	}

   
}

/*
 * Message
 * Header header
 *  seq
 *  timestamp?
 * string[] points: Array of SSID
 */
public class RobotDataSubscriber : ROSBridgeSubscriber
{
    public static string GetMessageTopic()
    {
        return null;
    }

    public static string GetMessageType()
    {
        return null;
    }

    public static ROSBridgeMsg ParseMessage(JSONNode msg)
    {
        return null;
    }

    public static void CallBack(ROSBridgeMsg msg)
    {
    }
}

public class RobotDataPublisher : ROSBridgePublisher
{
    public static string GetMessageTopic()
    {
        return null;
    }

    public static string GetMessageType()
    {
        return null;
    }

    public static string ToYAMLString()
    {
        return null;
    }
}

public class OculusServiceResponse {
    public static void ServiceCallBack(string service, string response)
    {
        if (response == null)
            Debug.Log("ServiceCallback for service " + service);
        else
            Debug.Log("ServiceCallback for service " + service + " response " + response);
    }
}