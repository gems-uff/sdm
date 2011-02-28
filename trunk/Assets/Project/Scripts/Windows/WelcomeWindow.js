
//Usa Time.timeScale = 0.5;

private var project : Project;
private var projectW : ProjectWindow;
private var timerObj : GameObject;
private var timer : GameTime;

//Variaveis de controle do dialogo
private var welcome : boolean = false;
//Variaveis de Dialogo
public var msgWelcome : String;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (350,125,300,395);

msgWelcome = "\n Bem vindo, \n \n <Fazer texto introdutorio> \n <Fazer o texto>";

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), (msgWelcome), customGuiStyle);
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		welcome  = true;
		projectW.SetShowWindow();
		timer.SpeedNormal();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
	projectW = GetComponentInChildren(ProjectWindow);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(!welcome)
		windowRect = GUI.Window (5, windowRect, WindowFunction, "Welcome");
}