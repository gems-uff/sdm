
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
		//line = Action(action) + "\t" + Action(action.next);
		line = Action(action) + "\t" + Agent(employee);
		f.WriteLine("AcAg" + "\t" + line);
		line = Agent(employee) + "\t" + Action(action.next);
		f.WriteLine("AgAc" + "\t" + line);
		
		if(action.artifact != "")
		{
			//Action to artifact
			line = Action(action) + "\t" + Artifact(action, action.artifact);
			f.WriteLine("IAcAr" + "\t" + line + "\t" + "0");
		}
		
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
					f.WriteLine("IAcAr" + "\t" + line + "\t" + "0");
					//Artifact to action
					line = Artifact(current.action, current.action.artifact) + "\t" + Action(current.action);
					f.WriteLine("IArAc" + "\t" + line + "\t" + "0");
				}
				else
				{
					line = Action(action) + "\t" + Action(current.action);
					f.WriteLine("IAcAc" + "\t" + line + "\t" + action.influence.num);
				}
				current = current.next;
			}
		}
		if(action.projectStat != null)
		{
			line = Action(action) + "\t" + Project(action.projectStat);
			f.WriteLine("AcP" + "\t" + line + "\t" + action.work);
		}
		action = action.next;
	}
	//Added to link the last actionNode to the employee
	line = Action(action) + "\t" + Agent(employee);
	f.WriteLine("AcAg" + "\t" + line);
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

//Can change to only action since type is action.artifact
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
	line = id + "\t" + employee.nome + "\t" + employee.salary + "\t" + employee.job + "\t" + employee.level + "\t" +
	employee.atributos.adaptabilidade + "\t" + employee.atributos.autoDidata + "\t" + employee.atributos.detalhista + "\t" + 
	employee.atributos.negociacao + "\t" + employee.atributos.objetividade + "\t" + employee.atributos.organizacao + "\t" +
	employee.atributos.paciencia + "\t" + employee.atributos.raciocinioLogico + "\t" + employee.atributos.relacionamentoHumano;// + "\t" + action.description;
    	
    return line;
    
    //return id;
}
function Project(stat : ProjectStats)
{
	var id : String;
	id = stat.date.ToString() +" "+ stat.name;
	var line : String;
	line = id + "\t" + stat.name + "\t" + stat.date + "\t" + stat.deadline + "\t" + stat.linguagemProgramacao + "\t" + stat.pagamento + "\t" + 
	stat.projectSize + "\t" + stat.projectQuality + "\t" + stat.codeQuality + "\t" + stat.percentageDone + "\t" + stat.bugUnitaryFound+ "\t" +
	stat.bugIntegrationFound + "\t" + stat.bugSystemFound + "\t" + stat.bugAcceptionFound + "\t" + stat.bugUnitaryRepaired+ "\t" +
	stat.bugIntegrationRepaired + "\t" + stat.bugSystemRepaired + "\t" + stat.bugAcceptionRepaired;// + "\t" + stat.description;
		
    return line;
}

function RunProjectNodes(f : TextWriter, node : ProjectStats)
{
	while(node.next != null)
	{
		line = Project(node) + "\t" + Project(node.next);
		f.WriteLine("PP" + "\t" + line);
		node = node.next;
	}
}
function exportLog()
{
    var action : ActionNode;
    f = new StreamWriter(path);
    projectNode = hLog.GetProjectList().last;
    RunProjectNodes(f, projectNode.project.first);
    
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