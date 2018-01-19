using System.Collections;
using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.std_msgs;

public class RobotDataPublisher : ROSBridgePublisher {

	public static string GetMessageTopic()
	{
		return "/pathwaypoints";
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
