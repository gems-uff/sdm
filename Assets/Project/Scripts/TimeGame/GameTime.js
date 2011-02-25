//Para usar este script:
//private var timerObj : GameObject;
//private var timer : GameTime;
//timerObj = GameObject.Find("Timer");
//timer = timerObj.GetComponent(GameTime);

private var playerObj : GameObject;
private var pagar : Pagamentos;

private var incrementTime : float = 1.0;
private var repeatTime : float = 1.0;
private var incrementBy : int = 1;
private var gameTime : int = 0;
private var timeSpeed : float = 1.0;

private var TIMESLOW : float = 2.0;
private var TIMENORMAL : float = 1.0;
private var TIMEFAST : float = 0.5;
private var TIMEVERYFAST : float = 0.25;
private var TIMEHYPERFAST : float = 0.125;


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
    return ("Week: " + semana.ToString("00") + "   Day: " + dia.ToString("0"));
}

function Start () {
    InvokeRepeating("PassTime", incrementTime , TIMENORMAL);
}
function PassTime () {
    gameTime += incrementBy;
	pagar.PagarFuncionarioSemanal();
	pagar.PagarJogadorMensal();
	pagar.PagarJogadorConclusao();
}

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

function Awake () {
	playerObj = GameObject.Find("PlayerStats");
	pagar = playerObj.GetComponent(Pagamentos);
}
