
public var hLog : HistoryLog;
public var projectNode : ProjectNode;
private var folder : String = "./Files/";
private var path : String = folder + "log.txt";
private var project_path : String = folder + "ProjectStaff.csv";
private var state_path : String = folder + "ProjectState.csv";
private var employee_path : String = folder + "Employee.csv";
private var action_path : String = folder + "Action.csv";
private var artifact_path : String = folder + "Artifact.csv";
private var edges_path : String = folder + "Edges.csv";
private var pActions_path : String = folder + "PlayerActions.csv";
private var pDailyActions_path : String = folder + "PlayerDailyActions.csv";
private var player_path : String = folder + "Player.csv";
public var f : TextWriter;// = new StreamWriter(path);
public var proj : TextWriter;
public var state : TextWriter;
public var emp : TextWriter;
public var act : TextWriter;
public var art : TextWriter;
public var edges : TextWriter;
public var pActions : TextWriter;
public var player : TextWriter;

public var projID : int = 0;
public var stateID : int = 0;
public var empID : int = 0;
public var actID : int = 0;
public var artID : int = 0;
public var edgeID : int = 0;
public var pActionID : int = 0;
private var playerID : String = "Player_01";
private var artifactList : ArtifactList = new ArtifactList();
private var playerActions = new Array();

function RunList(f : TextWriter, action : ActionNode, employee : Employee)
{
	var line : String;
		
	while(action != null)
	{
		//==================================
		//Add ID for each action
		if(action.ID == null)
		{
			action.ID = "act" + actID;
			actID++;
		}
		action.empID = employee.GetID();
		//==================================
		
		line = Agent(employee, "\t") + "\t" + Action(action, "\t");
		f.WriteLine("AgAc" + "\t" + line);
		
		if(action.artifact == "Prototype")
		{
			//Artifact to action
			
			//Add Artifact to the list
			//==================================
			var artNode = new ArtifactNode("art" + artID, action.date, action.artifact);
			artID++;
			artifactList.Add(artNode);
			//Debug.Log("Artifact: " + artifactList.last.ID);
			action.artID = "art" + artID;
			//==================================
			
			var inf : String = " ";
			inf = "1 Prototype Created";
			//line = Artifact(action, action.artifact) + "\t" + Action(action, "\t");
			line = Action(action, "\t") + "\t" + Artifact(action, action.artifact);
			f.WriteLine("IAcAr" + "\t" + line + "\t" + inf);
		}
		
		if(action.influence.valid)
		{
			var current : InfluenceNode;
			current = action.influence.influence.first;
			while(current != null)
			{
				//Need to check if there was any artifact used
				if(current.action.artifact == "Prototype")
				{
					//Action to artifact
					line = Action(action, "\t") + "\t" + Artifact(current.action, current.action.artifact);
					f.WriteLine("IAcAr" + "\t" + line + "\t" + "-1 Prototype");
				}
				else
				{
					line = Action(current.action, "\t") + "\t" + Action(action, "\t");
					f.WriteLine("IAcAc" + "\t" + line + "\t" + current.action.work);//.influence.num);
				}
				current = current.next;
			}
		}
		if(action.projectStat != null)
		{
			//Cost
			if(action.cost != 0)
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + (-action.cost) + " Credits";	
			}
			else
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + (-action.cost) + " Credits: Not enough Credits";
			}
			f.WriteLine("AcP" + "\t" + line);
			//Work_2
			if(action.work_2 != "")
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + action.work_2;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_3
			if(action.work_3 != "")
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + action.work_3;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_4
			if(action.work_4 != "")
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + action.work_4;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_5
			if(action.work_5 != "")
			{
				line = Action(action, "\t") + "\t" + Project(action.projectStat, "\t") + "\t" + action.work_5;
				f.WriteLine("AcP" + "\t" + line);
			}
		}
		if(action.previous != null)
		{
			if((action.morale - action.previous.morale) != 0)
			{
				//Edge with morale dif between actions
				//line = Action(action.previous) + "\t" + Action(action) + "\t" + (action.morale - action.previous.morale) + " Morale";
				line = Action(action, "\t") + "\t" + Agent(employee, "\t") + "\t" + (action.morale - action.previous.morale) + " Morale";
				
				f.WriteLine("AcAg" + "\t" + line);
			}
			if((action.stamina - action.previous.stamina) != 0)
			{
				//Edge with stamina dif between actions
				//line = Action(action.previous) + "\t" + Action(action) + "\t" + (action.stamina - action.previous.stamina) + " Stamina";
				line = Action(action, "\t") + "\t" + Agent(employee, "\t") + "\t" + (action.stamina - action.previous.stamina) + " Stamina";
				f.WriteLine("AcAg" + "\t" + line);
			}
		}
		action = action.next;
	}
}

