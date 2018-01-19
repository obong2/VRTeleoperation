using UnityEngine;
using ROSBridgeLib;
using ROSBridgeLib.geometry_msgs;

public class RobotVelPublisher : ROSBridgePublisher {

	public static string GetMessageTopic()
	{
		return "/RosAria/cmd_vel";
	}

	public static string GetMessageType()
	{
		return "geometry_msgs/Twist";
	}

	public static string ToString(TwistMsg msg)
	{
		return msg.ToString();
	}
	public static string ToYAMLString(TwistMsg msg)
	{
		Debug.Log(msg.ToYAMLString());
		return msg.ToYAMLString();
	}
}
