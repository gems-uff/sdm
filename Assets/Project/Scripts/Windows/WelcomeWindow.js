
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

msgWelcome = "\n Bem vindo, \n \n <Fazer texto introdutorio> \n <Fazer o texto>";

function Welcome(){
	if (!welcome)
	{
		timer.PauseGame();
		GUI.BeginGroup(Rect (350,125,400,375));
		GUI.Box (Rect (0,0,300,350), (msgWelcome), customGuiStyle);
		if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
		{
			welcome  = true;
			projectW.SetShowWindow();
			timer.SpeedNormal();
		}
		GUI.EndGroup ();
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
	Welcome();
}