
public var constant : GameConstants;
public var timer : GameTime;
public var stringNames : StringNames;
private var dialog : Dialog;
public var dialogGuiStyle : GUIStyle;
public var moraleDisplay : FloatingLines;
public var staminaDisplay : FloatingLines;
public var staminaBar : StaminaBar;
public var moraleBar : MoraleBar;

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
		//ranges from 0 to 16, whereas 8 is default
		changeFactor = parseInt(work.GetWorkingHoursModifier() * 8);
		//If not sat nor sun
		if((timer.GetGameTime() % 7 != 5) && (timer.GetGameTime() % 7 != 6))
		{
			//if working 8 hours/day
			if (changeFactor == 8)		
				staminaMod = 0;
			else
				staminaMod = ComputeChange(8 - changeFactor);
		}
		else
		{
			//Saturday
			if( (timer.GetGameTime() % 7 == 5) && func.behavior.GetSaturday() && changeFactor !=0)
			{
				staminaMod = ComputeChange(- Mathf.Max(changeFactor * 0.5 * 1.25, 2));
			}
			else
			{
				if(timer.GetGameTime() % 7 == 5)
				{
					staminaMod = ComputeChange(8);
				}
			}
			//Sunday
			if((timer.GetGameTime() % 7 == 6) && func.behavior.GetSunday() && changeFactor !=0)
			{
				staminaMod = ComputeChange(- Mathf.Max(changeFactor * 0.5 * 1.25, 2));
			}
			else
			{
				if(timer.GetGameTime() % 7 == 6)
				{
					staminaMod = ComputeChange(8);
				}
			}
		}
		stamina += staminaMod;
		if (stamina > 100)
			stamina = 100;
		else
			if (stamina < 0)
				stamina = 0;
		func.SetStamina(stamina);
		staminaBar.Stamina_Bar();
	}
}

function ComputeChange(num : float)
{
	var change : float;

	if(num >= 0)
	{
		change = parseInt(num * constant.RECOVERYBONUS);
		if (stamina < 100 && change != 0)
			staminaDisplay.showFloatText3("+", change.ToString(), "green", "  Stamina");
	}
	else
	{
		change = parseInt(num * constant.RECOVERYPENALY);
		if (stamina > 0 && change != 0)
			staminaDisplay.showFloatText4("", change.ToString(), "red", "  Stamina");
	}
	
	return change;
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

function Vacation()
{
	func.SetWorkingHours(0);
	func.behavior.SetSaturday(false);
	func.behavior.SetSunday(false);
	func.SetMorale(CheckMorale(func.GetMorale() + constant.MORALE_MOD));
	moraleDisplay.showFloatText3("+", "4", "green", "  Morale");
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
		{
			dialog.SetDialogBadDialog(true);
			//Decrease morale while tired
			func.SetMorale(CheckMorale(func.GetMorale() - constant.MORALE_MOD));
			moraleDisplay.showFloatText3("", "-4", "red", "  Morale");
		}
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
		moraleBar.Morale_Bar();
		if (morale > 0)
			moraleDisplay.showFloatText3("", moraleChange.ToString(), "red", "  Morale");
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
		moraleBar.Morale_Bar();
		moraleDisplay.showFloatText3("", moraleChange.ToString(), "red", "  Morale");
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
		moraleBar.Morale_Bar();
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale");
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
		moraleBar.Morale_Bar();
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale");
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
		moraleBar.Morale_Bar();
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale");
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
		moraleBar.Morale_Bar();
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale");
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
