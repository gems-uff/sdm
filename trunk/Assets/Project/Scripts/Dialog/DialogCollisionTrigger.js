
public var dialogGuiStyle : GUIStyle;
private var func : Funcionario;
private var treino : Treinamento;
private var menuAtr : FuncWindow;
private var menuEsp : EspWindow;
private var menuPapel : PapelWindow;
private var menuObj : GameObject;

private var TIMESCALE : float = 0.5;

public var endOnExit : boolean = true;
private var gameobj : GameObject; 
private var dialogEnable : boolean = false;
private var msgDialogStart : boolean = false;
private var msgDialogOptions : boolean = false;
private var msgDialogProfile : boolean = false;
private var msgDialogTrain : boolean = false;
private var msgDialogTask : boolean = false;
private var msgDialogOption4 : boolean = false;
private var msgDialogOption5 : boolean = false;
private var msgDialog7 : boolean = false;
private var msgDialogEnd : boolean = false;

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
} 

//--------------------------------------------OnTriggerEnter-----------------------------------------------------------

function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" )
	{
		dialogEnable = true;
		msgDialogStart = true;
	}
}

//--------------------------------------------OnTriggerExit-----------------------------------------------------------

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
		dialogEnable = false;
		msgDialogStart = false;
	}
}

//--------------------------------------------Dialog_Funcionario-----------------------------------------------------------

function Dialog_Funcionario (){
	GUI.BeginGroup(Rect (300,600,1000,1000));
	if (dialogEnable == true)
	{
		Time.timeScale = 0;	//Pausa o jogo para o dialogo
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		
		if( msgDialogStart == true)	//Start Dialog
		{
			GUI.Box (Rect (00,25,600,150), "Hello boss.", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Continue")) {
					msgDialogStart = false;
					msgDialogOptions = true;
			}
			if (GUI.Button (Rect (600,50, 130, 25), "End")) {
					msgDialogStart = false;
					msgDialogEnd = true;
			}
		}
		if( msgDialogOptions == true)	//Dialog Options
		{
			GUI.Box (Rect (00,25,600,150), "What's up ?", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Profile")) {
					msgDialogOptions = false;
					msgDialogProfile = true;
			}
			if (GUI.Button (Rect (600,50, 130, 25), "Train")) {
					msgDialogOptions = false;
					msgDialogTrain = true;
			}
			if (GUI.Button (Rect (600,75, 130, 25), "Change Task")) {
					msgDialogOptions = false;
					msgDialogTask = true;
			}
			if (GUI.Button (Rect (600,100, 130, 25), "Option4 <FAZER>")) {
					msgDialogOptions = false;
					//msgDialogOption4 = true;
					msgDialogEnd = true;
			}
			if (GUI.Button (Rect (600,125, 130, 25), "Option5 <FAZER>")) {
					msgDialogOptions = false;
					//msgDialogOption5 = true;
					msgDialogEnd = true;
			}
			if (GUI.Button (Rect (600,150, 130, 25), "End")) {
					msgDialogOptions = false;
					msgDialogEnd = true;
			}
		}
		
		if( msgDialogProfile == true) //Profile
		{
			GUI.Box (Rect (00,25,600,150), "Here is my profile", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Continue")) {
					msgDialogProfile = false;
					dialogEnable = false;
					//Call func_window
					menuAtr.SetJanelatributo(func.GetAtributos(), func.GetEspecializacao(), func.GetNome(), func.GetPapel(),func.GetSalario());
					Time.timeScale = TIMESCALE;
			}
		}
		
		if( msgDialogTrain == true)	//Train
		{
			GUI.Box (Rect (00,25,600,150), "Ok boss. Which one should i train ?", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Continue")) {
					msgDialogTrain = false;
					dialogEnable = false;
					menuEsp.Especializar(func, treino);
					Time.timeScale = TIMESCALE;
			}
		}
		
		if( msgDialogTask == true) //Change Task
		{
			GUI.Box (Rect (00,25,600,150), "Ok, which job you want me to do now ?", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "Continue")) {
					msgDialogTask = false;
					dialogEnable = false;
					//Call Change task window
					menuPapel.MudarPapel(func);
					Time.timeScale = TIMESCALE;
			}
		}
		
		if( msgDialogEnd == true)
		{
			GUI.Box (Rect (00,25,600,150), "Goodbye", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "End")) {
					msgDialogEnd = false;
					dialogEnable = false;
					Time.timeScale = TIMESCALE;
			}
		}
	}
	GUI.EndGroup ();
}


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