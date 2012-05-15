import System;
//import System.Collections;
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;

// Anything we want to store in the XML file, we define it here
class DemoData
{
		
	//Player
    var x : float;
    var y : float;
    var z : float;
	
	var playerVariables : SavePlayer;
	var projectVariables : SaveProject;
	var f_01 : SaveFuncionario;
	var f_02 : SaveFuncionario;
	var f_03 : SaveFuncionario;
	var f_04 : SaveFuncionario;
	var f_05 : SaveFuncionario;
	var f_06 : SaveFuncionario;
	var f_07 : SaveFuncionario;
	var f_08 : SaveFuncionario;
	
}

// UserData is our custom class that holds our defined objects we want to store in XML format
 class UserData
 {
    // We have to define a default instance of the structure
   public var _iUser : DemoData = new DemoData();
    // Default constructor doesn't really do anything at the moment
   function UserData() { }
}

//public class GameSaveLoad: MonoBehaviour {

// This is our local private members
private var _Save : Rect;
private var _Load : Rect;
private var _SaveMSG : Rect;
private var _LoadMSG : Rect;
private var _FileLocation : String;
private var _FileName : String = "SaveData.xml";

//public GameObject _Player;
var welcome : WelcomeWindow;
var _Player : GameObject;
var _PlayerStats : PlayerStats;
var _Pagamentos : Pagamentos;
var _Project : Project;
var _Time : GameTime;
var _Equipe : Equipe;
var _Funcionario01 : Funcionario;
var _Funcionario02 : Funcionario;
var _Funcionario03 : Funcionario;
var _Funcionario04 : Funcionario;
var _Funcionario05 : Funcionario;
var _Funcionario06 : Funcionario;
var _Funcionario07 : Funcionario;
var _Funcionario08 : Funcionario;
var _Treinamento01 : Treinamento;
var _Treinamento02 : Treinamento;
var _Treinamento03 : Treinamento;
var _Treinamento04 : Treinamento;
var _Treinamento05 : Treinamento;
var _Treinamento06 : Treinamento;
var _Treinamento07 : Treinamento;
var _Treinamento08 : Treinamento;

private var myData : UserData;
private var _data : String;

private var VPosition : Vector3;

// When the EGO is instansiated the Start will trigger
// so we setup our initial values for our local members
function LoadGame()
{
	_Project.ResetProject();
	LoadXML();
	if(_data.ToString() != "")
	{
		// notice how I use a reference to type (UserData) here, you need this
		// so that the returned object is converted into the correct type
		//myData = (UserData)DeserializeObject(_data);
		myData = DeserializeObject(_data);
		 // set the players position to the data we loaded
		VPosition=new Vector3(myData._iUser.x,myData._iUser.y,myData._iUser.z);             
		_Player.transform.position=VPosition;
		
		
		myData._iUser.projectVariables.SetProjectVariables(_Project);
		
		myData._iUser.playerVariables.SetPlayerVariables(_PlayerStats, _Pagamentos, _Equipe, _Time);
		
		myData._iUser.f_01.SetFuncionarioVariables(_Funcionario01, _Treinamento01);
		myData._iUser.f_02.SetFuncionarioVariables(_Funcionario02, _Treinamento02);
		myData._iUser.f_03.SetFuncionarioVariables(_Funcionario03, _Treinamento03);
		myData._iUser.f_04.SetFuncionarioVariables(_Funcionario04, _Treinamento04);
		myData._iUser.f_05.SetFuncionarioVariables(_Funcionario05, _Treinamento05);
		myData._iUser.f_06.SetFuncionarioVariables(_Funcionario06, _Treinamento06);
		myData._iUser.f_07.SetFuncionarioVariables(_Funcionario07, _Treinamento07);
		myData._iUser.f_08.SetFuncionarioVariables(_Funcionario08, _Treinamento08);
		
	
	}
}

function SaveGame()
{
	GUI.Label(_SaveMSG,"Saving to: "+_FileLocation);
	//Debug.Log("SaveLoadXML: sanity check:"+ _Player.transform.position.x);
	//Player Position
	myData._iUser.x = _Player.transform.position.x;
	myData._iUser.y = _Player.transform.position.y;
	myData._iUser.z = _Player.transform.position.z;
	
	myData._iUser.projectVariables.GetProjectVariables(_Project);
	
	myData._iUser.playerVariables.GetPlayerVariables(_PlayerStats, _Pagamentos, _Equipe, _Time);
	
	myData._iUser.f_01.GetFuncionarioVariables(_Funcionario01, _Treinamento01);
	myData._iUser.f_02.GetFuncionarioVariables(_Funcionario02, _Treinamento02);
	myData._iUser.f_03.GetFuncionarioVariables(_Funcionario03, _Treinamento03);
	myData._iUser.f_04.GetFuncionarioVariables(_Funcionario04, _Treinamento04);
	myData._iUser.f_05.GetFuncionarioVariables(_Funcionario05, _Treinamento05);
	myData._iUser.f_06.GetFuncionarioVariables(_Funcionario06, _Treinamento06);
	myData._iUser.f_07.GetFuncionarioVariables(_Funcionario07, _Treinamento07);
	myData._iUser.f_08.GetFuncionarioVariables(_Funcionario08, _Treinamento08);

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
      myData=new UserData();
   }
   
/* The following metods came from the referenced URL */
//string UTF8ByteArrayToString(byte[] characters)
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
   var xs : XmlSerializer = new XmlSerializer(typeof(UserData));
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
   var xs : XmlSerializer  = new XmlSerializer(typeof(UserData));
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