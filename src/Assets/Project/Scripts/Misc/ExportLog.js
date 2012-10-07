/*
import System;
//import System.Collections;
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;

// Anything we want to store in the XML file, we define it here
class LogData
{

	var project : SaveLog;
	
}

// UserData is our custom class that holds our defined objects we want to store in XML format
 class ExportData
 {
    // We have to define a default instance of the structure
   public var _iUser : LogData = new LogData();
    // Default constructor doesn't really do anything at the moment
   function ExportData() { }
}

//public class GameSaveLoad: MonoBehaviour {

// This is our local private members
private var _Save : Rect;
private var _Load : Rect;
private var _SaveMSG : Rect;
private var _LoadMSG : Rect;
private var _FileLocation : String;
private var _FileName : String = "Log.xml";

//public GameObject _Player;
var projectsData : HistoryLog;

private var myData : ExportData;
private var _data : String;

// When the EGO is instansiated the Start will trigger
// so we setup our initial values for our local members
function LoadGame()
{
	LoadXML();
	if(_data.ToString() != "")
	{
	
	}
}

function SaveGame()
{
	GUI.Label(_SaveMSG,"Saving to: "+_FileLocation);
	//Debug.Log("SaveLoadXML: sanity check:"+ _Player.transform.position.x);
	
	myData._iUser.project.GetLog(projectsData);

	// Time to creat our XML!
	_data = SerializeObject(myData);
	// This is the final resulting XML from the serialization process
	CreateXML();
}

function Awake () { 
      // We setup our rectangles for our messages
      _Save=new Rect(10,80,100,20);
      _Load=new Rect(10,100,100,20);
      _SaveMSG=new Rect(10,120,200,40);
      _LoadMSG=new Rect(10,140,200,40);
       
      // Where we want to save and load to and from
      _FileLocation=Application.dataPath;
      
          
      // we need soemthing to store the information into
      myData=new ExportData();
   }
   */
/* The following metods came from the referenced URL */
//string UTF8ByteArrayToString(byte[] characters)
/*
function UTF8ByteArrayToString(characters : byte[] )
{     
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var constructedString : String  = encoding.GetString(characters);
   return (constructedString);
}

//byte[] StringToUTF8ByteArray(string pXmlString)
function StringToUTF8ByteArray(pXmlString : String)
{
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var byteArray : byte[]  = encoding.GetBytes(pXmlString);
   return byteArray;
}
   
   // Here we serialize our UserData object of myData
   //string SerializeObject(object pObject)
function SerializeObject(pObject : Object)
{
   var XmlizedString : String  = null;
   var memoryStream : MemoryStream  = new MemoryStream();
   var xs : XmlSerializer = new XmlSerializer(typeof(ExportData));
   var xmlTextWriter : XmlTextWriter  = new XmlTextWriter(memoryStream, Encoding.UTF8);
   xs.Serialize(xmlTextWriter, pObject);
   memoryStream = xmlTextWriter.BaseStream; // (MemoryStream)
   XmlizedString = UTF8ByteArrayToString(memoryStream.ToArray());
   return XmlizedString;
}

   // Here we deserialize it back into its original form
   //object DeserializeObject(string pXmlizedString)
function DeserializeObject(pXmlizedString : String)   
{
   var xs : XmlSerializer  = new XmlSerializer(typeof(ExportData));
   var memoryStream : MemoryStream  = new MemoryStream(StringToUTF8ByteArray(pXmlizedString));
   var xmlTextWriter : XmlTextWriter  = new XmlTextWriter(memoryStream, Encoding.UTF8);
   return xs.Deserialize(memoryStream);
}

   // Finally our save and load methods for the file itself
function CreateXML()
{
   var writer : StreamWriter;
   //FileInfo t = new FileInfo(_FileLocation+"\\"+ _FileName);
   var t : FileInfo = new FileInfo(_FileLocation+"/"+ _FileName);
   if(!t.Exists)
   {
      writer = t.CreateText();
   }
   else
   {
      t.Delete();
      writer = t.CreateText();
   }
   writer.Write(_data);
   writer.Close();
}
   
function LoadXML()
{
   //StreamReader r = File.OpenText(_FileLocation+"\\"+ _FileName);
   var r : StreamReader = File.OpenText(_FileLocation+"/"+ _FileName);
   var _info : String = r.ReadToEnd();
   r.Close();
   _data=_info;
}
*/