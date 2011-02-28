//Para usar este script:
//private var timerObj : GameObject;
//private var timer : GameTime;
//timerObj = GameObject.Find("Timer");
//timer = timerObj.GetComponent(GameTime);

public var TIMESLOW : float = 2.0;
public var TIMENORMAL : float = 1.0;
public var TIMEFAST : float = 0.5;
public var TIMEVERYFAST : float = 0.25;
public var TIMEHYPERFAST : float = 0.125;


private var playerObj : GameObject;
private var pagar : Pagamentos;
private var projectObj : GameObject;
private var project : Project;

private var func1Obj : GameObject;
private var func2Obj : GameObject;
private var func3Obj : GameObject;
private var func4Obj : GameObject;
private var func5Obj : GameObject;
private var func6Obj : GameObject;
private var func7Obj : GameObject;
private var func8Obj : GameObject;
private var func1 : Funcionario;
private var func2 : Funcionario;
private var func3 : Funcionario;
private var func4 : Funcionario;
private var func5 : Funcionario;
private var func6 : Funcionario;
private var func7 : Funcionario;
private var func8 : Funcionario;

private var work1 : Working;
private var work2 : Working;
private var work3 : Working;
private var work4 : Working;
private var work5 : Working;
private var work6 : Working;
private var work7 : Working;
private var work8 : Working;

private var morale1 : MoraleControl;
private var morale2 : MoraleControl;
private var morale3 : MoraleControl;
private var morale4 : MoraleControl;
private var morale5 : MoraleControl;
private var morale6 : MoraleControl;
private var morale7 : MoraleControl;
private var morale8 : MoraleControl;

private var moraleAction : MoraleControl;

private var incrementTime : float = 1.0;
private var repeatTime : float = 1.0;
private var incrementBy : int = 1;
private var gameTime : int = 0;
private var timeSpeed : float = 1.0;

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
    return ("Week: " + semana.ToString("00") + "   Day: " + dia.ToString("0"));
}

//--------------------------------------------PassTime-----------------------------------------------------------

function PassTime () {
    gameTime += incrementBy;
	pagar.PagarFuncionarioSemanal();
	pagar.PagarJogadorMensal();
	pagar.PagarJogadorConclusao();
	
	work1.WorkHours();
	work1.Work();
	work2.WorkHours();
	work2.Work();
	work3.WorkHours();
	work3.Work();
	work4.WorkHours();
	work4.Work();
	work5.WorkHours();
	work5.Work();
	work6.WorkHours();
	work6.Work();
	work7.WorkHours();
	work7.Work();
	work8.WorkHours();
	work8.Work();
	
	morale1.ChangeMorale();
	morale1.MoraleActions();
	morale2.ChangeMorale();
	morale2.MoraleActions();
	morale3.ChangeMorale();
	morale3.MoraleActions();
	morale4.ChangeMorale();
	morale4.MoraleActions();
	morale5.ChangeMorale();
	morale5.MoraleActions();
	morale6.ChangeMorale();
	morale6.MoraleActions();
	morale7.ChangeMorale();
	morale7.MoraleActions();
	morale8.ChangeMorale();
	morale8.MoraleActions();
	
	if ((gameTime % 2) == 1)
		project.SetFindbugScore(1);
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

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	playerObj = GameObject.Find("PlayerStats");
	pagar = playerObj.GetComponent(Pagamentos);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
	
	func1Obj = GameObject.Find("Funcionario1");
	func1 = func1Obj.GetComponent(Funcionario);
	func2Obj = GameObject.Find("Funcionario2");
	func2 = func2Obj.GetComponent(Funcionario);
	func3Obj = GameObject.Find("Funcionario3");
	func3 = func3Obj.GetComponent(Funcionario);
	func4Obj = GameObject.Find("Funcionario4");
	func4 = func4Obj.GetComponent(Funcionario);
	func5Obj = GameObject.Find("Funcionario5");
	func5 = func5Obj.GetComponent(Funcionario);
	func6Obj = GameObject.Find("Funcionario6");
	func6 = func6Obj.GetComponent(Funcionario);
	func7Obj = GameObject.Find("Funcionario7");
	func7 = func7Obj.GetComponent(Funcionario);
	func8Obj = GameObject.Find("Funcionario8");
	func8 = func8Obj.GetComponent(Funcionario);
	
	work1 = func1Obj.GetComponent(Working);
	work2 = func2Obj.GetComponent(Working);
	work3 = func3Obj.GetComponent(Working);
	work4 = func4Obj.GetComponent(Working);
	work5 = func5Obj.GetComponent(Working);
	work6 = func6Obj.GetComponent(Working);
	work7 = func7Obj.GetComponent(Working);
	work8 = func8Obj.GetComponent(Working);
	
	morale1 = func1Obj.GetComponent(MoraleControl);
	morale2 = func2Obj.GetComponent(MoraleControl);
	morale3 = func3Obj.GetComponent(MoraleControl);
	morale4 = func4Obj.GetComponent(MoraleControl);
	morale5 = func5Obj.GetComponent(MoraleControl);
	morale6 = func6Obj.GetComponent(MoraleControl);
	morale7 = func7Obj.GetComponent(MoraleControl);
	morale8 = func8Obj.GetComponent(MoraleControl);
}
