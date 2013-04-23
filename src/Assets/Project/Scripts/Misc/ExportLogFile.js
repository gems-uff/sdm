
public var hLog : HistoryLog;
public var projectNode : ProjectNode;
public var path : String = "log.tsv";
public var f : TextWriter;// = new StreamWriter(path);

function RunList(f : TextWriter, action : ActionNode, employee : Employee)
{
	var line : String;
		
	while(action != null)
	{
		line = Agent(employee) + "\t" + Action(action);
		f.WriteLine("AgAc" + "\t" + line);
		
		if(action.artifact != "")
		{
			//Artifact to action
			line = Artifact(action, action.artifact) + "\t" + Action(action);
			f.WriteLine("IArAc" + "\t" + line + "\t" + "");
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
					f.WriteLine("IAcAr" + "\t" + line + "\t" + "");
				}
				else
				{
					line = Action(current.action) + "\t" + Action(action);
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
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + (-action.cost) + " Credits";	
			}
			else
			{
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + (-action.cost) + " Credits: Not enough Credits";
			}
			f.WriteLine("AcP" + "\t" + line);
			//Work_2
			if(action.work_2 != "")
			{
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + action.work_2;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_3
			if(action.work_3 != "")
			{
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + action.work_3;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_4
			if(action.work_4 != "")
			{
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + action.work_4;
				f.WriteLine("AcP" + "\t" + line);
			}
			//Work_5
			if(action.work_5 != "")
			{
				line = Action(action) + "\t" + Project(action.projectStat) + "\t" + action.work_5;
				f.WriteLine("AcP" + "\t" + line);
			}
		}
		if(action.previous != null)
		{
			if((action.morale - action.previous.morale) != 0)
			{
				//Edge with morale dif between actions
				line = Action(action.previous) + "\t" + Action(action) + "\t" + (action.morale - action.previous.morale) + " Morale";
				f.WriteLine("AcAc" + "\t" + line);
			}
			if((action.stamina - action.previous.stamina) != 0)
			{
				//Edge with stamina dif between actions
				line = Action(action.previous) + "\t" + Action(action) + "\t" + (action.stamina - action.previous.stamina) + " Stamina";
				f.WriteLine("AcAc" + "\t" + line);
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
	action.stamina + "\t" + action.hours + "\t" + action.cost + "\t" + action.work + "\t" + action.rate + "\t" + action.d2;
    	
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
	employee.atributos.paciencia + "\t" + employee.atributos.raciocinioLogico + "\t" + employee.atributos.relacionamentoHumano + "\t" + 
	employee.especializacao;
    	
    return line;
}
function Project(stat : ProjectStats)
{
	var id : String;
	id = stat.date.ToString() +" "+ stat.name;
	var line : String;
	line = id + "\t" + stat.name + "\t" + stat.date + "\t" + stat.deadline + "\t" + stat.linguagemProgramacao + "\t" + stat.pagamento + "\t" + 
	stat.requirements + "\t" + stat.sincronismo + "\t" + stat.codeQuality + "\t" + stat.percentageDone + "\t" + stat.bugUnitaryFound+ "\t" +
	stat.bugIntegrationFound + "\t" + stat.bugSystemFound + "\t" + stat.bugAcceptionFound + "\t" + stat.bugUnitaryRepaired+ "\t" +
	stat.bugIntegrationRepaired + "\t" + stat.bugSystemRepaired + "\t" + stat.bugAcceptionRepaired + "\t" + stat.credits + "\t" + stat.totalBugs;
		
    return line;
}

function RunProjectNodes(f : TextWriter, node : ProjectStats)
{
	while(node.next != null)
	{
		var income : String = "0";
		line = Project(node) + "\t" + Project(node.next) + "\t" + income;
		f.WriteLine("PP" + "\t" + line);
		//If had any income, create a new edge with its value
		if(node.next.income != 0)
		{
			income = node.next.income + " Credits";
			line = "Client" + "\t" + Project(node) + "\t" + income;
			f.WriteLine("CP" + "\t" + line);
		}
		node = node.next;
	}
}

function RunEmployeeList(node : EmployeeNode)
{
	while(node != null)
	{
		if(node.employee.GetNome() != "Vacant")
		{
			action = node.actionList.first;
			RunList(f, action, node.employee);
			
		}
		node = node.next;
	}
}

function exportLog()
{
    var action : ActionNode;
    f = new StreamWriter(path);
    projectNode = hLog.GetProjectList().last;
    RunProjectNodes(f, projectNode.project.first);
    
    RunEmployeeList(projectNode.slot01.first);
    RunEmployeeList(projectNode.slot02.first);
    RunEmployeeList(projectNode.slot03.first);
    RunEmployeeList(projectNode.slot04.first);
    RunEmployeeList(projectNode.slot05.first);
    RunEmployeeList(projectNode.slot06.first);
    RunEmployeeList(projectNode.slot07.first);
    RunEmployeeList(projectNode.slot08.first);
 
    f.Close();
 }