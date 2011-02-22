
public var hudGuiStyle : GUIStyle;

private var TIMESCALE : float = 0.5;

public var timepaused				: boolean = false;
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
private var project : Project;
private var playerstats : PlayerStats;



//--------------------------------------------StatusProj-----------------------------------------------------------

//Funcao que exibe os detalhes do andamento do projeto na HUD
function StatusProjeto()	{
	saldoText = playerstats.GetSaldo().ToString();
	timeText = project.GetTime().ToString();
	deadlineText = project.GetDeadLine().ToString();
	bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
	completedText = (project.GetNumLinesDone().ToString() + " %");
	sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
	reqlingText = project.GetLinguagem ();
	valorMensalText = (parseInt(project.GetPagamento()).ToString());
	
	GUI.BeginGroup(Rect (00,00,220,200));
	GUI.Box (Rect (00,00,90,25), "Saldo");
	GUI.Box (Rect (00,25,90,25), "Time");
	GUI.Box (Rect (00,50,90,25), "Deadline");
	GUI.Box (Rect (00,75,90,25), "% concluido");
	GUI.Box (Rect (00,100,90,25), "# bugs");
	GUI.Box (Rect (00,125,90,25), "Sincronismo");
	GUI.Box (Rect (00,150,90,25), "Req. Codigo");
	GUI.Box (Rect (00,175,90,25), "Valor Mensal");
	
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
	GUI.BeginGroup(Rect (00,250,130,120));
	if (GUI.Button (Rect (00,00, 130, 20), "Pause Game")) {
				Time.timeScale = 0 ;
	}
	if (GUI.Button (Rect (00,25, 130, 20), "Game Speed: x1")) {
				Time.timeScale = TIMESCALE ;
	}
	if (GUI.Button (Rect (00,50, 130, 20), "Game Speed: x2")) {
				Time.timeScale = TIMESCALE * 2 ;
	}
	if (GUI.Button (Rect (00,75, 130, 20), "Game Speed: x4")) {
				Time.timeScale = TIMESCALE * 4 ;
	}
	if (GUI.Button (Rect (00,100, 130, 20), "Game Speed: x8")) {
				Time.timeScale = TIMESCALE * 8 ;
	}
	GUI.EndGroup ();
	if (Time.timeScale == 0)
		GUI.Box (Rect (350,400,600,50), "PAUSED", hudGuiStyle);
}

//--------------------------------------------ESCPressed-----------------------------------------------------------

//Funcao que captura quando a tecla ESC eh precionada
function EscapePressed()	{
	if (!ingameMenuToggle)	//Se Menu aberto entao pausa
	{
		ingameMenuToggle = true;
		Screen.lockCursor = false;
		Time.timeScale = 0 ;	// pauze
	}
	
	else //Senao despausa
	{
		Screen.lockCursor = true;
		ingameMenuToggle = false;
		//helpMenuToggle = false;
		//scoreboardToggle = false;
		Time.timeScale = TIMESCALE ;	// unPause,
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
				Application.LoadLevel ("StartMenu");
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
			Time.timeScale = TIMESCALE ;
			Screen.lockCursor = true;

		}
	}
}


//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	project = GetComponentInChildren(Project);
	playerstats = GetComponentInChildren(PlayerStats);
	Time.timeScale = TIMESCALE;
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

	