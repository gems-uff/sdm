
public var dialogGuiStyle : GUIStyle;
private var func : Funcionario;
private var treino : Treinamento;
private var menuAtr : FuncWindow;
private var menuEsp : EspWindow;
private var menuPapel : PapelWindow;
private var menuObj : GameObject;
private var timerObj : GameObject;
private var timer : GameTime;
private var workHours : WorkingHoursWindow;



public var endOnExit : boolean = true;
private var gameobj : GameObject; 
private var dialogEnable : boolean = false;
private var msgDialogOptions : boolean = false;
private var msgDialog7 : boolean = false;



//--------------------------------------------OnTriggerEnter-----------------------------------------------------------

function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" )
	{
		dialogEnable = true;
		msgDialogOptions = true;
	}
}

//--------------------------------------------OnTriggerExit-----------------------------------------------------------

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
		dialogEnable = false;
		msgDialogStart = false;
		timer.SpeedNormal();
	}
}

//--------------------------------------------Dialog_Funcionario-----------------------------------------------------------

function Dialog_Funcionario (){
	GUI.BeginGroup(Rect (300,Screen.height - 190,1000,1000));
	if (dialogEnable == true)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		if( msgDialogOptions == true)	//Dialog Options
		{
			GUI.Box (Rect (00,25,600,150), "Hello boss. What's up ?", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Profile")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					menuAtr.SetJanelatributo(func);
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,50, 130, 25), "Train")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					menuEsp.Especializar(func, treino);
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,75, 130, 25), "Change Task")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					menuPapel.MudarPapel(func, treino);
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,100, 130, 25), "Working Hours")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					workHours.ChangeWorkHours(func);
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,125, 130, 25), "Option5 <FAZER>")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					//Chama algo
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,150, 130, 25), "End")) {
					msgDialogOptions = false;
					timer.SpeedNormal();
					dialogEnable = false;
			}
		}
	}
	GUI.EndGroup ();
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake() 
{ 
	gameobj =GameObject.Find("Player"); 
	menuObj = GameObject.Find("GUI");
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	menuAtr = menuObj.GetComponent(FuncWindow);
	menuEsp = menuObj.GetComponent(EspWindow);
	menuPapel = menuObj.GetComponent(PapelWindow);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
	workHours = menuObj.GetComponent(WorkingHoursWindow);
} 

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI (){
	Dialog_Funcionario();
}


/*

//Template de dialogos

if( msgDialog1 == true)
		{
			GUI.Box (Rect (00,25,600,150), "DIALOG", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "CONTINUE")) {
					CONTINUE = false;
					Option2 = true;
			}
			if (GUI.Button (Rect (600,50, 130, 25), "Option2")) {
					Option2 = false;
					msgDialog1 = false;
			}
			if (GUI.Button (Rect (600,75, 130, 25), "Option3")) {
					Option3 = false;
					msgDialog1 = true;
			}
			if (GUI.Button (Rect (600,100, 130, 25), "Option4")) {
					Option4 = false;
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,125, 130, 25), "Option5")) {
					Option5 = false;
					msgDialog1 = true;
			}
			if (GUI.Button (Rect (600,150, 130, 25), "END")) {
					END = false;
					dialogEnable = false;
			}
		}
*/