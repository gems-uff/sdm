//Para usar este script:
//private var func : Funcionario;
//private var morale : MoraleControl;
//funcObj = GameObject.Find("Funcionario");
//morale = funcObj.GetComponent(MoraleControl);
public var constant : GameConstants;
public var timer : GameTime;
public var stringNames : StringNames;
private var dialog : Dialog;
public var dialogGuiStyle : GUIStyle;

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
			moraleMod = constant.SLOWRECOVERY;
		else
			if (moraleMod < 0 )		//Se estiver trabalhando um numero de horas inferior ao default, entao ele recupera moral (recupera 20% a mais do que ele perderia se fosse o inverso)
				moraleMod = moraleMod * constant.RECOVERYBONUS;
		moraleMod = moraleMod * constant.MODIFICATOR;
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
	if (morale > constant.TIREDMORALE)
		dialog.SetDialogControl();
	else
	{
		dialog.SetDialogBadDialog();
		if (morale < constant.BADMORALE)
			if (chance < constant.DEMITCHANCE)
			{
				dialog.SetDialogQuitEnable();
			}
	}
}

function DecreaseMoralePayment(funcionario : Funcionario)
{
	var morale = funcionario.GetMorale();
	morale = morale - constant.MORALE_MOD;
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
