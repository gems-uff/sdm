

public var project : Project;
public var projectW : ProjectWindow;
public var timer : GameTime;

//Variaveis de controle do dialogo
private var welcome : boolean = false;
//Variaveis de Dialogo
public var msgWelcome : String;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

msgWelcome = "\n\nWelcome to S.D.M. \n(Software Development Manager) \n" + 
"\n In this game you are able to have 8 employees, where each can perform different roles, like Analist, Architect, Manager, Marketing, Programmer and Tester. "+
"Your employees have attributes and specialities that can be useful for a certain kind of role. They also possess a morale stat that control his working produtivity. If his morale is "+
"too low he can resign.\n" +
"Your objective is to make a software for a client. While you are developing it, the client will pay you monthly.\n" +
"That said, good luck with your software.";

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), (msgWelcome), customGuiStyle);
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		welcome  = true;
		projectW.SetShowWindow(project);
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(!welcome)
		windowRect = GUI.Window (5, windowRect, WindowFunction, "Welcome");
}