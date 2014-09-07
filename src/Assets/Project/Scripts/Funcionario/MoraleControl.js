
public var constant : GameConstants;
public var timer : GameTime;
public var stringNames : StringNames;
private var dialog : Dialog;
public var dialogGuiStyle : GUIStyle;
public var moraleDisplay : FloatingLines;
public var staminaDisplay : FloatingLines;
public var staminaBar : StaminaBar;
public var moraleBar : MoraleBar;

private var equipe : Equipe;
private var func : Funcionario;
private var work : Working;
private var morale : int;
private var stamina : int;

function MoraleControlActions()
{
	yield WaitForSeconds(0.5);
	ChangeStamina();
	StaminaActions();
	MoraleActions();
	
}
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
				staminaMod = ComputeChange(- Mathf.Max(changeFactor * 0.7, 2));
			}
			else
			{
				if(timer.GetGameTime() % 7 == 5)
				{
					staminaMod = ComputeChange(5);
				}
			}
			//Sunday
			if((timer.GetGameTime() % 7 == 6) && func.behavior.GetSunday() && changeFactor !=0)
			{
				staminaMod = ComputeChange(- Mathf.Max(changeFactor * 0.7, 2));
			}
			else
			{
				if(timer.GetGameTime() % 7 == 6)
				{
					staminaMod = ComputeChange(5);
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
			{
				dialog.SetDialogQuitEnable();
				if(func.GetPapel() == stringNames.papelGerente)
				{
					equipe.SetHasManager(false);
				}
				if(func.GetPapel() == stringNames.papelMarketing)
				{
					equipe.SetHasMarketing(false);
				}
			}
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
		if (stamina > constant.TIRED_STAMINA)
		{
			dialog.SetDialogControl();
		}
		else
		{
			//If sat or sunday working
			if(((timer.GetGameTime() % 7 == 5) && func.behavior.GetSaturday()) || ((timer.GetGameTime() % 7 == 6) && func.behavior.GetSunday()) || (timer.GetGameTime() % 7 < 5))
			{
				dialog.SetDialogBadDialog(true);
				//Decrease morale while tired
				func.SetMorale(CheckMorale(func.GetMorale() - constant.MORALE_MOD));
				moraleDisplay.showFloatText3("", "-" + constant.MORALE_MOD, "red", "  Morale", 0.5);
			}
		}
	}
}

function DecreaseMoralePayment()
{
	var moraleChange : int;
	if(func.GetNome() != stringNames.fired)
	{
		morale = func.GetMorale();
		//moraleChange = -(constant.MORALE_MOD / 3);
		moraleChange = -(constant.MORALE_MOD);
		morale = morale + moraleChange;		//Perde 2 de moral
		morale = CheckMorale(morale);
		func.SetMorale(morale);
		moraleBar.Morale_Bar();
		if (morale > 0)
			moraleDisplay.showFloatText3("", moraleChange.ToString(), "red", "  Morale", 0.5);
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
		moraleDisplay.showFloatText3("", moraleChange.ToString(), "red", "  Morale", 0.5);
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
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale", 0.5);
	}
}

function IncreaseMoralePromotion()
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
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale", 0.5);
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
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale", 0.5);
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
		moraleDisplay.showFloatText3("+", moraleChange.ToString(), "green", "  Morale", 0.5);
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
	var equipeObj : GameObject;
	equipeObj = GameObject.Find("Equipe");
	func = GetComponentInChildren(Funcionario);
	work = GetComponentInChildren(Working);
	equipe = equipeObj.GetComponentInChildren(Equipe);
	dialog = GetComponentInChildren(Dialog);
}
