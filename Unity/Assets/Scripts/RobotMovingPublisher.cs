using System.Collections;
using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.std_msgs;

public class RobotMovingPublisher : ROSBridgePublisher {

	public static string GetMessageTopic()
	{
		return "/isMoving";
	}

	public static string GetMessageType()
	{
		return "std_msgs/Bool";
	}

	public static string ToString(BoolMsg msg)
	{
		return msg.ToString();
	}
	public static string ToYAMLString(BoolMsg msg)
	{
		Debug.Log(msg.ToYAMLString());
		return msg.ToYAMLString();
	}
}
