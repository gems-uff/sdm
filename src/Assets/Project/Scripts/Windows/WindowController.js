#pragma strict
public var stringNames : StringNames;

private var showAny : boolean = true;	//Because of welcome window
public var bugWindow : BugsWindow;
private var showBugWindow : boolean = false;
private var bugWindowRect : Rect = Rect (600,125,400,300);

public var contractWindow : ContractWindow;
private var showContractWindow : boolean = false;
private var contractWindowRect : Rect = Rect (300,125,400,268);

//public var espWindow : EspWindow;
//private var showEspWindow : boolean = false;
//private var espWindowRect : Rect = Rect (600,125,400,293);

public var hireWindow : HireWindow;
private var showHireWindow : boolean = false;
private var hireWindowRect : Rect = Rect (300,125,300,412);
private var showWindowManagerHiring : boolean = false;
private var showInsuficientMoneyWindow : boolean = false;
private var hireWindowRect2 : Rect = Rect (400,125,300,200);

public var negWindow : NegotiationWindow;
private var showNegWindow : boolean = false;
private var negWindowRect : Rect = Rect (800,125,200,215);

public var welcomeWindow : WelcomeWindow;
private var showWelcomeWindow : boolean = true;
private var showRoleHelpWindow : boolean = false;
private var welcomeWindowRect : Rect = Rect (700,125,300,395);

public var roleWindow : PapelWindow;
private var showRoleWindow : boolean = false;
private var showFireDialogRoleWindow : boolean = false;
private var roleWindowRect : Rect = Rect (400,125,600,288);
private var roleFireWindowRect : Rect = Rect (400,125,300,100);

public var prototypeWindow : PrototypeWindow;
private var showPrototypeWindow : boolean = false;
private var prototypeWindowRect : Rect = Rect (800,125,200,145);

//
//Window Controller Variables
//
function GetShowAny()
{
	return showAny;
}

function SetShowAny(t : boolean)
{
	showAny = t;
}

function Activate()
{
	showAny = true;
}

function Deactivate()
{
	showAny = false;
}

//-------------------------------------------------------------------------
//Bug Window
//-------------------------------------------------------------------------

function ShowBugWindow()
{
	showBugWindow = true;
	Activate();
}
function DisableBugWindow()
{
	showBugWindow = false;
	Deactivate();
}

//-------------------------------------------------------------------------
//Contract Window
//-------------------------------------------------------------------------
function ShowContractWindow()
{
	showContractWindow = true;
	Activate();
}
function DisableContractWindow()
{
	showContractWindow = false;
	Deactivate();
}

/*
//-------------------------------------------------------------------------
//Especialization Window
//-------------------------------------------------------------------------
function ShowEspWindow()
{
	showEspWindow = true;
	Activate();
}
function DisableEspWindow()
{
	showEspWindow = false;
	Deactivate();
}
*/

//-------------------------------------------------------------------------
//Hire Window
//-------------------------------------------------------------------------
function ShowHireWindow()
{
	showHireWindow = true;
	Activate();
}
function DisableHireWindow()
{
	showHireWindow = false;
	Deactivate();
}

function ShowManagerHireWindow()
{
	showWindowManagerHiring = true;
	Activate();
}
function DisableManagerHireWindow()
{
	showWindowManagerHiring = false;
	Deactivate();
}

function ShowInsufficientHireWindow()
{
	showWindowManagerHiring = true;
	Activate();
}
function DisableInsufficientHireWindow()
{
	showWindowManagerHiring = false;
	Deactivate();
}


//-------------------------------------------------------------------------
//Negociation Window
//-------------------------------------------------------------------------
function ShowNegWindow(func :Funcionario)
{
	showNegWindow = true;
	negWindow.SetShowWindow(func);
	Activate();
}
function DisableNegWindow()
{
	showNegWindow = false;
	Deactivate();
}

function GetNegLock()
{
	return negWindow.GetLockNegotiation();
}

