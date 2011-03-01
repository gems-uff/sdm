
public var pauseStyle : GUIStyle;

private var TIMESLOW : float = 2.0;
private var TIMENORMAL : float = 1.0;
private var TIMEFAST : float = 0.5;
private var TIMEVERYFAST : float = 0.25;
private var TIMEHYPERFAST : float = 0.125;


public var ingameMenuToggle 	: boolean = false;
//var helpMenuToggle 		: boolean = false;
//var scoreboardToggle		: boolean = false;

public var icon : Texture2D;

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



//--------------------------------------------StatusProj-----------------------------------------------------------

//Funcao que exibe os detalhes do andamento do projeto na HUD
function StatusProjeto()	{
	saldoText = "$ " + playerstats.GetSaldo().ToString();
	timeText = timer.GetTime().ToString();
	deadlineText = project.GetDeadLine().ToString();
	bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
	completedText = (project.GetNumLinesDone().ToString() + " %");
	sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
	reqlingText = project.GetLinguagem ();
	valorMensalText = "$ " + (parseInt(project.GetPagamento()).ToString());
	
	GUI.BeginGroup(Rect (00,00,220,200));
	GUI.Box (Rect (00,00,90,25), "Money");
	GUI.Box (Rect (00,25,90,25), "Time");
	GUI.Box (Rect (00,50,90,25), "Deadline");
	GUI.Box (Rect (00,75,90,25), "% complete");
	GUI.Box (Rect (00,100,90,25), "# bugs");
	GUI.Box (Rect (00,125,90,25), "Synchronism");
	GUI.Box (Rect (00,150,90,25), "Req. Code");
	GUI.Box (Rect (00,175,90,25), "Monthly Inc.");
	
	GUI.Box (Rect (90,00,130,25), saldoText);
	GUI.Box (Rect (90,25,130,25), timeText);
	GUI.Box (Rect (90,50,130,25), deadlineText);
	GUI.Box (Rect (90,75,130,25), completedText);
	GUI.Box (Rect (90,100,130,25), bugsText);
	GUI.Box (Rect (90,125,130,25), sincronismoText);
	GUI.Box (Rect (90,150,130,25), reqlingText);
	GUI.Box (Rect (90,175,130,25), valorMensalText);
	GUI.EndGroup ();
}

//--------------------------------------------Gamespeed-----------------------------------------------------------

//Funcao que permite alterar o gamespeed do jogo
function GameSpeed()	{
	GUI.BeginGroup(Rect (00,250,150,150));
	if(timer.GetRepeatTime() != 0)
		if (GUI.Button (Rect (00,00, 150, 25), "Pause Game"))
					timer.PauseGame();
	if(timer.GetRepeatTime() == 0)
		GUI.Box (Rect (00,00, 150, 25), "Pause Game");
	
	if(timer.GetRepeatTime() != timer.GetTimeS())
		if (GUI.Button (Rect (00,25, 150, 25), "Game Spd: Slow"))
				timer.SpeedSlow();
	if(timer.GetRepeatTime() == timer.GetTimeS())
		GUI.Box (Rect (00,25, 150, 25), "Game Spd: Slow");
	
	if(timer.GetRepeatTime() != timer.GetTimeN())
		if (GUI.Button (Rect (00,50, 150, 25), "Game Spd: Normal"))
					timer.SpeedNormal();
	if(timer.GetRepeatTime() == timer.GetTimeN())
		GUI.Box (Rect (00,50, 150, 25), "Game Spd: Normal");
	
	if(timer.GetRepeatTime() != timer.GetTimeF())
		if (GUI.Button (Rect (00,75, 150, 25), "Game Spd: Fast"))
					timer.SpeedFast();
	if(timer.GetRepeatTime() == timer.GetTimeF())
		GUI.Box (Rect (00,75, 150, 25), "Game Spd: Fast");
	
	if(timer.GetRepeatTime() != timer.GetTimeVF())
		if (GUI.Button (Rect (00,100, 150, 25), "Game Spd: Very Fast"))
					timer.SpeedVeryFastl();
	if(timer.GetRepeatTime() == timer.GetTimeVF())
		GUI.Box (Rect (00,100, 150, 25), "Game Spd: Very Fast");
	
	if(timer.GetRepeatTime() != timer.GetTimeHF())
		if (GUI.Button (Rect (00,125, 150, 25), "Game Spd: Hyper Fast"))
					timer.SpeedHyperFast();
	if(timer.GetRepeatTime() == timer.GetTimeHF())
		GUI.Box (Rect (00,125, 150, 25), "Game Spd: Hyper Fast");
	
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
		if (GUI.Button (Rect (Screen.width - 100,70, 100, 20), "2: Help")) {
				//Fazer o Help
		}
		/*
		if (Input.GetKeyDown("1")){
			Application.LoadLevel ("StartMenu");
		}
		if (Input.GetKeyDown("2")){
			ingameMenuToggle = false ;
			Time.timeScale = 1 ;
			Screen.lockCursor = true;
		}
		*/
		if (GUI.Button( Rect (Screen.width - 100,90,100,20), "3: Resume") )
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

	