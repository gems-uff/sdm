
public var pauseStyle : GUIStyle;
public var GameSaver : SaveGame;
public var LogExport : ExportLogFile;
public var ingameMenuToggle 	: boolean = false;
public var icon : Texture2D;
//public var welcomeWindow : WelcomeWindow;
public var playStyle : GameplayStyle;
//public var bugsWindow : BugsWindow;
public var windowController : WindowController;
//public var equipe : Equipe;
public var logWindow : LogWindow;
public var managerPlanner : ManagerPlanner;
public var provenance : ProvenanceController;
/*
private var TIMESLOW : float = 2.0;
private var TIMENORMAL : float = 1.0;
private var TIMEFAST : float = 0.5;
private var TIMEVERYFAST : float = 0.25;
private var TIMEHYPERFAST : float = 0.125;
*/
private var saldoText = "";
private var timeText = "";
private var deadlineText = "";
private var bugsText = "";
private var completedText = "";
private var sincronismoText = "";
private var modelText = "";
private var reqlingText = "";
private var qualityText = "";
private var valorMensalText = "";

private var equipeObj : GameObject;
private var equipe : Equipe;
private var timerObj : GameObject;
private var timer : GameTime;
private var project : Project;
private var playerstats : PlayerStats;

private var myStyle : GUIStyle = new GUIStyle();
myStyle.alignment = TextAnchor.MiddleCenter;
myStyle.normal.textColor = Color.white;


//--------------------------------------------StatusProj-----------------------------------------------------------

//Funcao que exibe os detalhes do andamento do projeto na HUD
function StatusProjeto()	{
	saldoText = "$ " + playerstats.GetSaldo().ToString();
	//timeText = timer.GetTime().ToString();
	timeText = timer.GetTimeDaysString();
	deadlineText = project.GetDeadLine().ToString();
	bugsText = parseInt(project.GetTotalBugsFound() - project.GetTotalBugsRepaired()).ToString();
	completedText = (project.GetFractionDone().ToString() + " %");
	modelText = (parseInt(project.GetRequirements()).ToString() + " %");
	sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
	reqlingText = project.GetLinguagem ();
	//qualityText = (project.GetCodeQuality () * 100).ToString() + " %";
	qualityText = (Mathf.Round(project.GetCodeQuality() * 100f) * 0.01).ToString() + " %";
	valorMensalText = "$ " + (parseInt(project.GetPagamento()).ToString());
	
	GUI.BeginGroup(Rect (00,Screen.height - 75,1020,200));
	GUI.Box (Rect (00,00,90,25), "Credits");
	GUI.Box (Rect (00,25,90,25), "Monthly Inc.");
	GUI.Box (Rect (90,00,130,25), saldoText);
	GUI.Box (Rect (90,25,130,25), valorMensalText);
	
	GUI.Box (Rect (220,00,90,25), "Time");
	GUI.Box (Rect (220,25,90,25), "Deadline");
	GUI.Box (Rect (310,00,130,25), timeText);
	GUI.Box (Rect (310,25,130,25), deadlineText);
	
	GUI.Box (Rect (220,50,90,25), "Prototypes");
	GUI.Box (Rect (310,50,130,25), project.GetPrototype().ToString());
	
	GUI.Box (Rect (440,00,90,25), "Req. Done");
	GUI.Box (Rect (530,00,90,25), completedText);
	GUI.Box (Rect (440,25,90,25), "Req. Modeled");
	GUI.Box (Rect (530,25,90,25), modelText);
	GUI.Box (Rect (440,50,90,25), "Client's Req.");
	GUI.Box (Rect (530,50,90,25), sincronismoText);
	
	GUI.Box (Rect (620,00,90,25), "# bugs");
	GUI.Box (Rect (620,25,90,25), "Code Lang.");
	GUI.Box (Rect (620,50,90,25), "Quality");
	GUI.Box (Rect (710,00,90,25), bugsText);
	GUI.Box (Rect (710,25,90,25), reqlingText);
	GUI.Box (Rect (710,50,90,25), qualityText);

	GUI.EndGroup ();
}

//--------------------------------------------Gamespeed-----------------------------------------------------------

