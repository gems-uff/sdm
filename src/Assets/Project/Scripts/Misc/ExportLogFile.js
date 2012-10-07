
public var hLog : HistoryLog;
public var projectNode : ProjectNode;
public var path : String = "log.txt";
public var f : TextWriter;// = new StreamWriter(path);


function RunList(f : TextWriter, action : ActionNode)
{
	while(action.next)
	{
    	f.WriteLine("ACTION" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + action.description + 
    	"\t" + action.next.date + "\t" + action.next.who + "\t" + action.next.task + "\t" + action.next.role + "\t" + action.next.description);
    	
    	
    	if(action.influence != null)
    	{
    		switch(action.role)
			{
			   case "Analyst": 
			   		Analyst(action, f);
			   break;
		
			   case "Architect":
			   		Architect(action, f);
			   break;
			   
			   case "Manager":				   
			   break;
			   
			   case "Marketing":				   
			   break;
			   
			   case "Programmer":
			   		Programmer(action, f);				   
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

function Analyst(action : ActionNode, f : TextWriter)
{
	if(action.influence.analystArchInfluence.last.who != "")
		f.WriteLine("INFLUENCE_ANA_ARCH" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + action.influence.analystArchInfluence.last.date + "\t" + action.influence.analystArchInfluence.last.who + 
		"\t" + action.influence.analystArchInfluence.last.task + "\t" + action.influence.analystArchInfluence.last.role + "\t" + 
		action.influence.analystArchInfluence.last.description + "\t" + action.influence.prototype);
	
	if(action.influence.analystManagerInfluence.who != "")
		f.WriteLine("INFLUENCE_ANA_MANA" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + action.influence.analystManagerInfluence.date + "\t" + action.influence.analystManagerInfluence.who + 
		"\t" + action.influence.analystManagerInfluence.task + "\t" + action.influence.analystManagerInfluence.role + "\t" + 
		action.influence.analystManagerInfluence.description + "\t" + action.influence.bonusAnalyst);
	
	if(action.influence.analystMarketingInfluence.who != "")
		f.WriteLine("INFLUENCE_ANA_MARK" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + "\t" + 
		action.description + "\t" + action.influence.analystMarketingInfluence.date + "\t" + action.influence.analystMarketingInfluence.who + 
		"\t" + action.influence.analystMarketingInfluence.task + "\t" + action.influence.analystMarketingInfluence.role + "\t" + 
		action.influence.analystMarketingInfluence.description + "\t" + action.influence.bonusAnalyst);

}

function Architect(action : ActionNode, f : TextWriter)
{
	if(action.influence.archManagerInfluence.who != "")
		f.WriteLine("INFLUENCE_ARC_MANA" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + action.influence.archManagerInfluence.date + "\t" + action.influence.archManagerInfluence.who + 
		"\t" + action.influence.archManagerInfluence.task + "\t" + action.influence.archManagerInfluence.role + "\t" + 
		action.influence.archManagerInfluence.description + "\t" + action.influence.bonusArch);
		
}

function Programmer(action : ActionNode, f : TextWriter)
{
	if(action.influence.progArchInfluence.last.who != "")
		f.WriteLine("INFLUENCE_PROG_ARC" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + action.influence.progArchInfluence.last.date + "\t" + action.influence.progArchInfluence.last.who + 
		"\t" + action.influence.progArchInfluence.last.task + "\t" + action.influence.progArchInfluence.last.role + "\t" + 
		action.influence.progArchInfluence.last.description + "\t" + action.influence.bonusProg);
		
	if(action.influence.progManagerInfluence.who != "")
		f.WriteLine("INFLUENCE_PROG_MANA" + "\t" + action.date + "\t" + action.who + "\t" + action.task + "\t" + action.role + 
		"\t" + action.description + "\t" + action.influence.progManagerInfluence.date + "\t" + action.influence.progManagerInfluence.who + 
		"\t" + action.influence.progManagerInfluence.task + "\t" + action.influence.progManagerInfluence.role + "\t" + 
		action.influence.progManagerInfluence.description + "\t" + action.influence.bonusProg);
}

function exportLog()
{
    var action : ActionNode;
    f = new StreamWriter(path);
    projectNode = hLog.GetProjectList().last;
    
    //Employee01
    if(projectNode.slot01.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("EMPLOYEE01");
    	action = projectNode.slot01.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee02
    if(projectNode.slot02.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE02");
    	action = projectNode.slot02.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee03
    if(projectNode.slot03.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE03");
    	action = projectNode.slot03.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee04
    if(projectNode.slot04.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE04");
    	action = projectNode.slot04.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee05
    if(projectNode.slot05.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE05");
    	action = projectNode.slot05.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee06
    if(projectNode.slot06.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE06");
    	action = projectNode.slot06.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee07
    if(projectNode.slot07.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE07");
    	action = projectNode.slot07.last.actionList.first;
    	RunList(f, action);
    	
    }
    //Employee08
    if(projectNode.slot08.last.employee.GetNome() != "Vacant")
    {
    	f.WriteLine("");
    	f.WriteLine("EMPLOYEE08");
    	action = projectNode.slot08.last.actionList.first;
    	RunList(f, action);
    	
    }
    //f.WriteLine(spot.SpawnSpotType + "\t" + position.x + "\t" + position.y + "\t" + position.z);
    f.Close();
 }