function Action(action : ActionNode, SEP : String)
{
	var id : String;
	var line : String;
	//id = action.date.ToString() +" "+ action.who.ToString() +" "+ action.role.ToString();
	if(action.ID == null)
	{
		action.ID = "act" + actID;
		actID++;
	}
	id = action.ID;
	line = id + SEP + action.date + SEP + action.who + SEP + action.task + SEP + action.role + SEP + action.morale + SEP +
	action.stamina + SEP + action.hours + SEP + action.cost + SEP + action.work + SEP + action.rate + SEP + action.d2;
    	
    return line;
}

function Action2(action : ActionNode, SEP : String)
{
	var id : String;
	var line : String;
	//id = action.date.ToString() +" "+ action.who.ToString() +" "+ action.role.ToString();
	if(action.ID == null)
	{
		action.ID = "act" + actID;
		actID++;
	}
	id = action.ID;
	line = id + SEP + action.date + SEP + action.task + SEP + action.role + SEP + action.morale + SEP +
	action.stamina + SEP + action.hours + SEP + action.cost + SEP + action.work + SEP + action.rate + SEP + playerID + SEP + action.d2;
    	
    return line;
}

//Can change to only action since type is action.artifact
function Artifact(action : ActionNode, type : String)
{
	var id : String;
	id = action.date.ToString() +" "+ type; 	
    return id;
}
function Agent(employee : Employee, SEP : String)
{
	var id : String;
	id = employee.GetID();
	line = id + SEP + employee.nome + SEP + employee.salary + SEP + employee.job + SEP + employee.level + SEP +
	employee.atributos.adaptabilidade + SEP + employee.atributos.autoDidata + SEP + employee.atributos.detalhista + SEP + 
	employee.atributos.negociacao + SEP + employee.atributos.objetividade + SEP + employee.atributos.organizacao + SEP +
	employee.atributos.paciencia + SEP + employee.atributos.raciocinioLogico + SEP + employee.atributos.relacionamentoHumano + SEP + 
	employee.especializacao;
    	
    return line;
}
function Project(stat : ProjectStats, SEP : String)
{
	var id : String;
	id = stat.ID;
	var line : String;
	line = id + SEP + stat.name + SEP + stat.date + SEP + stat.deadline + SEP + stat.linguagemProgramacao + SEP + stat.pagamento + SEP + 
	stat.requirements + SEP + stat.sincronismo + SEP + stat.codeQuality + SEP + stat.percentageDone + SEP + stat.bugUnitaryFound+ SEP +
	stat.bugIntegrationFound + SEP + stat.bugSystemFound + SEP + stat.bugAcceptionFound + SEP + stat.bugUnitaryRepaired+ SEP +
	stat.bugIntegrationRepaired + SEP + stat.bugSystemRepaired + SEP + stat.bugAcceptionRepaired + SEP + stat.credits + SEP + stat.totalBugs;
		
    return line;
}

function RunProjectNodes(f : TextWriter, node : ProjectStats)
{
	node.ID = "state" + stateID;
	stateID++;
	while(node.next != null)
	{
		node.next.ID = "state" + stateID;
		stateID++;
		var income : String = "0";
		line = Project(node, "\t") + "\t" + Project(node.next, "\t") + "\t" + income;
		f.WriteLine("PP" + "\t" + line);
		//If had any income, create a new edge with its value
		if(node.next.income != 0)
		{
			income = node.next.income + " Credits";
			line = "Client" + "\t" + Project(node, "\t") + "\t" + income;
			f.WriteLine("CP" + "\t" + line);
		}
		node = node.next;
	}
}

