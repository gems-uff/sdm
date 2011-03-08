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

private var moraleAction : MoraleControl;

private var incrementTime : float = 1.0;
private var repeatTime : float = 1.0;
private var incrementBy : int = 1;
private var gameTime : int = 0;
private var timeSpeed : float = 1.0;

public var pagar : Pagamentos;
public var project : Project;
public var equipe : Equipe;
public var menuPrototype : PrototypeWindow;

public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;

public var work1 : Working;
public var work2 : Working;
public var work3 : Working;
public var work4 : Working;
public var work5 : Working;
public var work6 : Working;
public var work7 : Working;
public var work8 : Working;

public var morale1 : MoraleControl;
public var morale2 : MoraleControl;
public var morale3 : MoraleControl;
public var morale4 : MoraleControl;
public var morale5 : MoraleControl;
public var morale6 : MoraleControl;
public var morale7 : MoraleControl;
public var morale8 : MoraleControl;

public var newProject01 : RandomProjectGenerator;
public var newProject02 : RandomProjectGenerator;
public var newProject03 : RandomProjectGenerator;
public var newProject04 : RandomProjectGenerator;
public var newProject05 : RandomProjectGenerator;
public var newProject06 : RandomProjectGenerator;
public var newProject07 : RandomProjectGenerator;
public var newProject08 : RandomProjectGenerator;

public var newFunc1 : NewFuncionario;
public var newFunc2 : NewFuncionario;
public var newFunc3 : NewFuncionario;
public var newFunc4 : NewFuncionario;
public var newFunc5 : NewFuncionario;
public var newFunc6 : NewFuncionario;
public var newFunc7 : NewFuncionario;
public var newFunc8 : NewFuncionario;
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
	pagar.PagarFuncionario();
	pagar.PagarJogadorMensal();
	//project.SetProjectSizeString();
	//project.SetProjectQuality();
	
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
		equipe.ResetBonus();
	if((gameTime % 7) == 0)
		menuPrototype.Unlock();
	if ((gameTime % 28) == 0)
	{
		newFunc1.RandomFuncionarioStarter();
		newFunc2.RandomFuncionarioStarter();
		newFunc3.RandomFuncionarioStarter();
		newFunc4.RandomFuncionarioStarter();
		newFunc5.RandomFuncionarioStarter();
		newFunc6.RandomFuncionarioStarter();
		newFunc7.RandomFuncionarioStarter();
		newFunc8.RandomFuncionarioStarter();
	}
	if(gameTime > project.GetDeadline() || project.GetFractionDone() >= 100)
	{
		newProject01.NewProject();
		newProject02.NewProject();
		newProject03.NewProject();
		newProject04.NewProject();
		newProject05.NewProject();
		newProject06.NewProject();
		newProject07.NewProject();
		newProject08.NewProject();
		project.SetIscomplete(true);
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