//-------------------------------------------------------------------------
//Welcome Window
//-------------------------------------------------------------------------
function ShowWelWindow()
{
	showWelcomeWindow = true;
	Activate();
}
function DisableWelWindow()
{
	showWelcomeWindow = false;
	Deactivate();
}

function ShowRoleHelpWindow()
{
	showRoleHelpWindow = true;
	Activate();
}
function DisableRoleHelpWindow()
{
	showRoleHelpWindow = false;
	Deactivate();
}

//-------------------------------------------------------------------------
//Papel Window
//-------------------------------------------------------------------------
function ShowRoleWindow(funcionario : Funcionario, treino : Treinamento)
{
	if(funcionario.GetNome() != stringNames.fired)
	{
		if (treino.GetLockEscolha() == false)
		{
			roleWindow.ChangeRole(funcionario);
			showRoleWindow = true;
			Activate();
		}
	}
	
}
function DisableRoleWindow()
{
	showRoleWindow = false;
	Deactivate();
}

function ShowFireWindow()
{
	DisableRoleWindow();
	Activate();
	showFireDialogRoleWindow = true;
}
function DisableFireWindow()
{
	showFireDialogRoleWindow = false;
	Deactivate();
}

//-------------------------------------------------------------------------
//Prototype Window
//-------------------------------------------------------------------------
function ShowProtWindow(func : Funcionario)
{
	prototypeWindow.SetShowWindow(func);
	showPrototypeWindow = true;
	Activate();
}
function DisableProtWindow()
{
	showPrototypeWindow = false;
	Deactivate();
}

//-------------------------------------------------------------------------
//Window Controller
//-------------------------------------------------------------------------

function OnGUI () {
	if(showAny)
	{
		//Bug Window
		if(showBugWindow)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			bugWindowRect = GUI.Window (0, bugWindowRect, bugWindow.WindowFunction, ("Bugs: "));
		}
		
		//Contract Window
		if(showContractWindow)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			contractWindowRect = GUI.Window (1, contractWindowRect, contractWindow.ShowProjects, ("Possible Projects ") );
		}
		
		//Hire Window
		if(showHireWindow)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			hireWindowRect = GUI.Window (2, hireWindowRect, hireWindow.ShowEmployees, ("Possible candidates") );
		}
		if (showInsuficientMoneyWindow)
		{	
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			hireWindow.ShowInsuficientMoneyWindow();
		}
		
		if(showWindowManagerHiring)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			hireWindowRect2 = GUI.Window (3, hireWindowRect2, hireWindow.WindowManagerHiring, ("Manager Hiring") );
		}	
		
		//Negotiation
		if(showNegWindow && !negWindow.GetLockNegotiation())
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			negWindowRect = GUI.Window (4, negWindowRect, negWindow.WindowFunction, "Negotiation");
		}
				
		//Welcome Window
		if(showWelcomeWindow)
		{
			GUI.backgroundColor = Color.white;
			GUI.contentColor = Color.white;
			welcomeWindowRect = GUI.Window (5, welcomeWindowRect, welcomeWindow.WindowFunction, "Welcome");
		}
		if(showRoleHelpWindow)
		{
			GUI.backgroundColor = Color.white;
			GUI.contentColor = Color.white;
			welcomeWindowRect = GUI.Window (6, welcomeWindowRect, welcomeWindow.ShowRoleHelp, "Help");
		}
		
		//Papel Window
		if(showRoleWindow)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			roleWindowRect = GUI.Window (7, roleWindowRect, roleWindow.WindowFunction, "Roles");
		}
		if(showFireDialogRoleWindow)
		{
			GUI.backgroundColor = Color.yellow;
			GUI.contentColor = Color.green;
			roleFireWindowRect = GUI.Window (8, roleFireWindowRect, roleWindow.WindowFire, "Confirmation: Firing employee");
		}
		
		//Prototype Window
		if(showPrototypeWindow)
		{
			GUI.backgroundColor = Color.blue;
			GUI.contentColor = Color.green;
			prototypeWindowRect = GUI.Window (9, prototypeWindowRect, prototypeWindow.WindowFunction, "Prototype");
		}
	}
	
}

function Start () {

}

function Update () {

}