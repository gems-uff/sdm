
public var hLog : HistoryLog;
public var projectNode : ProjectNode;
public var path : String = "log.txt";
public var f : TextWriter;// = new StreamWriter(path);


function RunList(f : TextWriter, action : ActionNode)
{
	var id : String;
	var id2 : String;
	while(action.next)
	{
		id = action.date.ToString() +" "+ action.who.ToString() +" "+ action.role.ToString();
		id2 = action.next.date.ToString() +" "+ action.next.who.ToString() +" "+ action.next.role.ToString();
    	//f.WriteLine("ACTION" + "\t" + id + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + action.description + 
    	//"\t" + id2 + "\t" + action.next.date + "\t" + action.next.who + "\t" + action.next.task + "\t" + action.next.role + "\t" + action.next.description);
    	f.WriteLine("ACTION" + "\t" + id + "\t" + action.task  + "\t" + id2 + "\t" + action.next.task );
    	
    	if(action.influence != null)
    	{
    		switch(action.role)
			{
			   case "Analyst": 
			   		Analyst(action, f, id);
			   break;
		
			   case "Architect":
			   		Architect(action, f, id);
			   break;
			   
			   case "Manager":				   
			   break;
			   
			   case "Marketing":				   
			   break;
			   
			   case "Programmer":
			   		Programmer(action, f, id);				   
			   break;
			   
			   case "Tester":				   
			   break;
		
			   default:
				  break;
			}
    	}
    	action = action.next;
	}
}

function Analyst(action : ActionNode, f : TextWriter, id : String)
{
	var id2 : String;
	if(action.influence.analystArchInfluence.last.who != "")
	{
		id2 = action.influence.analystArchInfluence.last.date.ToString() +" "+ action.influence.analystArchInfluence.last.who.ToString() +" "+ action.influence.analystArchInfluence.last.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + id + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + id2 + "\t" + action.influence.analystArchInfluence.last.date + "\t" + action.influence.analystArchInfluence.last.who + 
		"\t" + action.influence.analystArchInfluence.last.task + "\t" + action.influence.analystArchInfluence.last.role + "\t" + 
		action.influence.analystArchInfluence.last.description + "\t" + action.influence.prototype);
		*/
		f.WriteLine("INFLUENCE" + "\t" + id2 + "\t" + action.influence.analystArchInfluence.last.task + "\t" + id + "\t" + action.task + "\t" + action.influence.prototype);
	}
	if(action.influence.analystManagerInfluence.who != "")
	{
		id2 = action.influence.analystManagerInfluence.date.ToString() +" "+ action.influence.analystManagerInfluence.who.ToString() +" "+ action.influence.analystManagerInfluence.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + id + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + id2 + "\t" + action.influence.analystManagerInfluence.date + "\t" + action.influence.analystManagerInfluence.who + 
		"\t" + action.influence.analystManagerInfluence.task + "\t" + action.influence.analystManagerInfluence.role + "\t" + 
		action.influence.analystManagerInfluence.description + "\t" + action.influence.bonusAnalyst);
		*/
		f.WriteLine("INFLUENCE" + "\t" + id2 + "\t" + action.influence.analystManagerInfluence.task + "\t" + id + "\t" + action.task + "\t" + action.influence.bonusAnalyst);
	}
	if(action.influence.analystMarketingInfluence.who != "")
	{
		id2 = action.influence.analystMarketingInfluence.date.ToString() +" "+ action.influence.analystMarketingInfluence.who.ToString() +" "+ action.influence.analystMarketingInfluence.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + id + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + id2 + "\t" + action.influence.analystMarketingInfluence.date + "\t" + action.influence.analystMarketingInfluence.who + 
		"\t" + action.influence.analystMarketingInfluence.task + "\t" + action.influence.analystMarketingInfluence.role + "\t" + 
		action.influence.analystMarketingInfluence.description + "\t" + action.influence.bonusAnalyst);
		*/
		f.WriteLine("INFLUENCE" + "\t" + id2 + "\t" + action.influence.analystMarketingInfluence.task + "\t" + id + "\t" + action.task + "\t" + action.influence.bonusAnalyst);
	}
}

