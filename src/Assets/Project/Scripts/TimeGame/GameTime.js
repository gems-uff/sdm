
//public var TIMESLOW : float = 10.0;
public var TIMENORMAL : float = 4.0;
public var TIMEFAST : float = 3.0; //5
public var TIMEVERYFAST : float = 2.0;//3
//public var TIMEHYPERFAST : float = 2.5;

private var moraleAction : MoraleControl;

private var incrementTime : float = 1.0;
private var repeatTime : float = 1.0;
private var incrementBy : int = 1;
private var gameTime : int = 0;
private var timeSpeed : float = 1.0;

public var project : Project;
public var equipe : Equipe;
public var menuPrototype : PrototypeWindow;
public var provInfluence : InfluenceController;

//--------------------------------------------Get/Set-----------------------------------------------------------
//Retorna o dia atual
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
/*
function GetTimeS(){
	return TIMESLOW;
}
*/
function GetTimeN(){
	return TIMENORMAL;
}
function GetTimeF(){
	return TIMEFAST;
}
function GetTimeVF(){
	return TIMEVERYFAST;
}
/*
function GetTimeHF(){
	return TIMEHYPERFAST;
}
*/
function GetTime () {	//Retorna o tempo no formato semana/dia
	var gametime : String = GetTimeString(gameTime);
	return gametime;
}

function GetTimeString(t : int) :String{
	var semana : int = t / 7 ;
    var dia : int = (t % 7) +1;
    return ("Week: " + semana.ToString("000") + "   Day: " + dia.ToString("0"));
}

function StringDate(week : int, t : int)
{
	var day : String;
	switch(t)
	{
	   case 1: 
		  day = "Mon";
	   break;
	
	   case 2:
		  day = "Tue";
	   break;
	   
	   case 3:
		  day = "Wed";
	   break;
	   
	   case 4:
		  day = "Thu";
	   break;
	   
	   case 5:
			day = "Fri";
	   break;
	   
	   case 6:
			day = "Sat";
	   break;
	   
	   case 7:
			day = "Sun";
	   break;
	}
	return ("Wk: " + week.ToString("000") + " Day: " + day);
}
function GetTimeDaysString(t : int) :String{
	var semana : int = t / 7 ;
    var dia : int = (t % 7) +1;
 	return StringDate(semana, dia);
}

function GetTimeDaysString() :String{
	var semana : int = gameTime / 7 ;
    var dia : int = (gameTime % 7) +1;
    return StringDate(semana, dia);
    /*
    var day : String;
    switch(dia)
	{
	   case 1: 
		  day = "Mon";
	   break;

	   case 2:
		  day = "Tue";
	   break;
	   
	   case 3:
		  day = "Wed";
	   break;
	   
	   case 4:
		  day = "Thu";
	   break;
	   
	   case 5:
			day = "Fri";
	   break;
	   
	   case 6:
			day = "Sat";
	   break;
	   
	   case 7:
			day = "Sun";
	   break;
	}
    return ("Wk: " + semana.ToString("000") + " Day: " + day);
    */
}
function GetTimeDayString() :String
{
	var dia : int = (gameTime % 7) +1;
    var day : String;
    switch(dia)
	{
	   case 1: 
		  day = "Mon";
	   break;

	   case 2:
		  day = "Tue";
	   break;
	   
	   case 3:
		  day = "Wed";
	   break;
	   
	   case 4:
		  day = "Thu";
	   break;
	   
	   case 5:
			day = "Fri";
	   break;
	   
	   case 6:
			day = "Sat";
	   break;
	   
	   case 7:
			day = "Sun";
	   break;
	}
    return (day);
}
//--------------------------------------------PassTime-----------------------------------------------------------

