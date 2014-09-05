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
	public var ID : String;
	public var empID : String;
	public var artID : String;
	public var date : String;						//Day
	public var who : String;					//Name
	public var task : String;					//Task executed from his role
	public var taskType : String;
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
	public var work_4 : String;					//Changes in project (programmer UTC, analyst discovery)
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
		this.taskType = null;
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
	/*
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
	*/
	
	function GetTaskType(task : String)
	{
		var fullTask = task.Split("_"[0]);
		if(fullTask[0] == "Balanced")
		{
			return (role +  "_" + "Balanced");
		}
		else if(fullTask[0] == "Aid")
		{
			return (role +  "_" + fullTask[0] + "_" + fullTask[1]);
		}
		else if(fullTask[0] == "Hired")
		{
			return (role  + "_" + task);
		}
		else if(fullTask[0] == "Fired")
		{
			return (fullTask[0] + "_" + fullTask[1]);
		}
		else
		{
			return (role +  "_" + fullTask[0]);
		}
	}
	//Func, cost for NEGOTIATION
	function NewActionNegotiation(task : String, description : String, d2 : String, func : Funcionario, cost : int, date : GameTime, 
	work : String, work_2 : String, work_3 : String)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = "Marketing";
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = cost;
		this.work = work;
		this.work_2 = work_2;
		this.work_3 = work_3;
		this.artifact = "";
		this.taskType = GetTaskType(task);
		
		GenerateVertexNoUpdate(func);
		
		
	}
	//Func, cost for HIRE
	function NewActionHire(task : String, description : String, d2 : String, func : Funcionario, cost : int, date : GameTime)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = "Manager";
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = cost;
		this.work = "Hired Employee";
		this.work_2 = "";
		this.artifact = "";
		this.taskType = GetTaskType(task);
		
		GenerateVertexNoUpdate(func);
	}
	//Fire
	function NewActionFire(task : String, description : String, d2 : String, func : Funcionario, date : GameTime)
	{
		this.who = func.GetNome();
		this.task = task;
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = "";
		this.description = description;
		this.d2 = d2;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = 0;
		this.work = "Fired Employee";
		this.work_2 = "";
		this.artifact = "";
		this.taskType = GetTaskType(task);
		
		GenerateVertexNoUpdate(func);
	}
	//Promotion
	function NewActionPromotion(func : Funcionario, date : GameTime, description : String)
	{
		this.who = func.GetNome();
		this.task = "Promotion";
		this.date = date.GetGameTime() + ":" + date.GetTimeDayString();
		this.role = func.GetPapel();
		this.rate = 100;
		this.description = description;
		this.d2 = description;
		this.morale = func.GetMorale();
		this.stamina = func.GetStamina();
		this.hours = func.GetWorkingHours();
		this.cost = parseInt(rate * 0.01 * func.GetSalario() / 28);
		this.work = "Promoted";
		this.work_2 = "";
		this.artifact = "";
		this.taskType = GetTaskType(task);
		
		GenerateVertexNoUpdate(func);
	}
	//func with Artifact
	function NewActionArtifact(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
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
		//this.work_2 = work;
		//this.work = "";
		this.work_2 = "";
		this.artifact = artifact;
		this.taskType = GetTaskType(task);
		
		GenerateVertex(func);
	}
	//func no artifact
	function NewActionNoArtifact(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, rate : int)
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
		this.taskType = GetTaskType(task);
		
		GenerateVertex(func);
	}
	//func, set work_2
	function NewActionOneInfluence(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
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
		this.taskType = GetTaskType(task);
		
		GenerateVertex(func);
	}
	
	//func, set work_2 and 3
	function NewActionTwoInfluences(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
	work_2 : String, work_3 : String, rate : int)
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
		this.artifact = "";
		this.taskType = GetTaskType(task);
		
		GenerateVertex(func);
	}
	//func, set work_2 and 3 and 4 and 5
	function NewActionFourInfluences(task : String, description : String, d2 : String, func : Funcionario, date : GameTime, role : String, work : String, 
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
		this.taskType = GetTaskType(task);
		
		GenerateVertex(func);
	}
	
	function GenerateVertexNoUpdate(func : Funcionario)
	{
		var tempVertex : Vertex;
		var prov : ExtractProvenance;
		prov = func.GetComponentInChildren(ExtractProvenance);
		
		tempVertex = prov.GetCurrentVertex();
		GenerateVertex(func);
		prov.SetCurrentVertex(tempVertex);
	}
	
	function GenerateVertex(func : Funcionario)
	{
		var prov : ExtractProvenance;
		prov = func.GetComponentInChildren(ExtractProvenance);
		//prov.AddAttribute("Who", this.who);
		prov.AddAttribute("Task", this.task);
		//prov.AddAttribute("TaskType", this.taskType);
		prov.AddAttribute("Role", this.role);
		prov.AddAttribute("Rate", this.rate.ToString());
		prov.AddAttribute("Morale", this.morale.ToString());
		prov.AddAttribute("Stamina", this.stamina.ToString());
		prov.AddAttribute("Hours", this.hours.ToString());
		prov.NewActivityVertex(this.date, "Action", "");
		prov.GenerateInfluence("Project", this.task, "Credits", this.cost.ToString());
	}
}

