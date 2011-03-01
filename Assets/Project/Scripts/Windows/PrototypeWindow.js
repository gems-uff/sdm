//Para usar este script:
//var menuObj : GameObject;
//private var menuPrototype : PrototypeWindow;
//menuObj = GameObject.Find("GUI");
//menuPrototype = menuObj.GetComponent(PrototypeWindow);
//menuPrototype.SetShowWindow(func);

public var ARCHITECT_FACTOR : float = 0.06; 	//Multiplicador do bonus dos prototipos pelo arquiteto, no caso usa 10% do valor do arquiteto
public var SIMPLE_FACTOR : int = 1;			//Multiplicador do bonus dos prototipos pelo tipo de prototipo
public var REGULAR_FACTOR : int = 2;
public var COMPLEX_FACTOR : int = 3;

public var SIMPLE_PRICE : int = 3000;		//Custo para fazer cada prototipo
public var REGULAR_PRICE : int = 7500;
public var COMPLEX_PRICE : int = 18750;

private var project : Project;
private var timer : GameTime;
private var func : Funcionario;
private var jogador : PlayerStats;
private var windowRect : Rect = Rect (800,125,200,145);
private var showWindow : boolean = false;
private var simpleProt : boolean = false;
private var regularProt : boolean = false;
private var complexProt : boolean = false;
private var picked : boolean = false;
private var isLocked : boolean = false;

function GetIsLocked(){
	return isLocked;
}
function Unlock(){
	isLocked = false;
}
function ResetItems(){
	simpleProt = false;
	regularProt = false;
	complexProt = false;
	picked = false;
}
function SetShowWindow(funcionario){
	func = funcionario;
	showWindow = true;
}

function ApplyChanges(){
	var architect : float = func.GetArquiteto();
	var bonusSincronismo : float = 0;
	architect = architect  * ARCHITECT_FACTOR;
	if(simpleProt == true)
	{
		bonusSincronismo = architect * SIMPLE_FACTOR;
		jogador.ChangeSaldo(- SIMPLE_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
	if(regularProt == true)
	{
		bonusSincronismo = architect * REGULAR_FACTOR;
		jogador.ChangeSaldo(- REGULAR_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
	if(complexProt == true)
	{
		bonusSincronismo = architect * COMPLEX_FACTOR;
		jogador.ChangeSaldo(- COMPLEX_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
}
function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,020,196,25),"Which type of Prototype");
	
	simpleProt = GUI.Toggle (Rect (02, 050, 58, 30), simpleProt, "Simple");
	if(simpleProt == true)
	{
		regularProt = false;
		complexProt = false;
		picked = true;
	}
	regularProt = GUI.Toggle (Rect (60, 050, 78, 30), regularProt, "Regular");
	if(regularProt == true)
	{
		simpleProt = false;
		complexProt = false;
		picked = true;
	}
	complexProt = GUI.Toggle (Rect (128, 050, 68, 30), complexProt, "Complex");
	if(complexProt == true)
	{
		simpleProt = false;
		regularProt = false;
		picked = true;
	}
	GUI.Box (Rect (02,080,196,30),"Price : $" + SIMPLE_PRICE + " / $" + REGULAR_PRICE +" / $" + COMPLEX_PRICE);
	if (GUI.Button (Rect (02,110,98,25), "Cancel")) 
	{
		showWindow  = false;
		//timer.SpeedNormal();
	}
	if (picked)
		if (GUI.Button (Rect (100,110,98,25), "Ok")) 
		{
			showWindow  = false;
			ApplyChanges();
			ResetItems();
			isLocked = true;
			//timer.SpeedNormal();
		}
	
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	var timerObj : GameObject;
	var playerObj : GameObject;
	playerObj = GameObject.Find("PlayerStats");
	timerObj = GameObject.Find("Timer");
	jogador = playerObj.GetComponent(PlayerStats);
	project = GetComponentInChildren(Project);
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	GUI.backgroundColor = Color.blue;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (8, windowRect, WindowFunction, "Prototype");
}