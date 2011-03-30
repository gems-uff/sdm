//Para usar este script:
//private var func : Funcionario;
//private var morale : MoraleControl;
//funcObj = GameObject.Find("Funcionario");
//morale = funcObj.GetComponent(MoraleControl);
public var timer : GameTime;
public var stringNames : StringNames;
private var dialog : Dialog;
public var dialogGuiStyle : GUIStyle;
public var MODIFICATOR : float = 6.0; 
public var SLOWRECOVERY : float = -1.0;
public var RECOVERYBONUS : float = 1.2;
public var TIREDMORALE : float = 25.0;
public var BADMORALE : float = 5.0;
public var DEMITCHANCE : float = 1.0;
public var MORALE_MOD : int = 25.0;

private var func : Funcionario;
private var work : Working;
private var dialogEnable : boolean = false;
private var dialogEnableBadDialog : boolean = false;
private var dialogControl : boolean = false;

function ChangeMorale(){
	var morale : float;
	var changeFactor : float;
	var moraleMod : float;
	if(func.GetNome() != stringNames.fired)
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
		dialog.SetDialogControl();
	else
	{
		dialog.SetDialogBadDialog();
		if (morale < BADMORALE)
			if (chance < DEMITCHANCE)
			{
				dialog.SetDialogQuitEnable();
			}
	}
}

function DecreaseMoralePayment(funcionario : Funcionario)
{
	var morale = funcionario.GetMorale();
	morale = morale - MORALE_MOD;
	funcionario.SetMorale(morale);
}
//--------------------------------------------Awake-----------------------------------------------------------
function OnGUI (){
}

function Awake () {
	func = GetComponentInChildren(Funcionario);
	work = GetComponentInChildren(Working);
	dialog = GetComponentInChildren(Dialog);
}
