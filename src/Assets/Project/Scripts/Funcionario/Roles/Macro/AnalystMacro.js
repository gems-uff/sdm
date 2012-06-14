#pragma strict
class AnalystMacro extends System.ValueType{
		
	private var func : Funcionario;
	private var project : Project;
	private var report : WeeklyReport;
	private var floatingLines : FloatingLines;
	private var equipe : Equipe;
	private var constant : GameConstants;
	private var analista : float;
	private var val : float;
	
	var behavior : BehaviorPlanner;
	var date : int;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, analistaP : float, behaviorP : BehaviorPlanner, dateP : int)
	{
		var actionNode : ActionNode = new ActionNode();
		
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		analista = analistaP;
		
		behavior = behaviorP;
		date = dateP;
		
		
		var randomizer : float = Random.Range (0.5, 1.0);
		val = analista / (project.GetProjectSize() * 0.001);
		val = val * randomizer;
		val = Mathf.Round(val * 100f) / 100f;
		
		randomizer = Random.Range (0.8, 1.2);
		analista = parseInt(randomizer * analista);
		
		DecisionTree(actionNode);
		//Validation();
		//Elicitation();
		//MakeAcceptionCases();
		return actionNode;
	}
	
	//--------------------------------------------
	//Decision Tree
	//--------------------------------------------
	function DecisionTree(actionNode : ActionNode)
	{
		var chance : int = Random.Range (0, 100);
		
		if(behavior.GetAnaElicitation())
		{
			//Elicitation
			Elicitation(actionNode, "Elicitation", "Elicitation");
		}
		else
		{
			if(behavior.GetAnaEspecification())
			{
				//Especification
				Especification(actionNode, "Especification", "Especification");
			}
			else
			{
				if(behavior.GetAnaQuality())
					//Quality
					Quality(actionNode, "Quality", "Quality");
				else
				{
					//Rounded
					chance = Random.Range (0, 100);
					if((chance < 50) && project.GetRequirements() < project.GetElicitation())
						//Especification Path
						Especification(actionNode, "Balanced Especification", "Balanced");
					else
					{
						//Elicitation path
						Elicitation(actionNode, "Balanced Elicitation", "Balanced");
					}
				}
			}
		}
	}
	
	
	//--------------------------------------------
	//Decision Paths
	//--------------------------------------------
	function Elicitation(actionNode : ActionNode, task : String, descr : String)
	{
		if(false)
		{
			//Validation with Prototype
			NewAction(actionNode, task + " Prototype", "Employee was ordered to \n focus on " + descr + " \n and validated a Prototype");
		}
		else
		{
			//Validation with Req reviews
			//if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			//{
			NewAction(actionNode, task + " Reviews", "Employee was ordered to \n focus on " + descr + " \n and validated with Reviews");
			if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
			{
				val = val * 5;
			}
			//Update project validation rate
			project.UpdateElicitation(val, false);
			AnalistReport(parseInt(val), report);
			floatingLines.showFloatText1("", "Validation", "blue","");
			floatingLines.showFloatText2("+", analista.ToString(), "blue", " Val.");
			ClientFindBug();
			//}
		}
	}
	
	function Especification(actionNode : ActionNode, task : String, descr : String)
	{
		//Debug.Log("Elicitation");
		if(func.GetAnalista() > 50)
		{
			//Above Moderate
			var chance = Random.Range (0, 100);
			if((chance < 50) && (project.GetRequirements() > 0))
			{
				//Documentation
				//Debug.Log("Documentation");
				NewAction(actionNode, task, "Employee was ordered to \n focus on " + descr + " \n and because he was above moderate \n he made documantation for the model");
				Documentation();
			}
			else
			{
				//Discovery
				//Debug.Log("Discovery");
				NewAction(actionNode, task, "Employee was ordered to \n focus on " + descr + " \n and because he was above moderate \n he decided to do discovery");
				Specifying();
			}
		}
		else
		{
			//Debug.Log("Bad");
			//Bad Analyst
			NewAction(actionNode, task, "Employee was ordered to \n focus on " + descr + " \n and because he was moderate \n he did discovery");
			Specifying();
		}
	}
	
	function Quality(actionNode : ActionNode, task : String, descr : String)
	{
		NewAction(actionNode, task, "Employee was ordered to \n focus on " + descr + " \n and because he was moderate \n he did discovery");
		MakeAcceptionCases();
	}
	
	//--------------------------------------------
	//Leaf Nodes
	//--------------------------------------------
	function Specifying()
	{
		//update project model rate
		project.ChangeRequirements(val);
		//AnalistReport(parseInt(analista), report);
		floatingLines.showFloatText1("", "Discovery", "blue","");
		floatingLines.showFloatText2("+", analista.ToString(), "blue", " Model");
	}
	function Documentation()
	{
		Specifying();
	}
	
	function MakeAcceptionCases()
	{
		equipe.SetAcceptionBonus(analista);
		floatingLines.showFloatText1("", "Test Cases", "blue","");
		floatingLines.showFloatText2("+", analista.ToString(), "blue","% Testing");
		
	}
	
	//--------------------------------------------
	//Auxiliary Functions
	//--------------------------------------------
	
	//--------------------------------------------
	//Set the action
	//--------------------------------------------
	function NewAction(actionNode : ActionNode, task : String, description : String)
	{
		actionNode.who = func.GetNome();
		actionNode.task = task;
		actionNode.date = date;
		actionNode.role = "Analyst";
		actionNode.influence = null;
		actionNode.description = description;
	}
	
	function ClientFindBug()
	{
		var random : int = Random.Range (0, 100);
		if ((random < 20))
		{
			if((project.GetTotalBugs() - project.GetTotalBugsRepaired()) > 0)
			{
				random = Random.Range (0, 100);
				var aux : float;
				aux = (project.GetTotalBugsFound() - project.GetTotalBugsRepaired()) / (project.GetTotalBugs() - project.GetTotalBugsRepaired());
				if(random > (aux * 100))
				{
					//Found a bug that the staff didnt report
					project.RandomizeBugs(1);
					//project.IncrementBugsFoundByType(0, 0, 0, 1);
					floatingLines.showFloatText2("", "Found a ", "blue","Bug");
				}
			}
		}
		/*
		if ((random < 20)&& project.GetBugAcception() > project.GetBugAcceptionFound())
		{
			project.IncrementBugsFoundByType(0, 0, 0, 1);
			floatingLines.showFloatText2("+", analista.ToString(), "blue","Bug");
		}
		*/
	}
	
	function AnalistReport(t : int, report : WeeklyReport)
	{
		report.analistReport = report.analistReport + t;
	}
}