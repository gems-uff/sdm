import System;
import System.Collections;
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;

// Anything we want to store in the XML file, we define it here
class DemoData
{
	//GameTime
	var gameTime : int;
	
	//Player
    var x : float;
    var y : float;
    var z : float;
	var saldo : int;
    //var name : String;
	
	//Project
	var nome : String;
	var description : String;
	var deadline : int;
	var deadlineDays : int;
	var maxCodeLines : int;
	var linguagemProgramacao : String;
	var pagamento : int;
	var bugValue : int;
	var startDay : int;
	var sincronismo : float;
	var completed : boolean;
	var bugs : float;
	var codeLinesDone : int;
	
	//Funcionario 01
	var F_01_atributos : Atributos;
	var F_01_especializacao : Especializacoes;
	var F_01_nome : String;
	var F_01_defaultSalary : int;
	var F_01_salary : int;
	var F_01_role : String;
	var F_01_job : String;
	var F_01_workingHours : int;
	var F_01_morale : float;
	var T_01_lock : boolean;
	var T_01_deadline : float;
	var T_01_aprendendo : String;
	
	//Funcionario 02
	var F_02_atributos : Atributos;
	var F_02_especializacao : Especializacoes;
	var F_02_nome : String;
	var F_02_defaultSalary : int;
	var F_02_salary : int;
	var F_02_role : String;
	var F_02_job : String;
	var F_02_workingHours : int;
	var F_02_morale : float;
	var T_02_lock : boolean;
	var T_02_deadline : float;
	var T_02_aprendendo : String;
	//Funcionario 03
	var F_03_atributos : Atributos;
	var F_03_especializacao : Especializacoes;
	var F_03_nome : String;
	var F_03_defaultSalary : int;
	var F_03_salary : int;
	var F_03_role : String;
	var F_03_job : String;
	var F_03_workingHours : int;
	var F_03_morale : float;
	var T_03_lock : boolean;
	var T_03_deadline : float;
	var T_03_aprendendo : String;
	//Funcionario 04
	var F_04_atributos : Atributos;
	var F_04_especializacao : Especializacoes;
	var F_04_nome : String;
	var F_04_defaultSalary : int;
	var F_04_salary : int;
	var F_04_role : String;
	var F_04_job : String;
	var F_04_workingHours : int;
	var F_04_morale : float;
	var T_04_lock : boolean;
	var T_04_deadline : float;
	var T_04_aprendendo : String;
	//Funcionario 05
	var F_05_atributos : Atributos;
	var F_05_especializacao : Especializacoes;
	var F_05_nome : String;
	var F_05_defaultSalary : int;
	var F_05_salary : int;
	var F_05_role : String;
	var F_05_job : String;
	var F_05_workingHours : int;
	var F_05_morale : float;
	var T_05_lock : boolean;
	var T_05_deadline : float;
	var T_05_aprendendo : String;
	//Funcionario 06
	var F_06_atributos : Atributos;
	var F_06_especializacao : Especializacoes;
	var F_06_nome : String;
	var F_06_defaultSalary : int;
	var F_06_salary : int;
	var F_06_role : String;
	var F_06_job : String;
	var F_06_workingHours : int;
	var F_06_morale : float;
	var T_06_lock : boolean;
	var T_06_deadline : float;
	var T_06_aprendendo : String;
	//Funcionario 07
	var F_07_atributos : Atributos;
	var F_07_especializacao : Especializacoes;
	var F_07_nome : String;
	var F_07_defaultSalary : int;
	var F_07_salary : int;
	var F_07_role : String;
	var F_07_job : String;
	var F_07_workingHours : int;
	var F_07_morale : float;
	var T_07_lock : boolean;
	var T_07_deadline : float;
	var T_07_aprendendo : String;
	//Funcionario 08
	var F_08_atributos : Atributos;
	var F_08_especializacao : Especializacoes;
	var F_08_nome : String;
	var F_08_defaultSalary : int;
	var F_08_salary : int;
	var F_08_role : String;
	var F_08_job : String;
	var F_08_workingHours : int;
	var F_08_morale : float;
	var T_08_lock : boolean;
	var T_08_deadline : float;
	var T_08_aprendendo : String;
	
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

// An example where the encoding can be found is at
// http://www.eggheadcafe.com/articles/system.xml.xmlserialization.asp
// We will just use the KISS method and cheat a little and use
// the examples from the web page since they are fully described

// This is our local private members
private var _Save : Rect;
private var _Load : Rect;
private var _SaveMSG : Rect;
private var _LoadMSG : Rect;
private var _FileLocation : String;
private var _FileName : String = "SaveData.xml";

//public GameObject _Player;
var _Player : GameObject;
var _PlayerStats : PlayerStats;
var _Project : Project;
var _Time : GameTime;
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
		//Player money
		_PlayerStats.SetSaldo(myData._iUser.saldo);
		//Game Time
		_Time.SetGameTime(myData._iUser.gameTime);
		//Project
		_Project.SetNome(myData._iUser.nome);
		_Project.SetDescription(myData._iUser.description);
		_Project.SetDeadline(myData._iUser.deadline);
		_Project.SetDeadlineDays(myData._iUser.deadlineDays);
		_Project.SetProjectSize(myData._iUser.maxCodeLines);
		_Project.SetLinguagem(myData._iUser.linguagemProgramacao);
		_Project.SetPagamento(myData._iUser.pagamento);
		_Project.SetBugValue(myData._iUser.bugValue);
		_Project.SetStartDay(myData._iUser.startDay);
		_Project.SetSincronismo(myData._iUser.sincronismo);
		_Project.SetIscomplete(myData._iUser.completed);
		_Project.SetNumBugs(myData._iUser.bugs);
		_Project.SetLinesDone(myData._iUser.codeLinesDone);
		
