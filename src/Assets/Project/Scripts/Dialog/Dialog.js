
public var dialogGuiStyle : GUIStyle;
public var stringNames : StringNames;
public var constant : GameConstants;
public var playStyle : GameplayStyle;

public var menuAtr : FuncWindow;
public var menuEsp : EspWindow;
public var menuPapel : PapelWindow;
//public var menuNegotiation : NegotiationWindow;
public var menuPrototype : PrototypeWindow;
public var windowController : WindowController;
public var timer : GameTime;
public var workHours : WorkingHoursWindow;
public var dialogLock : BlockDialog;

public var endOnExit : boolean = true;

//public var log : HistoryLog;

private var func : Funcionario;
private var moraleControl : MoraleControl;
private var treino : Treinamento;
private var fire : NewFuncionario;
private var dialogEnable : boolean = false;
private var insideCollider : boolean = false;
//Morale booleans
private var dialogQuitEnable : boolean = false;
private var dialogEnableBadDialog : boolean = false;
private var dialogControl : boolean = false;
private var showBadDialog : boolean = false;
private var showQuitDialog : boolean = false;

private var windowRect_tired : Rect = Rect (150,Screen.height - 265,735,175);
private var windowRect_quit : Rect = Rect (150,Screen.height - 265,735,175);
private var windowRect_dialog : Rect = Rect (150,Screen.height - 265,735,175);

function SetDialogQuitEnable(){
	dialogQuitEnable = true;
}
function SetDialogControl(){
	dialogControl = false;
}
function SetDialogBadDialog(t : boolean){
	dialogEnableBadDialog = t;
}
//--------------------------------------------Update-----------------------------------------------------------

function CloseDialog()
{
	dialogLock.SetLock(false);
	dialogEnable = false;
}
function OnMouseDown () 
{
	if((!dialogLock.GetLock()) && (func.GetNome() != stringNames.fired))
	{
		dialogEnable = true;
	}

}
function Update(){
	if(!dialogLock.GetLock())
	{
		if (Input.GetKeyDown("space") && insideCollider == true)
		{
			dialogEnable = true;
			//windowRect_dialog = GUI.Window (50, windowRect_dialog, Dialog_Funcionario, "Tired Dialog");
		}
		
		if(func.GetNome() != stringNames.fired)
		{
			if(func.GetStamina() < constant.TIRED_STAMINA)
			{
				if (dialogEnableBadDialog == true && dialogControl == false)
				{
					showBadDialog = true;
					//windowRect_tired = GUI.Window (51, windowRect_tired, BadMoraleDialog, "Tired Dialog");
					dialogLock.SetLock(true);
				}
			}
			else
			{
				dialogEnableBadDialog = false;
			}
			
			if (dialogQuitEnable == true)
			{
				showQuitDialog = true;
				//windowRect_quit = GUI.Window (52, windowRect_quit, QuitDialog, "Quit Dialog");
				dialogLock.SetLock(true);
			}
		}
	}
}
//Both trigger functions are for dialog through avatar
//--------------------------------------------OnTriggerEnter-----------------------------------------------------------

function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" && func.GetNome() != stringNames.fired )
	{
		insideCollider = true;
	}
}

//--------------------------------------------OnTriggerExit-----------------------------------------------------------

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
		insideCollider = false;
		dialogEnable = false;
	}
}

//--------------------------------------------Dialog_Funcionario-----------------------------------------------------------

function Dialog_Funcionario (windowID : int){
	GUI.BeginGroup(Rect (02,00,800,200));
	if (dialogEnable == true)
	{
		dialogLock.SetLock(true);
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Hello boss. What's up ?", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "Profile")) {
				menuAtr.SetJanelatributo(func, true, func.report);
				CloseDialog();
		}
		GUI.Box (Rect (600,50, 130, 25), "");
		//if(playStyle.IsMacro() == false)
		//{
		if (GUI.Button (Rect (600,50, 130, 25), "Train")) {
				menuEsp.Especializar(func, treino);
				CloseDialog();
		}
		//}
		GUI.Box (Rect (600,75, 130, 25), "");
		//if(playStyle.IsMacro() == false)
		//{
		if (GUI.Button (Rect (600,75, 130, 25), "Change Task")) {
				windowController.ShowRoleWindow(func, treino);
				CloseDialog();
		}
		//}
		GUI.Box (Rect (600,100, 130, 25), "");
		//if(playStyle.IsMacro() == false)
		//{
		if (GUI.Button (Rect (600,100, 130, 25), "Task Config.")) {
				workHours.ChangeWorkHours(func);
				CloseDialog();
		}
		//}
		//Vazio
		GUI.Box (Rect (600,125, 130, 25), "");
		//Se arquiteto
		/*
		if(func.GetPapel() == stringNames.papelArquiteto && menuPrototype.GetIsLocked() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Prototype")) {
					windowController.ShowProtWindow(func);
					CloseDialog();
			}
			*/
		//Se gerente
		if(func.GetPapel() == stringNames.papelGerente)
			if (GUI.Button (Rect (600,125, 130, 25), "Hire")) 
			{
				//Need to change this for player to hire or allow the manager to hire
				//if(playStyle.IsMacro() == false)
				if(func.behavior.managerAutonomous == false)
				
					windowController.ShowHireWindow(func);
				else
					//menuHire.SetShowWindowMHiring();
					windowController.ShowManagerHireWindow(func);
				CloseDialog();
			}
		//se Marketing
		if(func.GetPapel() == stringNames.papelMarketing && windowController.GetNegLock() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Negotiation")) {
					windowController.ShowNegWindow(func);
					CloseDialog();
			}
		if (GUI.Button (Rect (600,150, 130, 25), "End")) {
				CloseDialog();
		}
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}

//--------------------------------------------Awake-----------------------------------------------------------

function BadMoraleDialog(windowID : int){
	GUI.BeginGroup(Rect (02,00,800,200));
	if (showBadDialog == true && dialogControl == false)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, I'm exhausted. May i take some time off ?", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "Yes")) 
		{
			moraleControl.Vacation();
			
			dialogEnableBadDialog = false;
			dialogControl = true;
			dialogLock.SetLock(false);
			showBadDialog = false;
		}
		if (GUI.Button (Rect (600,50, 130, 25), "No")) 
		{
			dialogEnableBadDialog = false;
			dialogControl = true;
			dialogLock.SetLock(false);
			showBadDialog = false;
		}
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}
function QuitDialog(windowID : int){
	GUI.BeginGroup(Rect (02,00,800,200));
	if (showQuitDialog == true)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, i can't take this anymore, im quitting !", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "End")) 
		{
			/*
			//fire action
			var slot : EmployeeList;
			slot = log.GetSlot(func);
			log.NewFiredAction(slot);
			*/
			//Is fired
			//fire.FireFuncionario(func);
			func.FireEmployee(true);
			dialogQuitEnable = false;
			dialogLock.SetLock(false);
			showQuitDialog = false;
		}
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}

function Awake() 
{ 
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	fire = GetComponentInChildren(NewFuncionario);
	moraleControl = GetComponentInChildren(MoraleControl);

} 

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI (){
	//Dialog_Funcionario();
	//BadMoraleDialog();
	//QuitDialog();
	if(dialogEnable)
		windowRect_dialog = GUI.Window (50, windowRect_dialog, Dialog_Funcionario, "Dialog");
	else if(showBadDialog)
		windowRect_tired = GUI.Window (51, windowRect_tired, BadMoraleDialog, "Tired Dialog");
	else if(showQuitDialog)
		windowRect_quit = GUI.Window (52, windowRect_quit, QuitDialog, "Quit Dialog");
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