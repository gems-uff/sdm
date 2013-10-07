#pragma strict
//
//Analysis: Allocate employees
//Codification: Allocate employees
//Quality: Allocate employees
//Aid: Analyst, Programmer, Architect

class ManagerMacro extends System.ValueType{
			
	var func : Funcionario;
	var project : Project;
	var report : WeeklyReport;
	var floatingLines : FloatingLines;
	var equipe : Equipe;
	var constant : GameConstants;	
	var gerente : float;
	
	var behavior : BehaviorPlanner;
	var date : GameTime;
	var delay : float;
	var rate : int;
	
	//var planner : ManagerPlanner;
	
	var auxAnaArq : float;
	var auxProg : float;
					
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, gerenteP : float, auxAnaArqP : float, auxProgP : float, behaviorP : BehaviorPlanner, dateP : GameTime, delay : float,
	rate : int)
	{
		
		//var randP : float = Random.Range (0.5, 2.0);
		
		var actionNode : ActionNode = new ActionNode();
		
		this.func = funcP;
		this.project = projectP;
		this.report = reportP;
		this.floatingLines = floatingLinesP;
		this.equipe = equipeP;
		this.constant = constantP;
		this.gerente = gerenteP;
		this.delay = delay;
		this.rate = rate;
		
		behavior = behaviorP;
		date = dateP;

		var chance : float = Random.Range (0.0, 110);
		var randMod : float = Random.Range (-1.5, 0.5);
		var randMod_2 : float = Random.Range (0.5, 2.0);
		
		//Change so a bad manager can actualy produce negative influence
		if(func.GetGerente() < chance)
		{
			//Generate negative influence
			auxAnaArq = parseInt(auxAnaArqP * randMod);
			auxProg = parseInt(auxProgP * randMod);
		}
		else
		{
			//Generate positive influence
			auxAnaArq = parseInt(auxAnaArqP * randMod_2);
			auxProg = parseInt(auxProgP * randMod_2);
		}
		
		
		//planner = equipe.GetComponentInChildren(ManagerPlanner);
		//if(behavior.managerAutonomous)
		//	DecisionTree(actionNode);
		//else
		DecideAid(actionNode);
		actionNode.projectStat = behavior.Log.GetProjectStat();
		return actionNode;
	}
	/*
	//--------------------------------------------
	//Decision Tree
	//--------------------------------------------
	//Only enter when manager has any automony
	function DecisionTree(actionNode : ActionNode)
	{
		if(behavior.managerDecideFocus)
			DecideFocusMode(actionNode, "Auto ");
		else
		{
			CheckFocusMode(actionNode, "Check ");
		}
	}
	
	//--------------------------------------------
	//Decide Focus Mode
	//--------------------------------------------
	//Enter when manager has full autonomy
	function DecideFocusMode(actionNode : ActionNode, task : String)
	{
		if(project.GetRequirements() < 25.0)
		{
			//AnalysisMode
			AnalysisMode(actionNode, task + "Analysis");
		}
		else
		{
			if(project.GetFractionDone() < 60.0)
			{
				//CodificationMode
				CodificationMode(actionNode, task + "Codification");
			}
			else
			{
				if(project.GetFractionDone() > 90.0)
				{
					//QualityMode
					QualityMode(actionNode, task + "Quality");
				}
				else
				{
					//BalancedMode
					BalancedMode(actionNode, task + "Balanced");
				}
			}
		}
	}
	
	//--------------------------------------------
	//Check Focus Mode
	//--------------------------------------------
	//Enter when manager has autonomy but player want to set the Mode
	function CheckFocusMode(actionNode : ActionNode, task : String)
	{
		if(behavior.GetManagerAnalysis())
		{
			//AnalysisMode
			AnalysisMode(actionNode, task + "Analysis");
		}
		else
		{
			if(behavior.GetManagerCodification())
			{
				//CodificationMode
				CodificationMode(actionNode, task + "Codification");
			}
			else
			{
				if(behavior.GetManagerQuality())
				{
					//QualityMode
					QualityMode(actionNode, task + "Quality");
				}
				else
				{
					//BalancedMode
					BalancedMode(actionNode, task + "Balanced");
				}
			}
		}
	}
	
	
	//--------------------------------------------
	//Iteration focus Mode functions
	//--------------------------------------------
	function AnalysisMode(actionNode : ActionNode, task : String)
	{
		var descr : String = "Is on Analysis Mode";
		
		behavior.ActivateAnalysis();
		if(behavior.GetManagerChangedMode())
		{
			planner.AnalysisMode();
			behavior.SetManagerChangedMode(false);
			descr = "Entered Analysis Mode";
		}
		AidAnalyst(actionNode, task, descr);
	}
	function CodificationMode(actionNode : ActionNode, task : String)
	{
		var descr : String = "Is on Codification Mode";
		
		behavior.ActivateCodification();
		if(behavior.GetManagerChangedMode())
		{
			planner.CodificationMode();
			behavior.SetManagerChangedMode(false);
			descr = "Entered Codification Mode";
		}
		AidProgrammer(actionNode, task, descr);
	}
	function QualityMode(actionNode : ActionNode, task : String)
	{
		var descr : String = "Is on Quality Mode";
		behavior.ActivateQuality();
		if(behavior.GetManagerChangedMode())
		{
			planner.QualityMode();
			behavior.SetManagerChangedMode(false);
			descr = "Entered Quality Mode";
		}
		AidArchitect(actionNode, task, descr);
	}
	
	function BalancedMode(actionNode : ActionNode, task : String)
	{
		var descr : String = "Is on Balanced Mode";
		behavior.ActivateBalanced();
		if(behavior.GetManagerChangedMode())
		{
			planner.BalancedMode();
			behavior.SetManagerChangedMode(false);
			descr = "Entered Balanced Mode";
		}
		AidProgrammer(actionNode, task, descr);
	}
	*/
	
	//--------------------------------------------
	//Decide Aid
	//--------------------------------------------
	//Enter when manager makes no Decision on his own
	function DecideAid(actionNode : ActionNode)
	{
		if(behavior.GetManagerAnalyst())
			AidAnalyst(actionNode, "Aid_Analyst", "has no automomy");
		else
		{
			if(behavior.GetManagerArchitect())
				AidArchitect(actionNode, "Aid_Architect", "has no automomy");
			else
				AidProgrammer(actionNode, "Aid_Programmer", "has no automomy");
		}
	}
	
	//--------------------------------------------
	//Aid functions
	//--------------------------------------------
	function AidAnalyst(actionNode : ActionNode, task : String, descr : String)
	{
		var d1 : String = "Manager " + descr + " and aided Analysts";
		var d2 : String = "Manager " + descr + " and aided Analysts";
		var sign : String = "+";
		var color : String = "blue";
		if(auxAnaArq < 0)
		{
			sign = "";
			color = "red";
		}
		equipe.influences.SetBonusAnalystManager(auxAnaArq, actionNode);
		floatingLines.showFloatText1("", "Aid Analyst", "blue", "", delay);
		floatingLines.showFloatText2(sign, auxAnaArq.ToString(), color, " % Analyst.", delay);
		ManagerReport(auxAnaArq, 0, report);
		
		actionNode.NewActionNoArtifact(task, d1, d2, func, date, "Manager", auxAnaArq.ToString() + " % Aid Analyst", rate);
	}
	
	function AidProgrammer(actionNode : ActionNode, task : String, descr : String)
	{
		var d1 : String = "Manager " + descr + " and aided Programmers";
		var d2 : String = "Manager " + descr + " and aided Programmers";
		var sign : String = "+";
		var color : String = "blue";
		if(auxProg < 0)
		{
			sign = "";
			color = "red";
		}
		equipe.influences.SetBonusProgManager(auxProg, actionNode);
		floatingLines.showFloatText1("", "Aid Programmer", "blue", "", delay);
		floatingLines.showFloatText2(sign, auxProg.ToString(), color, " % Prog.", delay);
		ManagerReport(0, auxProg, report);
		
		actionNode.NewActionNoArtifact(task, d1, d2, func, date, "Manager", auxProg.ToString() + " % Aid Programmer", rate);
	}
	
	function AidArchitect(actionNode : ActionNode, task : String, descr : String)
	{
		var d1 : String = "Manager " + descr + " and aided Architects";
		var d2 : String = "Manager " + descr + " and aided Architects";
		var sign : String = "+";
		var color : String = "blue";
		if(auxAnaArq < 0)
		{
			sign = "";
			color = "red";
		}
		equipe.influences.SetBonusArchManager(auxAnaArq, actionNode);
		floatingLines.showFloatText1("", "Aid Architect", "blue", "", delay);
		floatingLines.showFloatText2(sign, auxAnaArq.ToString(), color, " % Arch.", delay);
		ManagerReport(auxAnaArq, 0, report);
		
		actionNode.NewActionNoArtifact(task, d1, d2, func, date, "Manager", auxAnaArq.ToString() + " % Aid Architect", rate);
	}
	//--------------------------------------------
	//Set the action
	//--------------------------------------------
	/*
	function NewAction(actionNode : ActionNode, task : String, description : String)
	{
		actionNode.who = func.GetNome();
		actionNode.task = task;
		actionNode.date = date;
		actionNode.role = "Manager";
		actionNode.description = description;
		actionNode.morale = func.GetMorale();
		actionNode.stamina = func.GetStamina();
	}
	*/
	
	function ManagerReport(design : int, dev : int, report : WeeklyReport)
	{
		report.managerReport_design = report.managerReport_design + design;
		report.managerReport_dev = report.managerReport_dev + dev;
	}

}