function RunEmployeeList(f : TextWriter, node : EmployeeNode)
{
	while(node != null)
	{
		if(node.employee.GetNome() != "Vacant")
		{
			//Add an ID to all employees
			node.employee.SetID("emp" + empID);
			empID++;
			action = node.actionList.first;
			RunList(f, action, node.employee);
			action = node.secActionList.first;
			RunList(f, action, node.employee);
			action = node.espActionList.first;
			RunList(f, action, node.employee);
			
		}
		node = node.next;
	}
}

//=========================================================
	function exportLog()
	{
	    var action : ActionNode;
	    f = new StreamWriter(path);
	    emp = new StreamWriter(employee_path);
	    act = new StreamWriter(action_path);
	    proj = new StreamWriter(project_path);
	    edges = new StreamWriter(edges_path);
	    state = new StreamWriter(state_path);
	    art = new StreamWriter(artifact_path);
	    player = new StreamWriter(player_path);
	    
	    player.WriteLine("PlayerID,Name,Region");
	    player.WriteLine("Player_01,Troy,USA");
	    player.Close();
	    
	    projectNode = hLog.GetProjectList().last;
	    RunProjectNodes(f, projectNode.project.first);
	    
	    RunEmployeeList(f, projectNode.slot01.first);
	    RunEmployeeList(f, projectNode.slot02.first);
	    RunEmployeeList(f, projectNode.slot03.first);
	    RunEmployeeList(f, projectNode.slot04.first);
	    RunEmployeeList(f, projectNode.slot05.first);
	    RunEmployeeList(f, projectNode.slot06.first);
	    RunEmployeeList(f, projectNode.slot07.first);
	    RunEmployeeList(f, projectNode.slot08.first);
	 
	    f.Close();
	   
	    MakeTables(projectNode, proj, edges, state, emp, act, art);
	    
	    edges.Close();
	    art.Close();
	    state.Close();
	    proj.Close();
	    act.Close();
	    emp.Close();
	    
	 }
	function MakeTables(projectNode : ProjectNode, proj : TextWriter, edges : TextWriter, state : TextWriter, emp : TextWriter, act : TextWriter, art : TextWriter)
	{
		proj.WriteLine("ProjID,EmpID,PlayerID");
		
		edges.WriteLine("EdgeID,SourceClientID,SourceEmpID,SourceActID,SourceStateID,TargetEmpID,TargetActID,TargetStateID,TargetArtID,Value,PlayerID");
		
		state.WriteLine("ProjID,StateID,name,date,deadline,ProgrammingLanguage,Payment,Especification,Elicitation,CodeQuality," +
		"CodeCompleted,UnitaryBugFound,IntegrationBugFound,SystemBugFound,AcceptionBugFound,UnitaryBugRepaired,IntegrationBugRepaired," +
		"SystemBugRepaired,AcceptionBugRepaired,Credits,TotalBugs,PlayerID");
		
		emp.WriteLine("EmpID,Name,Salary,Job,Level,Adaptability,Autodidact,Meticulous,Negotiation,Objectivity,Organization,"+
		"Patience,LogicalReasoning,HumanRelations,Specializations,Profile,PlayerID");
		
		act.WriteLine("EmpID,ActionID,Date,Task,Role,Morale,Stamina,Hours,Cost,Work,Rate,PlayerID,Description");
		
		art.WriteLine("ArtifactID,Date,Type,PlayerID");
		
		MakeArtifactTable(art);
		MakeStateTable(state, edges, projectNode.project.first);
		MakeEmployeeTable(emp, act, edges, proj, projectNode.slot01.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot02.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot03.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot04.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot05.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot06.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot07.first);
	    MakeEmployeeTable(emp, act, edges, proj, projectNode.slot08.first);
	    MakePlayerActionTable();
	}
	
	function MakePlayerActionTable()
	{
		pActions = new StreamWriter(pActions_path);
		pDailyActions = new StreamWriter(pDailyActions_path);
		pActions.WriteLine("PlayerID,PlayerActionID,EmpID,Date,Order,Code,Req,Sinc,DevStatus,FinancialStatus");
		pDailyActions.WriteLine("Actions");
		//Sort by date
		playerActions.sort(function(a, b) 
		{
    		var textA = a.date;
    		var textB = b.date;
    		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		//Write in file
		for (var x = 0;x < playerActions.length; x++)
		{
			pActions.WriteLine(playerActions[x].GetAction());
		}
		
		//Daily actions grouped together
		var line : String = "";
		var i : int = 0;
		line = playerActions[0].order;
		for (i = 1; i < playerActions.length; i++)
		{
			if(playerActions[i].date == playerActions[i-1].date)
			{
				line += " " + playerActions[i].order;
			}
			else
			{
				//Put in alphabetical order
				var fullLine = new Array();
				fullLine = line.Split(" "[0]);
				fullLine.Sort();
				//Remake the line String in alphabetical order
				line = fullLine[0];
				if(fullLine.length > 2)
				{
					for (var j = 1; j < (fullLine.length); j++)
					{
						line += " " + fullLine[j];
					}
				}
				//Add contextual information at the end of the line
				line += " (" + playerActions[i-1].codeStatus + " " + playerActions[i-1].reqStatus + " " + playerActions[i-1].valStatus + 
				" " + playerActions[i-1].delayed + " " + playerActions[i-1].finances + ")";
				//Write in the file
				pDailyActions.WriteLine(line);
				//Restart line
				line = playerActions[i].order;
			}
		}
		line += " (" + playerActions[i-1].codeStatus + " " + playerActions[i-1].reqStatus + " " + playerActions[i-1].valStatus + 
				" " + playerActions[i-1].delayed + " " + playerActions[i-1].finances + ")";
		pDailyActions.WriteLine(line);
				
		pActions.Close();
		pDailyActions.Close();
	}
	function MakeArtifactTable(art : TextWriter)
	{
		var node : ArtifactNode = new ArtifactNode();
		node = artifactList.first;
		while(node != null)
		{
			art.WriteLine(node.ID + "," + node.date + "," + node.type + "," + playerID);
			node = node.next;
		}
	}
	
	function MakeStateTable(state : TextWriter, edges : TextWriter, node : ProjectStats)
	{
		while(node != null)
		{			
			state.WriteLine("proj1" + "," + Project(node, ",") + "," + playerID);
			//If had any income, create a new edge with its value
			if(node.next != null)
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + "," + node.ID + "," + "," + "," + node.next.ID + "," + "," + "default" + "," + playerID);
				edgeID++;
				if(node.next.income != 0)
				{
					income = node.next.income + " Credits";
					edges.WriteLine("edge" + edgeID + "," + "Client_01" + "," + "," + "," + "," + "," + "," + node.ID + "," + "," + income + "," + playerID);
					edgeID++;
				}
			}
			node = node.next;
		}
	
	}
	
	function MakeEmployeeTable(emp : TextWriter, act : TextWriter, edges : TextWriter, proj : TextWriter, node : EmployeeNode)
	{
		while(node != null)
		{
			if(node.employee.GetNome() != "Vacant")
			{
				emp.WriteLine(Agent(node.employee, ",") + "," + node.employee.profile + "," + playerID);
				proj.WriteLine("proj1" + "," + node.employee.ID + "," + playerID);
			
				action = node.actionList.first;
				MakeActionTable(act, edges, action, node.employee);
				action = node.secActionList.first;
				MakeActionTable(act, edges, action, node.employee);
				action = node.espActionList.first;
				MakeActionTable(act, edges, action, node.employee);
			}
			node = node.next;
		}
	}
	
	function MakeActionTable(act : TextWriter, edges : TextWriter, action : ActionNode, employee : Employee)
	{
		var code : String;
		var req : String;
		var val : String;
		var financial : String;
		while(action != null)
		{
			act.WriteLine(employee.GetID() + "," + Action2(action, ","));
			MakeEdgeTable(edges, action, employee);
			//Get PlayerAction
			
			code = Status(action.projectStat.percentageDone);
			req = Status(action.projectStat.requirements);
			val = Status(action.projectStat.sincronismo);
			financial = FinancialStatus(action.projectStat.expenses, action.projectStat.credits);
			if(action.task != "Resign")
			{
				if(action.previous == null)
				{
					playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, action.date, action.taskType, code, req, val, action.projectStat.status, financial));
					pActionID++;
				}
				else
				{
					var prev : ActionNode = action.previous;
					if(prev.taskType != action.taskType)
					{
						playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, prev.date, action.taskType, code, req, val, prev.projectStat.status, financial));
						pActionID++;
					}
					//------
					if(prev.hours < action.hours)
					{
						playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, prev.date, "More_Hours_" + prev.role, code, req, val, prev.projectStat.status, financial));
						pActionID++;
					}
					else if(prev.hours > action.hours)
					{
						playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, prev.date, "Less_Hours_" + prev.role, code, req, val, prev.projectStat.status, financial));
						pActionID++;
					}
					//-----
					if(prev.rate < action.rate)
					{
						playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, prev.date, "More_Rate_" + prev.role, code, req, val, prev.projectStat.status, financial));
						pActionID++;
					}	
					else if	(prev.rate > action.rate)
					{
						playerActions.push(new PlayerAction("pAction" + pActionID, employee.ID, prev.date, "Less_Rate_" + prev.role, code, req, val, prev.projectStat.status, financial));
						pActionID++;
					}	
				}
			}
			action = action.next;
		}
	}
	
	function Status(status : float)
	{
		if(status < 33)
		{
			return "Beginning";
		}
		else if(status < 66)
		{
			return "Middle";
		}
		else
		{
			return "Ending";
		}
	}
	function FinancialStatus(expenses : float, current : float)
	{
		if(current > expenses * 2)
		{
			return "Wealth";
		}
		else if(expenses > current)
		{
			return "Crunch";
		}
		else
		{
			return "Tight";
		}
	}

	function MakeEdgeTable(edges : TextWriter, action : ActionNode, employee : Employee)
	{
		edges.WriteLine("edge" + edgeID + "," + "," + employee.GetID() + "," + "," + "," + "," + action.ID + "," + "," + "," + "default" + "," + playerID);
		edgeID++;
		if(action.artifact == "Prototype")
		{
			//Artifact to action
			edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + "," + action.artID + "," + "1 Prototype Created" + "," + playerID);
			edgeID++;
		}
		if(action.influence.valid)
		{
			var current : InfluenceNode;
			current = action.influence.influence.first;
			while(current != null)
			{
				//Need to check if there was any artifact used
				if(current.action.artifact == "Prototype")
				{
					//Action to artifact
					edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + "," + current.action.artID + "," + "-1 Prototype" + "," + playerID);
					edgeID++;
				}
				else
				{
					//Action to action
					edges.WriteLine("edge" + edgeID + "," + "," + "," + current.action.ID + "," + "," + "," + action.ID + "," + "," + "," + current.action.work + "," + playerID);
					edgeID++;
				}
				current = current.next;
			}
		}
		if(action.projectStat != null)
		{
			//Cost
			if(action.cost != 0)
			{
				line = "edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + (-action.cost) + " Credits" + "," + playerID;	
			}
			else
			{
				line = "edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + "0 Credits: Not enough Credits" + "," + playerID;	
			}
			edges.WriteLine(line);
			edgeID++;
			
			//Work_2
			if(action.work_2 != "")
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + action.work_2 + "," + playerID);
				edgeID++;
			}
			//Work_3
			if(action.work_3 != "")
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + action.work_3 + "," + playerID);
				edgeID++;
			}
			//Work_4
			if(action.work_4 != "")
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + action.work_4 + "," + playerID);
				edgeID++;
			}
			//Work_5
			if(action.work_5 != "")
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + "," + "," + action.projectStat.ID + "," + "," + action.work_5 + "," + playerID);
				edgeID++;
			}
		}
		if(action.previous != null)
		{
			if((action.morale - action.previous.morale) != 0)
			{				
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + employee.ID + "," + "," + "," + "," + (action.morale - action.previous.morale) + " Morale" + "," + playerID);
				edgeID++;
			}
			if((action.stamina - action.previous.stamina) != 0)
			{
				edges.WriteLine("edge" + edgeID + "," + "," + "," + action.ID + "," + "," + employee.ID + "," + "," + "," + "," + (action.stamina - action.previous.stamina) + " Stamina" + "," + playerID);
				edgeID++;
			}
		}
	
	}