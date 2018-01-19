using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.std_msgs;
using SimpleJSON;
using System;

public class CustomRosBridge : MonoBehaviour {
<<<<<<< HEAD
    public static ROSBridgeWebSocketConnection ros = null;
<<<<<<< HEAD
	private const string HOST_IP = "10.186.105.144";
=======
    private ROSBridgeWebSocketConnection ros = null;
>>>>>>> parent of 2994eea... Update UI control on unity
=======
>>>>>>> parent of ba59e88... removed unnecessary files
    private IEnumerator coroutine;
    // Use this for initialization
    void Start () {
        ros = new ROSBridgeWebSocketConnection("ws://192.168.1.4", 9090);
        //Add subscriber
        //ros.AddSubscriber(typeof(RobotDataSubscriber));
        //Add publisher
        ros.AddPublisher(typeof(RobotDataPublisher));
<<<<<<< HEAD
		ros.AddPublisher(typeof(RobotVelPublisher));
<<<<<<< HEAD
		ros.AddPublisher (typeof(RobotMovingPublisher));
=======

>>>>>>> parent of 2994eea... Update UI control on unity
=======
>>>>>>> parent of ba59e88... removed unnecessary files
        //Add ServiceResponse
        //ros.AddServiceResponse(typeof(OculusServiceResponse));

        ros.Connect();

        coroutine = WaitAndPrint(4.0f);
        StartCoroutine(coroutine);

	}
	
    void OnApplicationQuit()
    {
        if (ros != null)
        {
            ros.Disconnect();
        }
    }

    // Update is called once per frame
    private IEnumerator WaitAndPrint(float waitTime) {

        StringMsg msg = new StringMsg("\"Hello World\"");
        string str;

        while (true)
        {
            yield return new WaitForSeconds(waitTime);
            ros.Publish(RobotDataPublisher.GetMessageTopic(), msg);
            
            str = UnityEngine.StackTraceUtility.ExtractStackTrace();
            Debug.Log(str);
            ros.Render();
        }
        
        //Console.WriteLine(str);
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
    public new string GetMessageTopic()
    {
        return null;
    }

    public new string GetMessageType()
    {
        return null;
    }

    public new ROSBridgeMsg ParseMessage(JSONNode msg)
    {
        return null;
    }

    public new void CallBack(ROSBridgeMsg msg)
    {
    }
}

public class RobotDataPublisher : ROSBridgePublisher
{
    public static string GetMessageTopic()
    {
        return "/chatter";
    }

    public static string GetMessageType()
    {
        return "std_msgs/String";
    }

    public static string ToString(StringMsg msg)
    {
        return msg.ToString();
    }
    public static string ToYAMLString(StringMsg msg)
    {
        Debug.Log(msg.ToYAMLString());
        return msg.ToYAMLString();
    }
}
<<<<<<< HEAD
<<<<<<< HEAD
/*
=======

>>>>>>> parent of 2994eea... Update UI control on unity
=======
	
>>>>>>> parent of ba59e88... removed unnecessary files
public class OculusServiceResponse {
    public static void ServiceCallBack(string service, string response)
    {
        if (response == null)
            Debug.Log("ServiceCallback for service " + service);
        else
            Debug.Log("ServiceCallback for service " + service + " response " + response);
    }
}