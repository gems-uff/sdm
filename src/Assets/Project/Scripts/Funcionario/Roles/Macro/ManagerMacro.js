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
	private var prov : ExtractProvenance;
					
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, gerenteP : float, auxAnaArqP : float, auxProgP : float, behaviorP : BehaviorPlanner, dateP : GameTime, delay : float,
	rate : int, prov_ : ExtractProvenance)
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
		this.prov = prov_;
		
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
		
		DecideAid(actionNode);
		actionNode.projectStat = behavior.Log.GetProjectStat();
		return actionNode;
	}
	
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
		Provenance(prov, actionNode, auxAnaArq.ToString(), "Aid");
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
		Provenance(prov, actionNode, auxProg.ToString(), "Programmer");
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
		Provenance(prov, actionNode, auxAnaArq.ToString(), "Architect");
	}
	
	function ManagerReport(design : int, dev : int, report : WeeklyReport)
	{
		report.managerReport_design = report.managerReport_design + design;
		report.managerReport_dev = report.managerReport_dev + dev;
	}
	
	function Provenance(prov : ExtractProvenance, actionNode : ActionNode, influence : String, infType : String)
	{
	/*
		prov.AddAttribute("who", actionNode.who);
		prov.AddAttribute("task", actionNode.task);
		prov.AddAttribute("tasktype", actionNode.taskType);
		prov.AddAttribute("role", actionNode.role);
		prov.AddAttribute("rate", actionNode.rate.ToString());
		prov.AddAttribute("morale", actionNode.morale.ToString());
		prov.AddAttribute("stamina", actionNode.stamina.ToString());
		prov.AddAttribute("hours", actionNode.hours.ToString());
		
		prov.NewActivityVertex(actionNode.date, "Action", "");
		prov.HasInfluence("Manager");
		prov.GenerateInfluence(infType, "MANEGER", "Aid", influence + " %");
		prov.GenerateInfluence("Project", "MANEGER", "Credits", actionNode.cost.ToString());
		*/
		prov.HasInfluence("Manager");
		prov.GenerateInfluence(infType, "MANEGER", "Aid", influence + " %");
	}

}