		//Funcionario01
		_Funcionario01.SetAtributos(myData._iUser.F_01_atributos);
		_Funcionario01.SetEspecializacoes(myData._iUser.F_01_especializacao);
		_Funcionario01.SetNome(myData._iUser.F_01_nome);
		_Funcionario01.SetSalarioDefault(myData._iUser.F_01_defaultSalary);
		_Funcionario01.SetSalario(myData._iUser.F_01_salary);
		_Funcionario01.SetPapel(myData._iUser.F_01_role);
		_Funcionario01.SetCargo(myData._iUser.F_01_job);
		_Funcionario01.SetWorkingHours(myData._iUser.F_01_workingHours);
		_Funcionario01.SetMorale(myData._iUser.F_01_morale);
		_Treinamento01.SetLockEscolha(myData._iUser.T_01_lock);
		_Treinamento01.SetDeadline_Treino(myData._iUser.T_01_deadline);
		_Treinamento01.SetAprendendo(myData._iUser.T_01_aprendendo);
	
		//Funcionario02
		_Funcionario02.SetAtributos(myData._iUser.F_02_atributos);
		_Funcionario02.SetEspecializacoes(myData._iUser.F_02_especializacao);
		_Funcionario02.SetNome(myData._iUser.F_02_nome);
		_Funcionario02.SetSalarioDefault(myData._iUser.F_02_defaultSalary);
		_Funcionario02.SetSalario(myData._iUser.F_02_salary);
		_Funcionario02.SetPapel(myData._iUser.F_02_role);
		_Funcionario02.SetCargo(myData._iUser.F_02_job);
		_Funcionario02.SetWorkingHours(myData._iUser.F_02_workingHours);
		_Funcionario02.SetMorale(myData._iUser.F_02_morale);
		_Treinamento02.SetLockEscolha(myData._iUser.T_02_lock);
		_Treinamento02.SetDeadline_Treino(myData._iUser.T_02_deadline);
		_Treinamento02.SetAprendendo(myData._iUser.T_02_aprendendo);
		//Funcionario03
		_Funcionario03.SetAtributos(myData._iUser.F_03_atributos);
		_Funcionario03.SetEspecializacoes(myData._iUser.F_03_especializacao);
		_Funcionario03.SetNome(myData._iUser.F_03_nome);
		_Funcionario03.SetSalarioDefault(myData._iUser.F_03_defaultSalary);
		_Funcionario03.SetSalario(myData._iUser.F_03_salary);
		_Funcionario03.SetPapel(myData._iUser.F_03_role);
		_Funcionario03.SetCargo(myData._iUser.F_03_job);
		_Funcionario03.SetWorkingHours(myData._iUser.F_03_workingHours);
		_Funcionario03.SetMorale(myData._iUser.F_03_morale);
		_Treinamento03.SetLockEscolha(myData._iUser.T_03_lock);
		_Treinamento03.SetDeadline_Treino(myData._iUser.T_03_deadline);
		_Treinamento03.SetAprendendo(myData._iUser.T_03_aprendendo);
		//Funcionario04
		_Funcionario04.SetAtributos(myData._iUser.F_04_atributos);
		_Funcionario04.SetEspecializacoes(myData._iUser.F_04_especializacao);
		_Funcionario04.SetNome(myData._iUser.F_04_nome);
		_Funcionario04.SetSalarioDefault(myData._iUser.F_04_defaultSalary);
		_Funcionario04.SetSalario(myData._iUser.F_04_salary);
		_Funcionario04.SetPapel(myData._iUser.F_04_role);
		_Funcionario04.SetCargo(myData._iUser.F_04_job);
		_Funcionario04.SetWorkingHours(myData._iUser.F_04_workingHours);
		_Funcionario04.SetMorale(myData._iUser.F_04_morale);
		_Treinamento04.SetLockEscolha(myData._iUser.T_04_lock);
		_Treinamento04.SetDeadline_Treino(myData._iUser.T_04_deadline);
		_Treinamento04.SetAprendendo(myData._iUser.T_04_aprendendo);
		//Funcionario05
		_Funcionario05.SetAtributos(myData._iUser.F_05_atributos);
		_Funcionario05.SetEspecializacoes(myData._iUser.F_05_especializacao);
		_Funcionario05.SetNome(myData._iUser.F_05_nome);
		_Funcionario05.SetSalarioDefault(myData._iUser.F_05_defaultSalary);
		_Funcionario05.SetSalario(myData._iUser.F_05_salary);
		_Funcionario05.SetPapel(myData._iUser.F_05_role);
		_Funcionario05.SetCargo(myData._iUser.F_05_job);
		_Funcionario05.SetWorkingHours(myData._iUser.F_05_workingHours);
		_Funcionario05.SetMorale(myData._iUser.F_05_morale);
		_Treinamento05.SetLockEscolha(myData._iUser.T_05_lock);
		_Treinamento05.SetDeadline_Treino(myData._iUser.T_05_deadline);
		_Treinamento05.SetAprendendo(myData._iUser.T_05_aprendendo);
		//Funcionario06
		_Funcionario06.SetAtributos(myData._iUser.F_06_atributos);
		_Funcionario06.SetEspecializacoes(myData._iUser.F_06_especializacao);
		_Funcionario06.SetNome(myData._iUser.F_06_nome);
		_Funcionario06.SetSalarioDefault(myData._iUser.F_06_defaultSalary);
		_Funcionario06.SetSalario(myData._iUser.F_06_salary);
		_Funcionario06.SetPapel(myData._iUser.F_06_role);
		_Funcionario06.SetCargo(myData._iUser.F_06_job);
		_Funcionario06.SetWorkingHours(myData._iUser.F_06_workingHours);
		_Funcionario06.SetMorale(myData._iUser.F_06_morale);
		_Treinamento06.SetLockEscolha(myData._iUser.T_06_lock);
		_Treinamento06.SetDeadline_Treino(myData._iUser.T_06_deadline);
		_Treinamento06.SetAprendendo(myData._iUser.T_06_aprendendo);
		//Funcionario07
		_Funcionario07.SetAtributos(myData._iUser.F_07_atributos);
		_Funcionario07.SetEspecializacoes(myData._iUser.F_07_especializacao);
		_Funcionario07.SetNome(myData._iUser.F_07_nome);
		_Funcionario07.SetSalarioDefault(myData._iUser.F_07_defaultSalary);
		_Funcionario07.SetSalario(myData._iUser.F_07_salary);
		_Funcionario07.SetPapel(myData._iUser.F_07_role);
		_Funcionario07.SetCargo(myData._iUser.F_07_job);
		_Funcionario07.SetWorkingHours(myData._iUser.F_07_workingHours);
		_Funcionario07.SetMorale(myData._iUser.F_07_morale);
		_Treinamento07.SetLockEscolha(myData._iUser.T_07_lock);
		_Treinamento07.SetDeadline_Treino(myData._iUser.T_07_deadline);
		_Treinamento07.SetAprendendo(myData._iUser.T_07_aprendendo);
		//Funcionario08
		_Funcionario08.SetAtributos(myData._iUser.F_08_atributos);
		_Funcionario08.SetEspecializacoes(myData._iUser.F_08_especializacao);
		_Funcionario08.SetNome(myData._iUser.F_08_nome);
		_Funcionario08.SetSalarioDefault(myData._iUser.F_08_defaultSalary);
		_Funcionario08.SetSalario(myData._iUser.F_08_salary);
		_Funcionario08.SetPapel(myData._iUser.F_08_role);
		_Funcionario08.SetCargo(myData._iUser.F_08_job);
		_Funcionario08.SetWorkingHours(myData._iUser.F_08_workingHours);
		_Funcionario08.SetMorale(myData._iUser.F_08_morale);
		_Treinamento08.SetLockEscolha(myData._iUser.T_08_lock);
		_Treinamento08.SetDeadline_Treino(myData._iUser.T_08_deadline);
		_Treinamento08.SetAprendendo(myData._iUser.T_08_aprendendo);
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
	//Player money
	myData._iUser.saldo = _PlayerStats.GetSaldo();
	//Game Time
	myData._iUser.gameTime = _Time.GetGameTime();
	//Project
	myData._iUser.nome = _Project.GetNome();
	myData._iUser.description = _Project.GetDescription();
	myData._iUser.deadline = _Project.GetDeadline();
	myData._iUser.deadlineDays = _Project.GetDeadlineDays();
	myData._iUser.maxCodeLines = _Project.GetProjectSize();
	myData._iUser.linguagemProgramacao = _Project.GetLinguagem();
	myData._iUser.pagamento = _Project.GetPagamento();
	myData._iUser.bugValue = _Project.GetBugValue();
	myData._iUser.startDay = _Project.GetStartDay();
	myData._iUser.sincronismo = _Project.GetSincronismo();
	myData._iUser.completed = _Project.GetIscomplete();
	myData._iUser.bugs = _Project.GetNumBugs();
	myData._iUser.codeLinesDone = _Project.GetLinesDone();
	
