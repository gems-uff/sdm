#pragma strict

//Elicitcation: Validation
//Especification: Discovery (Update Validation) and Documentation
//Quality: Aid Tester (Acception)

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
	var date : GameTime;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, analistaP : float, behaviorP : BehaviorPlanner, dateP : GameTime)
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

		if(equipe.influences.GetBonusAnalyst()!= 1.0)
		{
			analista = analista * (1 + equipe.influences.GetBonusAnalyst());
			actionNode.influence = equipe.influences.GetInfluence("Analyst");
		}
		
		val = analista / (project.GetProjectSize() * 0.001);
		val = val * randomizer;
		val = Mathf.Round(val * 100f) / 100f;
		
		randomizer = Random.Range (0.8, 1.2);
		analista = parseInt(randomizer * analista);
		
		DecisionTree(actionNode);
		//Validation();
		//Elicitation();
		//MakeAcceptionCases();
		actionNode.projectStat = behavior.Log.GetProjectStat();
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
		var d1 : String;
		var d2 : String;
		//actionNode.projectStat = behavior.Log.GetProjectStat();
		if(project.GetPrototype() > 0)
		{
			//actionNode.influence = equipe.influences.GetInfluenceAnalystPrototype();
			actionNode.influence = equipe.influences.GetInfluence("Prototype");
			//Validation with Prototype
			project.ConsumePrototype();
			val = val * 1.5;
			project.UpdateElicitation(val, true);
			AnalistReport(parseInt(val), report);
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated a Prototype";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated a Prototype";
			actionNode.NewAction(task + "_Prototype", d1, d2, func, date, "Analyst", val.ToString() + " Val", "");
			
			floatingLines.showFloatText1("", "Validation", "blue","");
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Val.");
		}
		else
		{
			//Validation with Req reviews
			//if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			//{
			
			if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
			{
				val = val * 5;
			}
			//Update project validation rate
			project.UpdateElicitation(val, false);
			AnalistReport(parseInt(val), report);
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated with Reviews";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated with Reviews";
			actionNode.NewAction(task + "_Reviews", d1, d2, func, date, "Analyst", val.ToString() + " Val", "");
			
			floatingLines.showFloatText1("", "Validation", "blue","");
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Val.");
			ClientFindBug();
			//}
		}
	}
	
	function Especification(actionNode : ActionNode, task : String, descr : String)
	{
		var d1 : String;
		var d2 : String;
		//actionNode.projectStat = behavior.Log.GetProjectStat();
		if(func.GetAnalista() > 50)
		{
		/*
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
			*/
			d1 = "Employee was ordered to focus on " + descr + "\n and because he was above moderate he decided to do discovery";
			d2 = "Employee was ordered to focus on " + descr + "<br> and because he was above moderate he decided to do discovery";
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", val.ToString() + " Discovery", "");
			Specifying();
		}
		else
		{
			d1= "Employee was ordered to focus on " + descr + "\n and because he was moderate he did discovery"; 
			d2 = "Employee was ordered to focus on " + descr + "<br> and because he was moderate he did discovery";
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", val.ToString() + " Discovery", "");
			Specifying();
		}
	}
	
	function Quality(actionNode : ActionNode, task : String, descr : String)
	{
		var d1 : String = "Employee was ordered to focus on " + descr + "\n and because he was moderate he did discovery";
		var d2 : String = "Employee was ordered to focus on " + descr + "<br> and because he was moderate he did discovery";
		actionNode.NewAction(task, d1, d2, func, date, "Analyst", val.ToString() + " ATC", "Acception Test Cases");
		MakeAcceptionCases(actionNode);
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
	
	function MakeAcceptionCases(actionNode : ActionNode)
	{
		equipe.SetAcceptionBonus(analista);
		equipe.influences.SetBonusTesterAnalyst(analista, actionNode);
		project.testCases.AddAcception(parseInt(analista * 0.01));
		floatingLines.showFloatText1("", "Test Cases", "blue","");
		floatingLines.showFloatText2("+", analista.ToString(), "blue","% Testing");
		
	}
	
	//--------------------------------------------
	//Auxiliary Functions
	//--------------------------------------------	
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