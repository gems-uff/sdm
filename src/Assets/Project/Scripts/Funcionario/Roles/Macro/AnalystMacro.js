#pragma strict

//Elicitcation: Discovery of new requirements with the client
//Specification: Validation of the requirements with the client and modelling for programmers
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
	private var delay : float;
	private var rate : int;
	
	var behavior : BehaviorPlanner;
	var date : GameTime;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, analistaP : float, behaviorP : BehaviorPlanner, dateP : GameTime, delay : float, rate : int)
	{
		var actionNode : ActionNode = new ActionNode();
		
		this.func = funcP;
		this.project = projectP;
		this.report = reportP;
		this.floatingLines = floatingLinesP;
		this.equipe = equipeP;
		this.constant = constantP;
		this.analista = analistaP;
		
		this.behavior = behaviorP;
		this.date = dateP;
		this.delay = delay;
		this.rate = rate;
		
		var randomizer : float = Random.Range (0.5, 1.5);
		
		if(equipe.influences.GetBonusAnalyst()!= 1.0)
		{
			analista = analista * (1 + equipe.influences.GetBonusAnalyst());
			actionNode.influence = equipe.influences.GetInfluence("Analyst");
		}
		
		val = analista * 1000 / (project.GetProjectSize());
		val = val * randomizer * constant.ANALYST_VAL;
		//val = Mathf.Round(val * 100f) / 100f;
		val = parseInt(val);
		
		randomizer = Random.Range (0.5, 1.5);
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
				//Specification
				Specification(actionNode, "Specification", "Specification");
			}
			else
			{
				if(behavior.GetAnaQuality())
					//Quality
					Quality(actionNode, "Quality", "Quality");
				else
				{
					//Rounded
					//chance = Random.Range (0, 100);
					if(project.GetRequirements() < project.GetElicitation())
						//Specification Path
						Specification(actionNode, "Balanced_Specification", "Balanced");
					else
					{
						//Elicitation path
						Elicitation(actionNode, "Balanced_Elicitation", "Balanced");
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
			val = val * 2.0;
			val = parseInt(val);
			project.UpdateElicitation(val, true);
			AnalistReport(parseInt(val), report);
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated a Prototype";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated a Prototype";
			actionNode.NewAction(task + "_Prototype", d1, d2, func, date, "Analyst", val.ToString() + " Discovery", "", rate);
			
			floatingLines.showFloatText1("", "Elicitation", "blue","", delay);
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Discovery", delay);
		}
		else
		{
			//Validation with Req reviews
			//if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			//{
			
			if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
			{
				val = val * constant.ANALYST_BEGINNING;
			}
			//Update project validation rate
			val = parseInt(val);
			val = project.UpdateElicitation(val, false);
			AnalistReport(val, report);
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated with Reviews";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated with Reviews";
			actionNode.NewAction(task + "_Reviews", d1, d2, func, date, "Analyst", val.ToString() + " Discovery", "", rate);
			
			floatingLines.showFloatText1("", "Elicitation", "blue","", delay);
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Discovery", delay);
			ClientFindBug();
			//}
		}
	}
	
	function Specification(actionNode : ActionNode, task : String, descr : String)
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
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", val.ToString() + " Validation", "", rate);
			Specifying();
		}
		else
		{
			d1= "Employee was ordered to focus on " + descr + "\n and because he was moderate he did discovery"; 
			d2 = "Employee was ordered to focus on " + descr + "<br> and because he was moderate he did discovery";
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", val.ToString() + " Validation", "", rate);
			Specifying();
		}
	}
	
	function Quality(actionNode : ActionNode, task : String, descr : String)
	{
		var randomizer : float = Random.Range (0.0, 1.5);
		var qnt : int = parseInt(analista * randomizer * 0.025);
		var d1 : String = "Employee was ordered to focus on " + descr + "\n and made Acception Test Cases";
		var d2 : String = "Employee was ordered to focus on " + descr + "<br> and made Acception Test Cases";
		if(qnt > 0)
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", qnt.ToString() + " ATC", "Acception Test Cases", rate);
		else
			actionNode.NewAction(task, d1, d2, func, date, "Analyst", qnt.ToString() + " ATC", rate);
		MakeAcceptionCases(actionNode, qnt);
	}
	
	//--------------------------------------------
	//Leaf Nodes
	//--------------------------------------------
	function Specifying()
	{
		//update project model rate
		val = project.ChangeRequirements(val);
		val = parseInt(val);
		//AnalistReport(parseInt(analista), report);
		floatingLines.showFloatText1("", "Specifying", "blue","", delay);
		floatingLines.showFloatText2("+", val.ToString(), "blue", " % Validation", delay);
	}
	/*
	function Documentation()
	{
		Specifying();
	}
	*/
	function MakeAcceptionCases(actionNode : ActionNode, qnt : int)
	{
		if(qnt > 0)
		{
			equipe.SetAcceptionBonus(analista);
			equipe.influences.SetBonusTesterAnalyst(analista, actionNode);
		}
		project.testCases.AddAcception(parseInt(analista * 0.05));
		floatingLines.showFloatText1("", "Test Cases", "blue","", delay);
		floatingLines.showFloatText2("+", qnt.ToString(), "blue"," Testing Case", delay);
		
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
					floatingLines.showFloatText2("", "Found a ", "blue","Bug", delay);
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