	//Funcionario01
	myData._iUser.F_01_atributos = _Funcionario01.GetAtributos();
	myData._iUser.F_01_especializacao = _Funcionario01.GetEspecializacao();
	myData._iUser.F_01_nome = _Funcionario01.GetNome();
	myData._iUser.F_01_defaultSalary = _Funcionario01.GetSalarioDefault();
	myData._iUser.F_01_salary = _Funcionario01.GetSalario();
	myData._iUser.F_01_role = _Funcionario01.GetPapel();
	myData._iUser.F_01_job = _Funcionario01.GetCargo();
	myData._iUser.F_01_workingHours = _Funcionario01.GetWorkingHours();
	myData._iUser.F_01_morale = _Funcionario01.GetMorale();
	myData._iUser.T_01_lock = _Treinamento01.GetLockEscolha();
	myData._iUser.T_01_deadline = _Treinamento01.GetDeadline_Treino();
	myData._iUser.T_01_aprendendo = _Treinamento01.GetAprendendo();
	//Funcionario02
	myData._iUser.F_02_atributos = _Funcionario02.GetAtributos();
	myData._iUser.F_02_especializacao = _Funcionario02.GetEspecializacao();
	myData._iUser.F_02_nome = _Funcionario02.GetNome();
	myData._iUser.F_02_defaultSalary = _Funcionario02.GetSalarioDefault();
	myData._iUser.F_02_salary = _Funcionario02.GetSalario();
	myData._iUser.F_02_role = _Funcionario02.GetPapel();
	myData._iUser.F_02_job = _Funcionario02.GetCargo();
	myData._iUser.F_02_workingHours = _Funcionario02.GetWorkingHours();
	myData._iUser.F_02_morale = _Funcionario02.GetMorale();
	myData._iUser.T_02_lock = _Treinamento02.GetLockEscolha();
	myData._iUser.T_02_deadline = _Treinamento02.GetDeadline_Treino();
	myData._iUser.T_02_aprendendo = _Treinamento02.GetAprendendo();
	//Funcionario03
	myData._iUser.F_03_atributos = _Funcionario03.GetAtributos();
	myData._iUser.F_03_especializacao = _Funcionario03.GetEspecializacao();
	myData._iUser.F_03_nome = _Funcionario03.GetNome();
	myData._iUser.F_03_defaultSalary = _Funcionario03.GetSalarioDefault();
	myData._iUser.F_03_salary = _Funcionario03.GetSalario();
	myData._iUser.F_03_role = _Funcionario03.GetPapel();
	myData._iUser.F_03_job = _Funcionario03.GetCargo();
	myData._iUser.F_03_workingHours = _Funcionario03.GetWorkingHours();
	myData._iUser.F_03_morale = _Funcionario03.GetMorale();
	myData._iUser.T_03_lock = _Treinamento03.GetLockEscolha();
	myData._iUser.T_03_deadline = _Treinamento03.GetDeadline_Treino();
	myData._iUser.T_03_aprendendo = _Treinamento03.GetAprendendo();
	//Funcionario04
	myData._iUser.F_04_atributos = _Funcionario04.GetAtributos();
	myData._iUser.F_04_especializacao = _Funcionario04.GetEspecializacao();
	myData._iUser.F_04_nome = _Funcionario04.GetNome();
	myData._iUser.F_04_defaultSalary = _Funcionario04.GetSalarioDefault();
	myData._iUser.F_04_salary = _Funcionario04.GetSalario();
	myData._iUser.F_04_role = _Funcionario04.GetPapel();
	myData._iUser.F_04_job = _Funcionario04.GetCargo();
	myData._iUser.F_04_workingHours = _Funcionario04.GetWorkingHours();
	myData._iUser.F_04_morale = _Funcionario04.GetMorale();
	myData._iUser.T_04_lock = _Treinamento04.GetLockEscolha();
	myData._iUser.T_04_deadline = _Treinamento04.GetDeadline_Treino();
	myData._iUser.T_04_aprendendo = _Treinamento04.GetAprendendo();
	//Funcionario01
	myData._iUser.F_05_atributos = _Funcionario05.GetAtributos();
	myData._iUser.F_05_especializacao = _Funcionario05.GetEspecializacao();
	myData._iUser.F_05_nome = _Funcionario05.GetNome();
	myData._iUser.F_05_defaultSalary = _Funcionario05.GetSalarioDefault();
	myData._iUser.F_05_salary = _Funcionario05.GetSalario();
	myData._iUser.F_05_role = _Funcionario05.GetPapel();
	myData._iUser.F_05_job = _Funcionario05.GetCargo();
	myData._iUser.F_05_workingHours = _Funcionario05.GetWorkingHours();
	myData._iUser.F_05_morale = _Funcionario05.GetMorale();
	myData._iUser.T_05_lock = _Treinamento05.GetLockEscolha();
	myData._iUser.T_05_deadline = _Treinamento05.GetDeadline_Treino();
	myData._iUser.T_05_aprendendo = _Treinamento05.GetAprendendo();
	//Funcionario06
	myData._iUser.F_06_atributos = _Funcionario06.GetAtributos();
	myData._iUser.F_06_especializacao = _Funcionario06.GetEspecializacao();
	myData._iUser.F_06_nome = _Funcionario06.GetNome();
	myData._iUser.F_06_defaultSalary = _Funcionario06.GetSalarioDefault();
	myData._iUser.F_06_salary = _Funcionario06.GetSalario();
	myData._iUser.F_06_role = _Funcionario06.GetPapel();
	myData._iUser.F_06_job = _Funcionario06.GetCargo();
	myData._iUser.F_06_workingHours = _Funcionario06.GetWorkingHours();
	myData._iUser.F_06_morale = _Funcionario06.GetMorale();
	myData._iUser.T_06_lock = _Treinamento06.GetLockEscolha();
	myData._iUser.T_06_deadline = _Treinamento06.GetDeadline_Treino();
	myData._iUser.T_06_aprendendo = _Treinamento06.GetAprendendo();
	//Funcionario07
	myData._iUser.F_07_atributos = _Funcionario07.GetAtributos();
	myData._iUser.F_07_especializacao = _Funcionario07.GetEspecializacao();
	myData._iUser.F_07_nome = _Funcionario07.GetNome();
	myData._iUser.F_07_defaultSalary = _Funcionario07.GetSalarioDefault();
	myData._iUser.F_07_salary = _Funcionario07.GetSalario();
	myData._iUser.F_07_role = _Funcionario07.GetPapel();
	myData._iUser.F_07_job = _Funcionario07.GetCargo();
	myData._iUser.F_07_workingHours = _Funcionario07.GetWorkingHours();
	myData._iUser.F_07_morale = _Funcionario07.GetMorale();
	myData._iUser.T_07_lock = _Treinamento07.GetLockEscolha();
	myData._iUser.T_07_deadline = _Treinamento07.GetDeadline_Treino();
	myData._iUser.T_07_aprendendo = _Treinamento07.GetAprendendo();
	//Funcionario08
	myData._iUser.F_08_atributos = _Funcionario08.GetAtributos();
	myData._iUser.F_08_especializacao = _Funcionario08.GetEspecializacao();
	myData._iUser.F_08_nome = _Funcionario08.GetNome();
	myData._iUser.F_08_defaultSalary = _Funcionario08.GetSalarioDefault();
	myData._iUser.F_08_salary = _Funcionario08.GetSalario();
	myData._iUser.F_08_role = _Funcionario08.GetPapel();
	myData._iUser.F_08_job = _Funcionario08.GetCargo();
	myData._iUser.F_08_workingHours = _Funcionario08.GetWorkingHours();
	myData._iUser.F_08_morale = _Funcionario08.GetMorale();
	myData._iUser.T_08_lock = _Treinamento08.GetLockEscolha();
	myData._iUser.T_08_deadline = _Treinamento08.GetDeadline_Treino();
	myData._iUser.T_08_aprendendo = _Treinamento08.GetAprendendo();
		
	// Time to creat our XML!
	_data = SerializeObject(myData);
	// This is the final resulting XML from the serialization process
	CreateXML();
	Debug.Log(_data);
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
   Debug.Log("File written.");
}
   
function LoadXML()
{
   //StreamReader r = File.OpenText(_FileLocation+"\\"+ _FileName);
   var r : StreamReader = File.OpenText(_FileLocation+"/"+ _FileName);
   var _info : String = r.ReadToEnd();
   r.Close();
   _data=_info;
}