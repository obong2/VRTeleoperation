using System.Collections;
using System.Text;
using SimpleJSON;
using ROSBridgeLib.std_msgs;

public class PathName : ROSBridgeMsg
{
    private string[] _points;
    private HeaderMsg _header;

     public string GetMessageType()
    {
        return "/PathName";
    }

    public PathName(HeaderMsg header, string[] msg)
    {
        _header = header;
        _points = new string[msg.Length];
        //TODO: Define message generation
        for(int i=0; i<msg.Length; i++)
        {
            _points[i] = msg[i];
        }
    }
    
    public override string ToString()
    {
        return "[ Header=" + _header + ", points=" + _points;
    }
}