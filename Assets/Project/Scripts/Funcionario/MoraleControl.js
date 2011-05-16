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
public var floatingLinesBelow : FloatingLinesBelow;

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
		if (changeFactor == 1)		//Se esta trabalhando o numero de horas default (40 horas)
			moraleMod = 0;
		else
			if (changeFactor < 1 )		//Se estiver trabalhando um numero de horas inferior ao default, entao ele recupera moral (recupera 20% a mais do que ele perderia se fosse o inverso)
				moraleMod = (2 - changeFactor) * constant.RECOVERYBONUS;	//Cresce moral
			else
				moraleMod = (- changeFactor) * constant.RECOVERYBONUS;		//Decresce moral
				
		moraleMod = parseInt(moraleMod * constant.MODIFICATOR);							//multiplica o modificador por 2.5, dando no maximo +- 6
		morale = morale + moraleMod;
		
		
		if (moraleMod > 0 && morale < 100)
		{
			//Ganha Moral
			floatingLinesBelow.showFloatText("+", moraleMod, "green", "  Morale");
		}
		else
			if (moraleMod < 0 && morale > 0)
			{
				//Perde moral
				floatingLinesBelow.showFloatText("", moraleMod, "red", "  Morale");
			}
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
	morale = morale - constant.MORALE_MOD;		//Perde 6 de moral
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
