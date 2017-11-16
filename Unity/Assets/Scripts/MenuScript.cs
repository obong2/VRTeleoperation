using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MenuScript : MonoBehaviour {

    public Dropdown dropdown0;
    public Dropdown dropdown1;
    public Dropdown dropdown2;

    List<string> APs = new List<string>() { "AP1", "AP2", "AP3" };
    public Text selectedItem;

    // Use this for initialization
    void Start () {
        PopulateList();
	}
	
    void PopulateList()
    {   
        dropdown0.AddOptions(APs);
        dropdown1.AddOptions(APs);
        dropdown2.AddOptions(APs);
    }

    public void Dropdown_IndexChanged(int index)
    {
        
    }
	// Update is called once per frame
	void Update () {
		
	}
}
