
public var pauseStyle : GUIStyle;
public var GameSaver : SaveGame;
public var ingameMenuToggle 	: boolean = false;
public var icon : Texture2D;

private var TIMESLOW : float = 2.0;
private var TIMENORMAL : float = 1.0;
private var TIMEFAST : float = 0.5;
private var TIMEVERYFAST : float = 0.25;
private var TIMEHYPERFAST : float = 0.125;

private var saldoText = "";
private var timeText = "";
private var deadlineText = "";
private var bugsText = "";
private var completedText = "";
private var sincronismoText = "";
private var reqlingText = "";
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
	timeText = timer.GetTime().ToString();
	deadlineText = project.GetDeadLine().ToString();
	bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
	completedText = (project.GetFractionDone().ToString() + " %");
	sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
	reqlingText = project.GetLinguagem ();
	valorMensalText = "$ " + (parseInt(project.GetPagamento()).ToString());
	
	GUI.BeginGroup(Rect (00,Screen.height - 50,1020,200));
	GUI.Box (Rect (00,00,90,25), "Money");
	GUI.Box (Rect (00,25,90,25), "Monthly Inc.");
	GUI.Box (Rect (90,00,130,25), saldoText);
	GUI.Box (Rect (90,25,130,25), valorMensalText);
	
	GUI.Box (Rect (220,00,90,25), "Time");
	GUI.Box (Rect (220,25,90,25), "Deadline");
	GUI.Box (Rect (310,00,130,25), timeText);
	GUI.Box (Rect (310,25,130,25), deadlineText);
	
	GUI.Box (Rect (440,00,90,25), "% complete");
	GUI.Box (Rect (440,25,90,25), "Validation");
	GUI.Box (Rect (530,00,90,25), completedText);
	GUI.Box (Rect (530,25,90,25), sincronismoText);
	
	GUI.Box (Rect (620,00,90,25), "# bugs");
	GUI.Box (Rect (620,25,90,25), "Req. Code");
	GUI.Box (Rect (710,00,90,25), bugsText);
	GUI.Box (Rect (710,25,90,25), reqlingText);

	GUI.EndGroup ();
}

//--------------------------------------------Gamespeed-----------------------------------------------------------

//Funcao que permite alterar o gamespeed do jogo
function GameSpeed()	{
	GUI.BeginGroup(Rect (Screen.width - 400,Screen.height - 60,1000,150));
	//GUI.Box (Rect (00,00,90,50), "Game Speed:");
	if(timer.GetRepeatTime() != 0)
		if (GUI.Button (Rect (90, 00, 90, 50), "Pause"))
			timer.PauseGame();
	if(timer.GetRepeatTime() == 0)
	{
		GUI.Box (Rect (90, 00, 90, 50), "");
		GUI.Label (Rect (90, 00, 90, 50), "Pause", myStyle);
	}
	if(timer.GetRepeatTime() != timer.GetTimeN())
		if (GUI.Button (Rect (180, 00, 90, 50), "Play"))
			timer.SpeedNormal();
	if(timer.GetRepeatTime() == timer.GetTimeN())
	{
		GUI.Box (Rect (180, 00, 90, 50), "");
		GUI.Label (Rect (180, 00, 90, 50), "Play", myStyle);
	}
	if(timer.GetRepeatTime() != timer.GetTimeF())
		if (GUI.Button (Rect (270,00, 90, 25), "Fast"))
			timer.SpeedFast();
	if(timer.GetRepeatTime() == timer.GetTimeF())
		GUI.Box (Rect (270,00, 90, 25), "Fast");
	
	if(timer.GetRepeatTime() != timer.GetTimeVF())
		if (GUI.Button (Rect (270,25, 90, 25), "Fastest"))
			timer.SpeedVeryFastl();
	if(timer.GetRepeatTime() == timer.GetTimeVF())
		GUI.Box (Rect (270,25, 90, 25), "Fastest");
		
	/*
	if(timer.GetRepeatTime() != timer.GetTimeVF())
		if (GUI.Button (Rect (450, 00, 90, 25), "Very Fast"))
					timer.SpeedVeryFastl();
	if(timer.GetRepeatTime() == timer.GetTimeVF())
		GUI.Box (Rect (450, 00, 90, 25), "Very Fast");
	if(timer.GetRepeatTime() != timer.GetTimeHF())
		if (GUI.Button (Rect (540, 00, 90, 25), "Hyper Fast"))
					timer.SpeedHyperFast();
	if(timer.GetRepeatTime() == timer.GetTimeHF())
		GUI.Box (Rect (540, 00, 90, 25), "Hyper Fast");
	*/
	GUI.EndGroup ();
	if (timer.GetRepeatTime() == 0)
		GUI.Box (Rect (20,400,100,50), "PAUSED", pauseStyle);
}

//--------------------------------------------ESCPressed-----------------------------------------------------------

//Funcao que captura quando a tecla ESC eh precionada
function EscapePressed()	{
	if (!ingameMenuToggle)	//Se Menu aberto entao pausa
	{
		ingameMenuToggle = true;
		//Screen.lockCursor = false;
		//Time.timeScale = 0 ;	// pauze
	}
	
	else //Senao despausa
	{
		//Screen.lockCursor = true;
		ingameMenuToggle = false;
		//helpMenuToggle = false;
		//scoreboardToggle = false;
		//Time.timeScale = TIMENORMAL ;	// unPause,
	}
}

//--------------------------------------------MainMenu-----------------------------------------------------------

//Funcao da Main Menu
function MainMenu(){
	if (ingameMenuToggle)	
	{
	//Work-around: Need to check why dont work !
		if (GUI.Button (Rect (Screen.width - 100,0,100,50), icon)) {
				print ("Made with Unity 3d");
		}

		if (GUI.Button (Rect (Screen.width - 100,50, 100, 20), "1: Quit")) {
				//Application.LoadLevel ("StartMenu");
				Application.Quit();
		}
		if (GUI.Button (Rect (Screen.width - 100,70, 100, 20), "2: Save")) {
				GameSaver.SaveGame();
		}
		if (GUI.Button (Rect (Screen.width - 100,90, 100, 20), "3: Load")) {
				GameSaver.LoadGame();
		}
		if (GUI.Button( Rect (Screen.width - 100,110,100,20), "4: Resume") )
		{
			ingameMenuToggle = false ;
			//Time.timeScale = TIMESCALE ;
			//Screen.lockCursor = true;
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
	/*if (Input.GetButtonDown ("Helpmenu")) // Helpmenu == H button in key setup
	{
		HelpMenuCall();
	}
	
	if (Input.GetButtonDown ("scoreboard")) // Helpmenu == tab button in key setup
	{
		ScoreBoardCall();
	}*/
	
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

	