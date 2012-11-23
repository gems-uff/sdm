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
	public var influence : InfluenceValues;		//Influence stats
	public var pressure : ActionNode;			//If under pressure
	public var description : String;			//Text saying his decision making progress for ingame window
	public var d2 : String;		//Text saying his decision making progress for export log
	public var morale : int;					//morale number
	public var stamina : int;					//stamina number
	public var cost : float;					//cost paid each day
	public var work : String;					//how much he progressed/made/contributed: codelines, bugs found, etc
	public var artifact : String;				//created any artifact ? Which one ? Prototype or test cases
	public var projectStat : ProjectStats;
	public var work_2 : String;
	public var work_3 : String;
	
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
		this.influence = new InfluenceValues();
		this.pressure = null;
		this.description = null;
		this.d2 = null;
		this.morale = 0;
		this.stamina = 0;
		this.cost = 0;
		this.work = "";
		this.work_2 = "";
		this.work_3 = "";
		this.artifact = "";
		this.projectStat = null;
		
		this.next = null;
		this.previous = null;
	}
	//Employee
	function NewAction(task : String, description : String, d2 : String, func : Employee, date : GameTime, role : String, work : String, 
	artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.cost = func.GetSalario() / 28;
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	//func
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.cost = func.GetSalario() / 28;
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	//Func, cost
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
		this.cost = cost;
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	
	//func, set work_2
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.cost = func.GetSalario() / 28;
		this.work = work;
		this.work_2 = work_2;
		//this.work_3 = work_3;
		this.artifact = artifact;
	}
	//func, set work_2 and 3
	function NewAction(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, work_3 : String, artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.cost = func.GetSalario() / 28;
		this.work = work;
		this.work_2 = work_2;
		this.work_3 = work_3;
		this.artifact = artifact;
	}
	
	//who
	function NewAction(task : String, description : String, d2 : String, who : String, morale : int, stamina : int, cost : float, 
	date : GameTime, role : String, work : String, artifact : String)
	{
		this.who = who;
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = role;
		this.description = description;
		this.morale = morale;
		this.stamina = stamina;
		this.cost = cost / 28;
		this.work = work;
		this.work_2 = work;
		this.artifact = artifact;
	}
	/*
	//set work_2
	function NewAction(task : String, description : String, who : String, morale : int, stamina : int, cost : float, date : int, role : String, work : String, work2 : String, artifact : String)
	{
		this.who = who;
		this.task = task;
		this.date = date;
		this.role = role;
		this.description = description;
		this.morale = morale;
		this.stamina = stamina;
		this.cost = cost / 28;
		this.work = work;
		this.work_2 = work_2;
		this.artifact = artifact;
	}
	*/
	
}

