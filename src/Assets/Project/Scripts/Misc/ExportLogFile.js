
public var hLog : HistoryLog;
public var projectNode : ProjectNode;
public var path : String = "log.tsv";
public var f : TextWriter;// = new StreamWriter(path);

function RunList(f : TextWriter, action : ActionNode, employee : Employee)
{
	var line : String;
	
	line = Agent(employee) + "\t" + Action(action);
	f.WriteLine("AgAc" + "\t" + line);
		
	while(action.next != null)
	{
		line = Action(action) + "\t" + Action(action.next);
		f.WriteLine("AcAc" + "\t" + line);
		if(action.influence.valid)
		{
			var current : InfluenceNode;
			current = action.influence.influence.first;
			while(current != null)
			{
				//Need to check if there was any artifact used
				if(current.action.artifact != "")
				{
					//Action to artifact
					line = Action(action) + "\t" + Artifact(current.action, current.action.artifact);
					f.WriteLine("IAcAr" + "\t" + line + "\t" + action.influence.num);
					//Artifact to action
					line = Artifact(current.action, current.action.artifact) + "\t" + Action(current.action);
					f.WriteLine("IArAc" + "\t" + line + "\t" + action.influence.num);
				}
				else
				{
					line = Action(action) + "\t" + Action(current.action);
					f.WriteLine("IAcAc" + "\t" + line + "\t" + action.influence.num);
				}
				current = current.next;
			}
		}
		action = action.next;
	}
}

function Action(action : ActionNode)
{
	var id : String;
	var line : String;
	id = action.date.ToString() +" "+ action.who.ToString() +" "+ action.role.ToString();
	line = id + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + action.morale + "\t" +
	action.stamina + "\t" + action.cost + "\t" + action.work;// + "\t" + action.description;
    	
    return line;
}
function Artifact(action : ActionNode, type : String)
{
	var id : String;
	id = action.date.ToString() +" "+ type; 	
    return id;
}
function Agent(employee : Employee)
{
	var id : String;
	id = employee.GetNome();
    return id;
}

function exportLog()
{
    var action : ActionNode;
    f = new StreamWriter(path);
    projectNode = hLog.GetProjectList().last;
    
    //Employee01
    if(projectNode.slot01.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("EMPLOYEE01");
    	action = projectNode.slot01.last.actionList.first;
    	RunList(f, action, projectNode.slot01.last.employee);
    	
    }
    //Employee02
    if(projectNode.slot02.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE02");
    	action = projectNode.slot02.last.actionList.first;
    	RunList(f, action, projectNode.slot02.last.employee);
    	
    }
    //Employee03
    if(projectNode.slot03.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE03");
    	action = projectNode.slot03.last.actionList.first;
    	RunList(f, action, projectNode.slot03.last.employee);
    	
    }
    //Employee04
    if(projectNode.slot04.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE04");
    	action = projectNode.slot04.last.actionList.first;
    	RunList(f, action, projectNode.slot04.last.employee);
    	
    }
    //Employee05
    if(projectNode.slot05.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE05");
    	action = projectNode.slot05.last.actionList.first;
    	RunList(f, action, projectNode.slot05.last.employee);
    	
    }
    //Employee06
    if(projectNode.slot06.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE06");
    	action = projectNode.slot06.last.actionList.first;
    	RunList(f, action, projectNode.slot06.last.employee);
    	
    }
    //Employee07
    if(projectNode.slot07.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE07");
    	action = projectNode.slot07.last.actionList.first;
    	RunList(f, action, projectNode.slot07.last.employee);
    	
    }
    //Employee08
    if(projectNode.slot08.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE08");
    	action = projectNode.slot08.last.actionList.first;
    	RunList(f, action, projectNode.slot08.last.employee);
    	
    }
    //f.WriteLine(spot.SpawnSpotType + "\t" + position.x + "\t" + position.y + "\t" + position.z);
    f.Close();
 }