//Funcao que permite alterar o gamespeed do jogo
function GameSpeed()	{
	GUI.BeginGroup(Rect (Screen.width - 200,Screen.height - 60,1000,150));
	if(timer.GetRepeatTime() != 0)
		if (GUI.Button (Rect (00, 00, 50, 50), "Pause"))
			timer.PauseGame();
	if(timer.GetRepeatTime() == 0)
	{
		GUI.Box (Rect (00, 00, 50, 50), "");
		GUI.Label (Rect (00, 00, 50, 50), "Pause", myStyle);
	}
	//If it is on Macro game style, then the player can not pass the time while no manager is assigned
	if(equipe.GetHasManager() == false)//(playStyle.IsMacro() == true)&& equipe.GetHasManager() == false)
	{
		GUI.Box (Rect (50, 00, 50, 50), "");
		GUI.Label (Rect (50, 00, 50, 50), "Next \n Day", myStyle);
		GUI.Box (Rect (100,00, 80, 25), "Continuous");
		GUI.Box (Rect (100,25, 80, 25), "Fast");
	}
	else
	{
		if(timer.GetRepeatTime() != timer.GetTimeN())
			if (GUI.Button (Rect (50, 00, 50, 50), "Next \n Day"))
				timer.SpeedNormal();
		if(timer.GetRepeatTime() == timer.GetTimeN())
		{
			GUI.Box (Rect (50, 00, 50, 50), "");
			GUI.Label (Rect (50, 00, 50, 50), "Next \n Day", myStyle);
		}
		if(timer.GetRepeatTime() != timer.GetTimeF())
			if (GUI.Button (Rect (100,00, 80, 25), "Continuous"))
				timer.SpeedFast();
		if(timer.GetRepeatTime() == timer.GetTimeF())
			GUI.Box (Rect (100,00, 80, 25), "Continuous");
		
		if(timer.GetRepeatTime() != timer.GetTimeVF())
			if (GUI.Button (Rect (100,25, 80, 25), "Fast"))
				timer.SpeedVeryFast();
		if(timer.GetRepeatTime() == timer.GetTimeVF())
			GUI.Box (Rect (100,25, 80, 25), "Fast");
	}
	
	GUI.EndGroup ();
	if (timer.GetRepeatTime() == 0)
		GUI.Box (Rect (20,440,100,50), "PAUSED", pauseStyle);
}

//--------------------------------------------ESCPressed-----------------------------------------------------------

//Funcao que captura quando a tecla ESC eh precionada
function EscapePressed()	{
	if (!ingameMenuToggle)	//Se Menu aberto entao pausa
	{
		ingameMenuToggle = true;
	}
	
	else //Senao despausa
	{
		ingameMenuToggle = false;
	}
}

//--------------------------------------------MainMenu-----------------------------------------------------------

//Funcao da Main Menu
function MainMenu(){
	if (ingameMenuToggle)	
	{
	//Work-around: Need to check why dont work !
		if (GUI.Button (Rect (Screen.width - 100,100,100,50), icon)) {
			print ("Made with Unity 3d");
		}

		if (GUI.Button (Rect (Screen.width - 100,150, 100, 20), "1: Quit")) {
			//Application.LoadLevel ("StartMenu");
			Application.Quit();
		}
		/*
		if (GUI.Button (Rect (Screen.width - 100,170, 100, 20), "2: Save")) {
			GameSaver.SaveGame();
			ingameMenuToggle = false;
		}
		if (GUI.Button (Rect (Screen.width - 100,190, 100, 20), "3: Load")) {
			GameSaver.LoadGame();
			ingameMenuToggle = false;
		}
		*/
		if (GUI.Button (Rect (Screen.width - 100,210, 100, 20), "4: Help")) {
			windowController.ShowRoleHelpWindow();
			ingameMenuToggle = false;
		}
		if (GUI.Button( Rect (Screen.width - 100,230,100,20), "5: Statistics") )
		{
			playerstats.ShowStatistics();
			ingameMenuToggle = false ;
		}
		
		if (GUI.Button( Rect (Screen.width - 100,250,100,20), "6: Staff Report") )
		{
			equipe.ShowReport();
			ingameMenuToggle = false ;
		}
		
		if (GUI.Button( Rect (Screen.width - 100,270,100,20), "7: Bugs Report") )
		{
			//bugsWindow.ShowBugWindow();
			windowController.ShowBugWindow();
			ingameMenuToggle = false ;
		}
		if (GUI.Button( Rect (Screen.width - 100,290,100,20), "8: Action Log") )
		{
			//bugsWindow.ShowBugWindow();
			logWindow.ShowLogWindow();
			ingameMenuToggle = false ;
		}
		//if (GUI.Button( Rect (Screen.width - 100,310,100,20), "9: Planner") )
		if (GUI.Button( Rect (Screen.width - 100,310,100,20), "9: XMLExport") )
		{
			//ingameMenuToggle = false ;
			//managerPlanner.ShowPlannerWindow();
			provenance.Save("provenancedata");
		}
		
		if (GUI.Button( Rect (Screen.width - 100,330,100,20), "10: Export") )
		{
			//ingameMenuToggle = false ;
			LogExport.exportLog();
		}
		if (GUI.Button( Rect (Screen.width - 100,350,100,20), "11: Resume") )
		{
			ingameMenuToggle = false ;
		}
		if (GUI.Button( Rect (Screen.width - 100,370,100,20), "12: TestCases") )
		{
			//ingameMenuToggle = false ;
			project.testCases.Window();
		}
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	project = GetComponentInChildren(Project);
	playerstats = GetComponentInChildren(PlayerStats);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------Update-----------------------------------------------------------

//Funcao da unity de updates
function Update(){
	if (Input.GetKeyDown (KeyCode.Escape )) //Se pressiono ESC
	{
		EscapePressed();
	}
}
	

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Exibe o Main Menu
	MainMenu();
	//Exibe a janela de status do projeto
	StatusProjeto();
	//MenuGamespeed
	GameSpeed();
}

	