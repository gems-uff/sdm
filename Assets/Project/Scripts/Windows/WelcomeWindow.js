

public var project : Project;
public var projectW : ProjectWindow;
public var timer : GameTime;

//Variaveis de controle do dialogo
private var welcome : boolean = true;
private var window01 : boolean = true;
private var window02 : boolean = false;
private var showRoleHelp : boolean = false;
//Variaveis de Dialogo
private var msgWelcome : String;
private var msg02 : String;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

msgWelcome = "Welcome to S.D.M. \n(Software Development Manager) \n" + 
"\n In this game you are able to have 8 employees, where each can perform different roles, like Analyst, Architect, Manager, Marketing, Programmer and Tester. "+
"Your employees have attributes and specialities that can be useful for a certain kind of role. They also possess morale and stamina stats that control his working productivity. If his morale is "+
"too low he can resign.\n" +
"Your objective is to make a software with good quality for a client. The client will pay you monthly.\n" +
"To interact with an employee you need to be near him and press SPACE BAR. Also, you MUST obey the client restrictions, like Programming Language. "+
"To access the game menu press ESC key\n" + 
"That said, good luck with your software.";

msg02 = "Quick Guide\n\n" + 
"Analyst: Validade the software's class diagram with the client \n\n" +
"Architect: Makes a test plan and improve the software's model. Also can make prototypes \n\n"+
"Manager: Aid the analyst, architect, tester and programmer in their jobs. Also responsible for hiring \n\n" +
"Marketing: Aid the analyst during validation and generate some income each day. Also is responsibe for negotiations with the client \n\n" +
"Programmer: Generate code lines for the software and inadvertly put bugs \n\n"+
"Tester: Remove the bugs in the software with the aid of the architect's plans \n\n" +
"\n" +
"";
function WindowFunction(windowID : int){
	timer.PauseGame();
	if(window01)
	{
		GUI.Box (Rect (02,018,296,350), (msgWelcome), customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			window01 = false;
			window02 = true;
		}
	}
	if(window02)
	{
		GUI.Box (Rect (02,018,296,350), (msg02), customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			window02 = false;
			welcome = false;
			projectW.SetShowWindow(project, true);
		}
	}
}


function ShowRoleHelp()
{
	GUI.Box (Rect (02,018,296,350), (msg02), customGuiStyle);
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		showRoleHelp = false;
	}
}

function ShowRoleHelpWindow()
{
	showRoleHelp = true;
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(welcome)
		windowRect = GUI.Window (5, windowRect, WindowFunction, "Welcome");
	if(showRoleHelp)
		windowRect = GUI.Window (5, windowRect, ShowRoleHelp, "Help");
}