function Architect(action : ActionNode, f : TextWriter, id : String)
{
	var id2 : String;
	if(action.influence.archManagerInfluence.who != "")
	{
		id2 = action.influence.archManagerInfluence.date.ToString() +" "+ action.influence.archManagerInfluence.who.ToString() +" "+ action.influence.archManagerInfluence.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + id2 + "\t" + action.influence.archManagerInfluence.date + "\t" + action.influence.archManagerInfluence.who + 
		"\t" + action.influence.archManagerInfluence.task + "\t" + action.influence.archManagerInfluence.role + "\t" + 
		action.influence.archManagerInfluence.description + "\t" + action.influence.bonusArch);
		*/
		f.WriteLine("INFLUENCE" + "\t" + id2 + "\t" + action.influence.archManagerInfluence.task + "\t" + id + "\t" + action.task + "\t" + action.influence.bonusArch);
	}
}

function Programmer(action : ActionNode, f : TextWriter, id : String)
{
	var id2 : String;
	if(action.influence.progArchInfluence.last.who != "")
	{
		id2 = action.influence.progArchInfluence.last.date.ToString() +" "+ action.influence.progArchInfluence.last.who.ToString() +" "+ action.influence.progArchInfluence.last.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + id2 + "\t" + action.influence.progArchInfluence.last.date + "\t" + action.influence.progArchInfluence.last.who + 
		"\t" + action.influence.progArchInfluence.last.task + "\t" + action.influence.progArchInfluence.last.role + "\t" + 
		action.influence.progArchInfluence.last.description + "\t" + action.influence.bonusProg);
		*/
		f.WriteLine("INFLUENCE" + "\t" + id2 + "\t" + action.influence.progArchInfluence.last.task + "\t" + id + "\t" + action.task + "\t" + action.influence.bonusProg);
	}
	if(action.influence.progManagerInfluence.who != "")
	{
		id2 = action.influence.progManagerInfluence.date.ToString() +" "+ action.influence.progManagerInfluence.who.ToString() +" "+ action.influence.progManagerInfluence.role.ToString();
		/*
		f.WriteLine("INFLUENCE" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + id2 + "\t" + action.influence.progManagerInfluence.date + "\t" + action.influence.progManagerInfluence.who + 
		"\t" + action.influence.progManagerInfluence.task + "\t" + action.influence.progManagerInfluence.role + "\t" + 
		action.influence.progManagerInfluence.description + "\t" + action.influence.bonusProg);
		*/
		f.WriteLine("INFLUENCE" + id2 + "\t" + action.influence.progManagerInfluence.task + "\t" + id + "\t" + action.task + "\t" + action.influence.bonusProg);
	}
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
    	RunList(f, action);
    	
    }
    //Employee02
    if(projectNode.slot02.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE02");
    	action = projectNode.slot02.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee03
    if(projectNode.slot03.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE03");
    	action = projectNode.slot03.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee04
    if(projectNode.slot04.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE04");
    	action = projectNode.slot04.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee05
    if(projectNode.slot05.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE05");
    	action = projectNode.slot05.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee06
    if(projectNode.slot06.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE06");
    	action = projectNode.slot06.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee07
    if(projectNode.slot07.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE07");
    	action = projectNode.slot07.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee08
    if(projectNode.slot08.last.employee.GetNome() != "Vacant")
    {
    	//f.WriteLine("");
    	//f.WriteLine("EMPLOYEE08");
    	action = projectNode.slot08.last.actionList.first;
    	RunList(f, action);
    	
    }
    //f.WriteLine(spot.SpawnSpotType + "\t" + position.x + "\t" + position.y + "\t" + position.z);
    f.Close();
 }