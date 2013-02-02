#pragma strict

class ActionList
{
	public var first : ActionNode;
	public var last : ActionNode;
	
	function Add(t : ActionNode)
	{
		//if empty
		if(this.first == null)
		{
			this.first = t;
			this.last = t;
		}
		else
		{
			//Put it after the last one
			this.last.Add(t);
			//Update the last one
			this.last = t;
		}
	}
	
	function ActionList()
	{
		this.first = null;
		this.last = null;
	}
}

class ActionNode
{
	public var date : String;						//Day
	public var who : String;					//Name
	public var task : String;					//Task executed from his role
	public var role : String;					//Role as in Programmer, marketing, etc
	public var rate : int;					//Role as in Programmer, marketing, etc
	public var influence : InfluenceValues;		//Influence stats
	public var pressure : ActionNode;			//If under pressure
	public var description : String;			//Text saying his decision making progress for ingame window
	public var d2 : String;		//Text saying his decision making progress for export log
	public var morale : int;					//morale number
	public var stamina : int;					//stamina number
	public var hours : int;
	public var cost : float;					//cost paid each day
	public var work : String;					//how much he progressed/made/contributed: codelines, bugs found, etc
	public var artifact : String;				//created any artifact ? Which one ? Prototype or test cases
	public var projectStat : ProjectStats;
	public var work_2 : String;					//Changes in project (all roles)
	public var work_3 : String;					//Changes in project (programmer quality)
	public var work_4 : String;					//Changes in project (programmer UTC)
	public var work_5 : String;					//Changes in project (programmer bugs)
	
	//For the linked List
	public var next : ActionNode;
	public var previous : ActionNode;

	function Add(t : ActionNode)
	{
		this.next = t;
		t.previous = this;
	}
	//Constructor
	function ActionNode()
	{
		this.date = "";
		this.who = null;
		this.task = null;
		this.role = null;
		this.rate = 100;
		this.influence = new InfluenceValues();
		this.pressure = null;
		this.description = null;
		this.d2 = null;
		this.morale = 0;
		this.stamina = 0;
		this.hours = 0;
		this.cost = 0;
		this.work = "";
		this.work_2 = "";
		this.work_3 = "";
		this.work_4 = "";
		this.work_5 = "";
		this.artifact = "";
		this.projectStat = null;
		
		this.next = null;
		this.previous = null;
	}
	//Employee
	function NewAction(task : String, description : String, d2 : String, func : Employee, date : GameTime, role : String, work : String, 
	artifact : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.rate = rate;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	//func
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	artifact : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.rate = rate;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	//func no artifact
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.rate = rate;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = "";
		this.artifact = "";
	}
	//Func, cost for HIRE
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, cost : int, date : GameTime, role : String, 
	work : String, artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = cost;
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	
	//func, set work_2
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, artifact : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.rate = rate;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = work_2;
		this.artifact = artifact;
	}
	//Func, cost for NEGOTIATION
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, cost : int, date : GameTime, role : String, 
	work : String, work_2 : String, work_3 : String, artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = cost;
		this.work = work;
		this.work_2 = work_2;
		this.work_3 = work_3;
		this.artifact = artifact;
	}
	//func, set work_2 and 3
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, work_3 : String, artifact : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.rate = rate;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = work_2;
		this.work_3 = work_3;
		this.artifact = artifact;
	}
	//func, set work_2 and 3 and 4
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, work_3 : String, work_4 : String, work_5 : String, artifact : String, rate : int)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = work;
		this.work_2 = work_2;
		this.work_3 = work_3;
		this.work_4 = work_4;
		this.work_5 = work_5;
		this.artifact = artifact;
	}
}

