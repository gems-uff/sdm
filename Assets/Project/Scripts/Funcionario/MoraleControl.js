//Para usar este script:
//private var func : Funcionario;
//private var morale : MoraleControl;
//funcObj = GameObject.Find("Funcionario");
//morale = funcObj.GetComponent(MoraleControl);
public var timer : GameTime;
public var dialogGuiStyle : GUIStyle;
private var fire : NewFuncionario;
public var MODIFICATOR : float = 6.0; 
public var SLOWRECOVERY : float = -1.0;
public var RECOVERYBONUS : float = 1.2;
public var TIREDMORALE : float = 25.0;
public var BADMORALE : float = 5.0;
public var DEMITCHANCE : float = 1.0;

private var func : Funcionario;
private var work : Working;
private var dialogEnable : boolean = false;
private var dialogEnableBadDialog : boolean = false;
private var dialogControl : boolean = false;

function ChangeMorale(){
	var morale : float;
	var changeFactor : float;
	var moraleMod : float;
	if(func.GetNome() != "Fired")
	{
		morale = func.GetMorale();
		changeFactor = work.GetWorkingHoursModifier();
		moraleMod = (changeFactor - 1);
		if (moraleMod == 0)		//Se esta trabalhando o numero de horas default (40 horas) entao ele recupera moral bem lentamente
			moraleMod = SLOWRECOVERY;
		else
			if (moraleMod < 0 )		//Se estiver trabalhando um numero de horas inferior ao default, entao ele recupera moral (recupera 20% a mais do que ele perderia se fosse o inverso)
				moraleMod = moraleMod * RECOVERYBONUS;
		moraleMod = moraleMod * MODIFICATOR;
		morale = morale - moraleMod;
		if (morale > 100)
			morale = 100;
		else
			if (morale < 0)
				morale = 0;
		func.SetMorale(morale);
	}
}

function MoraleActions(){
	var morale = func.GetMorale();
	var chance : int = Random.Range (0, 150);
	if (morale > TIREDMORALE)
		dialogControl = false;
	else
	{
		dialogEnableBadDialog = true;
		if (morale < BADMORALE)
			if (chance < DEMITCHANCE)
			{
				dialogEnable = true;
				Debug.Log("ME DEMITO!!!");
			}
	}
}
function BadMoraleDialog(){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogEnableBadDialog == true && dialogControl == false)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, this is too much for me, I'm in need of a break.", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "End")) {
				dialogEnableBadDialog = false;
				dialogControl = true;
		}
	}
	GUI.EndGroup ();
}
function QuitDialog(){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogEnable == true)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, i can't take this anymore, im quitting !", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "End")) {
				fire.FireFuncionario(func);
				dialogEnable = false;
		}
	}
	GUI.EndGroup ();
}
//--------------------------------------------Awake-----------------------------------------------------------
function OnGUI (){
	BadMoraleDialog();
	QuitDialog();
}

function Awake () {
	func = GetComponentInChildren(Funcionario);
	work = GetComponentInChildren(Working);
	fire = GetComponentInChildren(NewFuncionario);
}
