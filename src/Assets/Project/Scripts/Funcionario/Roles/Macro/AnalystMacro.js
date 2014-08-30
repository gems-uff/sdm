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
	private var prov : ExtractProvenance;
	
	var behavior : BehaviorPlanner;
	var date : GameTime;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, analistaP : float, behaviorP : BehaviorPlanner, dateP : GameTime, delay : float, rate : int, prov_ : ExtractProvenance)
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
		this.prov = prov_;
		
		var randomizer : float = Random.Range (0.75, 1.25);
		
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
					chance = Random.Range (0, 100);
					if((chance < 30) || (project.GetRequirements() == 100))
						Quality(actionNode, "Balanced_Quality", "Balanced");
					else if(project.GetRequirements() < project.GetElicitation())
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
		if((project.GetPrototype() > 0) && (project.GetSincronismo() != 0))
		{
			actionNode.influence = equipe.influences.GetInfluence("Prototype");
			//Validation with Prototype
			project.ConsumePrototype();
			val = val * 2.0;
			val = parseInt(val);
			val = project.UpdateElicitation(val, true);
			AnalistReport(parseInt(val), report);
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated a Prototype";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated a Prototype";
			if(val == 0)
			{
				actionNode.NewActionArtifact(task + "_Prototype", d1, d2, func, date, "Analyst", val.ToString() + " Discovery Change", "", rate);
				Provenance(prov, actionNode, "");
			}
			else
			{
				actionNode.NewActionArtifact(task + "_Prototype", d1, d2, func, date, "Analyst", val.ToString() + " Discovery", "", rate);
				Provenance(prov, actionNode, "");
			}
				
			floatingLines.showFloatText1("", "Elicitation", "blue","", delay);
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Discovery", delay);
		}
		else
		{
			if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
			{
				val = val * constant.ANALYST_BEGINNING;
			}
			//Validation with Req reviews
			//if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			//{
			//Update project validation rate
			val = parseInt(val);
			val = project.UpdateElicitation(val, false);
			AnalistReport(val, report);
			var newBug : int = 0;
			newBug = ClientFindBug();
			
			d1 = "Employee was ordered to focus on \n" + descr + "\n and validated with Reviews";
			d2 = "Employee was ordered to focus on " + descr + "<br> and validated with Reviews";
			if(newBug == 0)
			{
				actionNode.NewActionNoArtifact(task + "_Reviews", d1, d2, func, date, "Analyst", val.ToString() + " Discovery", rate);
				Provenance(prov, actionNode, "");
			}
			else
			{
				actionNode.NewActionW3(task + "_Reviews", d1, d2, func, date, "Analyst", val.ToString() + " Discovery", val.ToString() + " Discovery", newBug + " New Bug", rate);
				Provenance(prov, actionNode, "");
			}
			
			floatingLines.showFloatText1("", "Elicitation", "blue","", delay);
			floatingLines.showFloatText2("+", val.ToString(), "blue", " Discovery", delay);
			
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
			actionNode.NewActionArtifact(task, d1, d2, func, date, "Analyst", val.ToString() + " Validation", "", rate);
			Provenance(prov, actionNode, "");
			Specifying();
		}
		else
		{
			d1= "Employee was ordered to focus on " + descr + "\n and because he was moderate he did discovery"; 
			d2 = "Employee was ordered to focus on " + descr + "<br> and because he was moderate he did discovery";
			actionNode.NewActionArtifact(task, d1, d2, func, date, "Analyst", val.ToString() + " Validation", "", rate);
			Provenance(prov, actionNode, "");
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
		{
			actionNode.NewActionArtifact(task, d1, d2, func, date, "Analyst", qnt.ToString() + " ATC", "Acception Test Cases", rate);
			Provenance(prov, actionNode, "");
		}
		else
		{
			actionNode.NewActionNoArtifact(task, d1, d2, func, date, "Analyst", qnt.ToString() + " ATC", rate);
			Provenance(prov, actionNode, "");
		}
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
			equipe.influences.SetBonusTesterAnalyst(analista, actionNode, qnt);
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
					return 1;
				}
			}
		}
		return 0;
	}
	
	function AnalistReport(t : int, report : WeeklyReport)
	{
		report.analistReport = report.analistReport + t;
	}
	
	function Provenance(prov : ExtractProvenance, actionNode : ActionNode, influence)
	{
		//prov.AddAttribute("date", actionNode.date);
		prov.AddAttribute("who", actionNode.who);
		prov.AddAttribute("task", actionNode.task);
		prov.AddAttribute("tasktype", actionNode.taskType);
		prov.AddAttribute("role", actionNode.role);
		prov.AddAttribute("rate", actionNode.rate.ToString());
		prov.AddAttribute("morale", actionNode.morale.ToString());
		prov.AddAttribute("stamina", actionNode.stamina.ToString());
		prov.AddAttribute("hours", actionNode.hours.ToString());
		
		prov.NewActivityVertex(actionNode.date, "Action", "");
		prov.HasInfluence("Analyst");
		//prov.GenerateInfluence("Analyst", "M01", "Aid", "+" + influence + "%");
	}
}