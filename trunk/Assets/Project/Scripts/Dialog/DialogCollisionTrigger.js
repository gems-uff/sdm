
public var dialogGuiStyle : GUIStyle;
private var func : Funcionario;
private var treino : Treinamento;
private var menuAtr : FuncWindow;
private var menuEsp : EspWindow;
private var menuPapel : PapelWindow;
private var menuNegotiation : NegotiationWindow;
private var menuPrototype : PrototypeWindow;

private var timer : GameTime;
private var workHours : WorkingHoursWindow;



public var endOnExit : boolean = true;
private var gameobj : GameObject; 
private var dialogEnable : boolean = false;



//--------------------------------------------OnTriggerEnter-----------------------------------------------------------

function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" && func.GetNome() != "Fired" )
	{
		dialogEnable = true;
	}
}

//--------------------------------------------OnTriggerExit-----------------------------------------------------------

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
		dialogEnable = false;
		//timer.SpeedNormal();
	}
}

//--------------------------------------------Dialog_Funcionario-----------------------------------------------------------

function Dialog_Funcionario (){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogEnable == true)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Hello boss. What's up ?", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "Profile")) {
				menuAtr.SetJanelatributo(func);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,50, 130, 25), "Train")) {
				menuEsp.Especializar(func, treino);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,75, 130, 25), "Change Task")) {
				menuPapel.MudarPapel(func, treino);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,100, 130, 25), "Working Hours")) {
				workHours.ChangeWorkHours(func);
				dialogEnable = false;
		}
		//Vazio
		GUI.Box (Rect (600,125, 130, 25), "");
		//Se arquiteto
		if(func.GetPapel() == "Architect" && menuPrototype.GetIsLocked() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Prototype")) {
					menuPrototype.SetShowWindow(func);
					dialogEnable = false;
			}
		//Se gerente
		if(func.GetPapel() == "Manager")
			if (GUI.Button (Rect (600,125, 130, 25), "Hire")) {
					//Chama HIRE
					dialogEnable = false;
			}
		//se Marketing
		if(func.GetPapel() == "Marketing" && menuNegotiation.GetLockNegotiation() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Negotiation")) {
					menuNegotiation.SetShowWindow(func);
					dialogEnable = false;
			}
		if (GUI.Button (Rect (600,150, 130, 25), "End")) {
				//timer.SpeedNormal();
				dialogEnable = false;
		}
	}
	GUI.EndGroup ();
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake() 
{ 
	var menuObj : GameObject;
	var timerObj : GameObject;
	gameobj =GameObject.Find("Player"); 
	menuObj = GameObject.Find("GUI");
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	menuAtr = menuObj.GetComponent(FuncWindow);
	menuEsp = menuObj.GetComponent(EspWindow);
	menuPapel = menuObj.GetComponent(PapelWindow);
	menuNegotiation = menuObj.GetComponent(NegotiationWindow);
	menuPrototype = menuObj.GetComponent(PrototypeWindow);
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