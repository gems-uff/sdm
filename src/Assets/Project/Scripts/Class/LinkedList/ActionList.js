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
	public var date : int;						//Day
	public var who : String;					//Name
	public var task : String;					//Task executed from his role
	public var role : String;					//Role as in Programmer, marketing, etc
	public var influence : InfluenceValues;		//Influence stats
	public var pressure : ActionNode;			//If under pressure
	public var description : String;			//Text saying his decision making progress
	public var morale : int;					//morale number
	public var stamina : int;					//stamina number
	public var cost : float;					//cost paid each day
	public var work : float;					//how much he progressed/made/contributed: codelines, bugs found, etc
	public var artifact : String;				//created any artifact ? Which one ? Prototype or test cases
	
	//For the linked List
	public var next : ActionNode;
	public var previous : ActionNode;

	function Add(t : ActionNode)
	{
		this.next = t;
		t.previous = this;
	}
	
	function ActionNode()
	{
		this.date = 0;
		this.who = null;
		this.task = null;
		this.role = null;
		this.influence = new InfluenceValues();
		this.pressure = null;
		this.description = null;
		this.morale = 0;
		this.stamina = 0;
		this.cost = 0;
		this.work = 0;
		this.artifact = "";
		
		this.next = null;
		this.previous = null;
	}
	function SetValues(date : int, who : String, task : String, role : String, description : String, morale : int, stamina : int, cost : float, work  :float)
	{
		this.date = date;
		this.who = who;
		this.task = task;
		this.role = role;
		//this.influence = null;
		//this.pressure = null;
		this.description = description;
		this.morale = morale;
		this.stamina = stamina;
		this.cost = cost;
		this.work = work;
	}
	
	function NewAction(task : String, description : String, func : Funcionario, date : int, role : String, work : float, artifact : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date;
		this.role = role;
		this.description = description;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.cost = func.GetSalario() / 28;
		this.work = work;
		this.artifact = artifact;
	}
	
}

