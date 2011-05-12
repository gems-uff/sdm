//Para usar este script:
//var menuObj : GameObject;
//private var menuPrototype : PrototypeWindow;
//menuObj = GameObject.Find("GUI");
//menuPrototype = menuObj.GetComponent(PrototypeWindow);
//menuPrototype.SetShowWindow(func);

public var constant : GameConstants;

public var project : Project;
public var timer : GameTime;
public var jogador : PlayerStats;

private var func : Funcionario;
private var windowRect : Rect = Rect (800,125,200,145);
private var showWindow : boolean = false;
private var simpleProt : boolean = false;
private var regularProt : boolean = false;
private var complexProt : boolean = false;
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
}
function SetShowWindow(funcionario){
	func = funcionario;
	showWindow = true;
}

function ApplyChanges(){
	var architect : float = func.GetArquiteto();
	var bonusSincronismo : float = 0;
	architect = architect  * constant.ARCHITECT_FACTOR;
	if(simpleProt == true)
	{
		bonusSincronismo = architect * constant.SIMPLE_FACTOR;
		jogador.ChangeSaldo(- constant.SIMPLE_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
	if(regularProt == true)
	{
		bonusSincronismo = architect * constant.REGULAR_FACTOR;
		jogador.ChangeSaldo(- constant.REGULAR_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
	if(complexProt == true)
	{
		bonusSincronismo = architect * constant.COMPLEX_FACTOR;
		jogador.ChangeSaldo(- constant.COMPLEX_PRICE);
		project.SetSincronismo(bonusSincronismo);
	}
}
function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,020,196,25),"Which type of Prototype");
	if (jogador.GetSaldo() > constant.SIMPLE_PRICE)
	{
		simpleProt = GUI.Toggle (Rect (02, 050, 58, 30), simpleProt, "Simple");
		if(simpleProt == true)
		{
			regularProt = false;
			complexProt = false;
		}
	}
	if (jogador.GetSaldo() < constant.SIMPLE_PRICE)
		GUI.Box (Rect (02, 050, 58, 30),"Simple");
	if (jogador.GetSaldo() > constant.REGULAR_PRICE)
	{
		regularProt = GUI.Toggle (Rect (60, 050, 78, 30), regularProt, "Regular");
		if(regularProt == true)
		{
			simpleProt = false;
			complexProt = false;
		}
	}
	if (jogador.GetSaldo() < constant.REGULAR_PRICE)
		GUI.Box (Rect (60, 050, 78, 30),"Regular");
	if (jogador.GetSaldo() > constant.COMPLEX_PRICE)
	{
		complexProt = GUI.Toggle (Rect (128, 050, 68, 30), complexProt, "Complex");
		if(complexProt == true)
		{
			simpleProt = false;
			regularProt = false;
		}
	}
	if (jogador.GetSaldo() < constant.COMPLEX_PRICE)
		GUI.Box (Rect (128, 050, 68, 30),"Complex");
		
	GUI.Box (Rect (02,080,196,30),"Price : $" + constant.SIMPLE_PRICE + " / $" + constant.REGULAR_PRICE +" / $" + constant.COMPLEX_PRICE);
	if (GUI.Button (Rect (02,110,98,25), "Cancel")) 
	{
		showWindow  = false;
		//timer.SpeedNormal();
	}
	if ( complexProt == true || regularProt == true || simpleProt == true)
		if (GUI.Button (Rect (100,110,98,25), "Ok")) 
		{
			showWindow  = false;
			ApplyChanges();
			ResetItems();
			isLocked = true;
		}
	
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	GUI.backgroundColor = Color.blue;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (8, windowRect, WindowFunction, "Prototype");
}