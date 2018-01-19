using VRTK.Examples;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Experimental.UIElements;
using ROSBridgeLib.std_msgs;
using ROSBridgeLib.geometry_msgs;

public class UIControl : UI_Interactions {
	private bool isMoving = false;

	new public void Button_Red()
	{
		
		Debug.Log ("Red button clickedasdfasdfasdf");
		var ButtonObj = GameObject.Find ("ExampleWorldObjects/Canvas/Button0");
		var DropdownObj = GameObject.Find ("ExampleWorldObjects/Canvas/Dropdown");
		if (isMoving) {
			isMoving = false;
			ButtonObj.GetComponentInChildren<Text>().text = "Stop";
			//Stop navigation
			TwistMsg msg = new TwistMsg(new Vector3Msg(0,0,0), new Vector3Msg(0,0,0));
			if(CustomRosBridge.ros != null)	CustomRosBridge.ros.Publish(RobotVelPublisher.GetMessageTopic(), msg);
		} else {
			isMoving = true;
			ButtonObj.GetComponentInChildren<Text>().text = "Confirm";
			//Start navigation
			StringMsg msg = new StringMsg("\"" + DropdownObj.GetComponentInChildren<Label>().text + "\"");
			if(CustomRosBridge.ros != null)	CustomRosBridge.ros.Publish(RobotDataPublisher.GetMessageTopic(), msg);
		}

	}

}
