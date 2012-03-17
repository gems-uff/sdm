
public var constant : GameConstants;
public var timer : GameTime;
public var stringNames : StringNames;
private var dialog : Dialog;
public var dialogGuiStyle : GUIStyle;
public var moraleDisplay : FloatingLines;
public var staminaDisplay : FloatingLines;

private var func : Funcionario;
private var work : Working;
private var morale : int;
private var stamina : int;

function ChangeStamina(){
	var changeFactor : float;
	var staminaMod : float;
	if((func.GetNome() != stringNames.fired) && (func.GetPapel() != stringNames.papelTreinando))
	{
		stamina = func.GetStamina();
		changeFactor = work.GetWorkingHoursModifier();
		if (changeFactor == 1)		//Se esta trabalhando o numero de horas default (40 horas)
			staminaMod = 0;
		else
			if (changeFactor < 1 )		//Se estiver trabalhando um numero de horas inferior ao default, entao ele recupera estamina (recupera 20% a mais do que ele perderia se fosse o inverso)
			{
				staminaMod = (2 - changeFactor) * constant.RECOVERYBONUS;	//Cresce estamina
				staminaMod = parseInt(staminaMod * constant.MODIFICATOR);
				if (stamina < 100)
					staminaDisplay.showFloatText3("+", staminaMod.ToString(), "green", "  Stamina");
			}
			else
			{
				staminaMod = (- changeFactor) * constant.RECOVERYBONUS;		//Decresce estamina
				staminaMod = parseInt(staminaMod * constant.MODIFICATOR);	
				if (stamina > 0)
					staminaDisplay.showFloatText4("", staminaMod.ToString(), "red", "  Stamina");
			}
		stamina = stamina + staminaMod;
		if (stamina > 100)
			stamina = 100;
		else
			if (stamina < 0)
				stamina = 0;
		func.SetStamina(stamina);
	}
}

function MoraleActions()
{
	morale = func.GetMorale();
	var chance : int = Random.Range (0, 100);
	if(func.GetNome() != stringNames.fired)
	{
		if (morale < constant.BADMORALE)
			if (chance < constant.DEMITCHANCE)
				dialog.SetDialogQuitEnable();
	}
}

function StaminaActions()
{
	stamina = func.GetStamina();
	var chance : int = Random.Range (0, 150);
	if(func.GetNome() != stringNames.fired)
	{
		if (stamina > constant.TIREDMORALE)
		{
			dialog.SetDialogControl();
		}
		else
			dialog.SetDialogBadDialog(true);
	}
}

function DecreaseMoralePayment()
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = -(constant.MORALE_MOD / 3);
		morale = morale + moraleChange;		//Perde 2 de moral
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		if (morale > 0)
			moraleDisplay.showFloatText("", moraleChange.ToString(), "red", "  Morale");
	}
}

function DecreaseMoraleFailProject()
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = - 2 * constant.MORALE_MOD;
		morale = morale + moraleChange;		//Perde 12 de moral
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleDisplay.showFloatText("", moraleChange.ToString(), "red", "  Morale");
	}
}

function IncreaseMoraleFinishedProject(mod : float)
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = 2 * constant.MORALE_MOD * mod;
		morale = morale + moraleChange;		//Recupera 12 de moral
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleDisplay.showFloatText("+", moraleChange.ToString(), "green", "  Morale");
	}
}

function IncreaseMoralePromotion()
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = 5 * constant.MORALE_MOD;
		morale = morale + moraleChange;		//Recupera 30
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleDisplay.showFloatText("+", moraleChange.ToString(), "green", "  Morale");
	}
}

function IncreaseMoraleDificulty(change : int)
{	//Recupera 0, 6 12, 24 (simples, regular, complexo, insano)
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = change * constant.MORALE_MOD;
		morale = morale + moraleChange;	
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleDisplay.showFloatText("+", moraleChange.ToString(), "green", "  Morale");
	}
}

function IncreaseMoraleMonthly()
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		moraleChange = constant.MORALE_MOD;
		morale = morale + moraleChange;	
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleDisplay.showFloatText("+", moraleChange.ToString(), "green", "  Morale");
	}
}
function CheckMorale(moraleCheck : int)
{
	if (moraleCheck > 100)
			moraleCheck = 100;
		else
			if (moraleCheck < 0)
				moraleCheck = 0;
	return moraleCheck;
}

/*
function ChangeMorale(){
	var changeFactor : float;
	var moraleMod : float;
	if((func.GetNome() != stringNames.fired) && (func.GetPapel() != stringNames.papelTreinando))
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
		moraleModifier = moraleMod;
		
		if (morale > 100)
			morale = 100;
		else
			if (morale < 0)
				morale = 0;
		func.SetMorale(morale);
		showMorale = true;
	}
}
*/

/*
function MoraleActions(){
	morale = func.GetMorale();
	var chance : int = Random.Range (0, 150);
	if(func.GetNome() != stringNames.fired)
	{
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
}
*/

/*
function ShowMorale()
{
	if(showMorale)
	{
		moraleModifier = moraleModifier - moralePayment;
		if (moraleModifier > 0 && morale < 100)
		{
			//Ganha Moral
			floatingLinesBelow.showFloatText("+", moraleModifier.ToString(), "green", "  Morale");
		}
		else
		{
			if (moraleModifier < 0 && morale > 0)
			{
				//Perde moral
				floatingLinesBelow.showFloatText("", moraleModifier.ToString(), "red", "  Morale");
			}
		}
		showMorale = false;
	}
	moralePayment = 0;
}
*/
//--------------------------------------------Awake-----------------------------------------------------------
function Update(){
	//ShowMorale();
}
function OnGUI (){
}

function Awake () {
	func = GetComponentInChildren(Funcionario);
	work = GetComponentInChildren(Working);
	dialog = GetComponentInChildren(Dialog);
}