function PassTime () {
    gameTime += incrementBy;
    equipe.ResetBonus();
    provInfluence.CleanInfluenceNotConsumable();
    
    //BroadcastMessage("UpdateProjectStatNodeNoDelay");
    
	
	//BroadcastMessage("PagarJogadorMensal");
	
	BroadcastMessage("IncrementDays");
	BroadcastMessage("WorkHours");
	/*
	BroadcastMessage("GerenteWork");
	BroadcastMessage("MarketingWork");
	BroadcastMessage("ArquitetoWork");
	BroadcastMessage("AnalistaWork");
	BroadcastMessage("ProgramadorWork");
	BroadcastMessage("TesterWork");
	BroadcastMessage("Treinando");
	BroadcastMessage("IdleWork");
	*/
	BroadcastMessage("NewProjectStatNode");
	
	BroadcastMessage("WorkDaily", "Manager");
	BroadcastMessage("WorkDaily", "Marketing");
	BroadcastMessage("WorkDaily", "Architect");
	BroadcastMessage("WorkDaily", "Analyst");
	BroadcastMessage("WorkDaily", "Programmer");
	BroadcastMessage("WorkDaily", "Tester");
	BroadcastMessage("WorkDaily", "Training");
	BroadcastMessage("WorkDaily", "Idle");
	
	BroadcastMessage("UpdateProjectStatNode");
	
	BroadcastMessage("MoraleControlActions");
	//BroadcastMessage("ChangeStamina");
	//BroadcastMessage("StaminaActions");
	//BroadcastMessage("MoraleActions");
	BroadcastMessage("LevelUp");
	BroadcastMessage("CompanyLevelUp");
	
	BroadcastMessage("PagarFuncionario");
	
	if((gameTime % 7) == 0)
	{
		menuPrototype.Unlock();
		BroadcastMessage("ReduceSincronism");
		BroadcastMessage("WeeklyReport");
		BroadcastMessage("ResetStaffReport");
		BroadcastMessage("StaffReport");
	}
	if ((gameTime % 28) == 0)
	{
		BroadcastMessage("NewEmployees");
	}
	if(((gameTime % 28) == 1) && (gameTime > 2))
	{
		BroadcastMessage("PagarJogadorMensal");
		BroadcastMessage("UpdateProjectIncome");
	}
	
	//Testing
	/*
	if((gameTime == 1))
	{
		//BroadcastMessage("NewProjectNode");
		BroadcastMessage("ShowLogWindow");
	}
	*/
		
}

//--------------------------------------------Speed-----------------------------------------------------------

function PauseGame(){
	repeatTime = 0;
	//timeSpeed = 0;
	CancelInvoke();
}
/*
function SpeedSlow(){
	repeatTime = TIMESLOW;
	//timeSpeed = 0.5;
	CancelInvoke();
	InvokeRepeating("PassTime", incrementTime, TIMESLOW);
}
*/
function SpeedNormal(){
	//repeatTime = TIMENORMAL;
	repeatTime = 0;
	//timeSpeed = 1.0;
	CancelInvoke();
	BroadcastMessage("UpdateProjectStatNodeNoDelay");
	PassTime();
	//InvokeRepeating("PassTime", incrementTime, TIMENORMAL);
}
function SpeedFast(){
	repeatTime = TIMEFAST;
	//timeSpeed = 2.0;
	CancelInvoke();
	BroadcastMessage("UpdateProjectStatNodeNoDelay");
	InvokeRepeating("PassTime", incrementTime, TIMEFAST);
}
function SpeedVeryFast(){
	repeatTime = TIMEVERYFAST;
	//timeSpeed = 4.0;
	CancelInvoke();
	BroadcastMessage("UpdateProjectStatNodeNoDelay");
	InvokeRepeating("PassTime", incrementTime, TIMEVERYFAST);
}
/*
function SpeedHyperFast(){
	repeatTime = TIMEHYPERFAST;
	//timeSpeed = 8.0;
	CancelInvoke();
	BroadcastMessage("UpdateProjectStatNodeNoDelay");
	InvokeRepeating("PassTime", incrementTime, TIMEHYPERFAST);
}
*/
function FixedUpdate()
{
	if(project.GetIscomplete())
	{	
		BroadcastMessage("NewProject");
		BroadcastMessage("UnLockNegotiation");
	}
}
//--------------------------------------------Start-----------------------------------------------------------

function Start () {
    InvokeRepeating("PassTime", incrementTime , TIMENORMAL);
}

