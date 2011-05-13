

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

msgWelcome = "Welcome to S.D.M. \n(Software Development Manager) \n" + 
"\n In this game you are able to have 8 employees, where each can perform different roles, like Analyst, Architect, Manager, Marketing, Programmer and Tester. "+
"Your employees have attributes and specialities that can be useful for a certain kind of role. They also possess a morale stat that control his working productivity. If his morale is "+
"too low he can resign.\n" +
"Your objective is to make a software with good quality for a client. While you are developing it, the client will pay you monthly.\n" +
"To interact with an employee you need to be near him and press SPACE BAR. Also, you MUST obey the client restrictions, like Programming Language. \n" + 
"That said, good luck with your software.";

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), (msgWelcome), customGuiStyle);
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		welcome  = true;
		projectW.SetShowWindow(project, true);
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