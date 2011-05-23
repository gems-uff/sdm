//Para usar este script:
//private var timerObj : GameObject;
//private var timer : GameTime;
//timerObj = GameObject.Find("Timer");
//timer = timerObj.GetComponent(GameTime);

public var TIMESLOW : float = 8.0;
public var TIMENORMAL : float = 6.0;
public var TIMEFAST : float = 4.0;
public var TIMEVERYFAST : float = 2.0;
public var TIMEHYPERFAST : float = 0.125;

private var moraleAction : MoraleControl;

private var incrementTime : float = 1.0;
private var repeatTime : float = 1.0;
private var incrementBy : int = 1;
private var gameTime : int = 0;
private var timeSpeed : float = 1.0;

public var project : Project;
public var equipe : Equipe;
public var menuPrototype : PrototypeWindow;

//--------------------------------------------Get/Set-----------------------------------------------------------

function GetGameTime(){
	return gameTime;
}
function SetGameTime(t : int){
	gameTime = t;
}

function GetRepeatTime(){
	return repeatTime;
}
function GetTimeSpeed(){
	return timeSpeed;
}

function GetTimeS(){
	return TIMESLOW;
}
function GetTimeN(){
	return TIMENORMAL;
}
function GetTimeF(){
	return TIMEFAST;
}
function GetTimeVF(){
	return TIMEVERYFAST;
}
function GetTimeHF(){
	return TIMEHYPERFAST;
}

function GetTime () {	//Retorna o tempo no formato data/hora
	var gametime : String = GetTimeString(gameTime);
	return gametime;
}

function GetTimeString(t : int) :String{
	var semana : int = t / 7 ;
    var dia : int = (t % 7) +1;
    return ("Week: " + semana.ToString("000") + "   Day: " + dia.ToString("0"));
}

//--------------------------------------------PassTime-----------------------------------------------------------

function PassTime () {
    gameTime += incrementBy;
	
	BroadcastMessage("PagarFuncionario");
	BroadcastMessage("PagarJogadorMensal");
	
	BroadcastMessage("IncrementDays");
	BroadcastMessage("WorkHours");
	
	BroadcastMessage("GerenteWork");
	BroadcastMessage("MarketingWork");
	BroadcastMessage("ArquitetoWork");
	BroadcastMessage("AnalistaWork");
	BroadcastMessage("ProgramadorWork");
	BroadcastMessage("TesterWork");
	BroadcastMessage("Treinando");

	BroadcastMessage("ChangeStamina");
	BroadcastMessage("StaminaActions");
	BroadcastMessage("MoraleActions");
	
	equipe.ResetBonus();
	if((gameTime % 7) == 0)
		menuPrototype.Unlock();
	if ((gameTime % 28) == 0)
	{
		BroadcastMessage("NewEmployees");
	}
	if(gameTime > project.GetDeadline() || project.GetFractionDone() >= 100)
	{
		project.SetIscomplete(true);
		BroadcastMessage("NewProject");
		BroadcastMessage("UnLockNegotiation");
	}
}

//--------------------------------------------Speed-----------------------------------------------------------

function PauseGame(){
	repeatTime = 0;
	timeSpeed = 0;
	CancelInvoke();
}
function SpeedSlow(){
	repeatTime = TIMESLOW;
	timeSpeed = 0.5;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMESLOW);
}
function SpeedNormal(){
	repeatTime = TIMENORMAL;
	timeSpeed = 1.0;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMENORMAL);
}
function SpeedFast(){
	repeatTime = TIMEFAST;
	timeSpeed = 2.0;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMEFAST);
}
function SpeedVeryFastl(){
	repeatTime = TIMEVERYFAST;
	timeSpeed = 4.0;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMEVERYFAST);
}
function SpeedHyperFast(){
	repeatTime = TIMEHYPERFAST;
	timeSpeed = 8.0;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMEHYPERFAST);
}

//--------------------------------------------Start-----------------------------------------------------------

function Start () {
    InvokeRepeating("PassTime", incrementTime , TIMENORMAL);
}

