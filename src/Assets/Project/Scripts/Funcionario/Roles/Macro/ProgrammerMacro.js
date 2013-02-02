#pragma strict

//Repair Code
//Develop Code
//Improve Code: Refactoring

class ProgrammerMacro extends System.ValueType{
	var func : Funcionario;
	var project : Project;
	var report : WeeklyReport;
	var floatingLines : FloatingLines;
	var equipe : Equipe;
	var constant : GameConstants;
	var programador : float;
	var RequisitoLinguagem : boolean;
	var codeQuality : int;
	
	var isEspecialized : int;
	var behavior : BehaviorPlanner;
	var date : GameTime;
	var delay : float;
	var rate : int;
						
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, programadorP : float, RequisitoLinguagemP : boolean, isEspecializedP : int, behaviorP : BehaviorPlanner, 
	dateP : GameTime, delay : float, rate : int)
	{
		var actionNode : ActionNode = new ActionNode();
		
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		programador = programadorP;
		RequisitoLinguagem = RequisitoLinguagemP;
		
		isEspecialized = isEspecializedP;
		behavior = behaviorP;
		date = dateP;
		this.delay = delay;
		this.rate = rate;
		
		if(equipe.influences.GetBonusProg()!= 1.0)
		{
			programador = programador * (1 + equipe.influences.GetBonusProg());
			actionNode.influence = equipe.influences.GetInfluence("Programmer");
		}
			
		DecisionTree(actionNode);
		//Work on the code in order to expand it
		//Evolution();
		//Work on the code in order to remove bugs
		//Repair();
		actionNode.projectStat = behavior.Log.GetProjectStat();
		return actionNode;
	}
	
	//--------------------------------------------
	//Decision Tree
	//--------------------------------------------
	function DecisionTree(actionNode : ActionNode)
	{
		var progFactor : int = func.GetProgramador();
		var chance : int = Random.Range (0, 100);
		var quality : float = project.GetCodeQuality();
		//Decide how will perform the task
		
		//Especialized
		if(isEspecialized == 0)
		{
			//Not under pressure
			if(!behavior.GetPressure())
				EspecializedNotUnderPressure(actionNode, progFactor, quality, chance);
			//Under pressure
			else
				EspecializedUnderPressure(actionNode, progFactor, chance);
		}
		//Not Especialized
		else
		{
			//Not under pressure
			if(!behavior.GetPressure())
				NotEspecializedNotUnderPressure(actionNode, progFactor, chance);
			//Under pressure
			else
				NotEspecializedUnderPressure(actionNode, progFactor, chance);
		}
	}
	
	//--------------------------------------------
	//Especialized
	//--------------------------------------------
	//Not Under Pressure
	function EspecializedNotUnderPressure(actionNode : ActionNode, progFactor : int, quality : float, chance : int)
	{
		//Good programmer
		if(progFactor > 75)
		{
			if(chance < 10)
				Adhoc(actionNode, true, false, "good");
			else
			{
				chance = Random.Range (0, 100);
				if(chance < 40)
					DrawCode(actionNode, true, false, "good");
				else
				{
					//quality = project.GetCodeQuality();
					if(quality < 0.5)
						Refactoring(actionNode, true, false, "good");
					else
					{
						chance = Random.Range (0, 100);
						if((chance < 50) && (quality < 1.2))
							Refactoring(actionNode, true, false, "good");
						else
							TestDriven(actionNode, true, false, "good");
					}
				}
			}
		}
		else
		{
			//Moderate programmer
			if(progFactor > 50)
			{
				if(chance < 25)
					Adhoc(actionNode, true, false, "moderate");
				else
				{
					chance = Random.Range (0, 100);
					if((chance < 10) && (quality < 1.0))
						Refactoring(actionNode, true, false, "moderate");
					else
					{
						if(chance < 70)
							DrawCode(actionNode, true, false, "moderate");
						else
							TestDriven(actionNode, true, false, "moderate");
					}
				}
			}	
			else
			{
				//Bad programmer
				if(chance < 40)
					Adhoc(actionNode, true, false, "bad");
				else
					DrawCode(actionNode, true, false, "bad");
			}
		}
	}
	
	//Under Pressure
	function EspecializedUnderPressure(actionNode : ActionNode, progFactor : int, chance : int)
	{
		//Good programmer
		if(progFactor > 75)
		{
			if(chance < 20)
				Adhoc(actionNode, true, true, "good");
			else
				DrawCode(actionNode, true, true, "good");
		}
		else
		{
			//Moderate programmer
			if(progFactor > 50)
			{
				if(chance < 40)
					Adhoc(actionNode, true, true, "moderate");
				else
					DrawCode(actionNode, true, true, "moderate");	
			}
			else
			{
				//Bad programmer
				Adhoc(actionNode, true, true, "bad");
			}
		}
	}
	
	//--------------------------------------------
	//Not Especialized
	//--------------------------------------------
	//Not Under Pressure
	function NotEspecializedNotUnderPressure(actionNode : ActionNode, progFactor : int, chance : int)
	{
		//Good programmer
		if(progFactor > 75)
		{
			if(chance < 20)
				Adhoc(actionNode, false, false, "good");
			else
			{
				chance = Random.Range (0, 100);
				if(chance < 50)
					DrawCode(actionNode, false, false, "good");
				else
					TestDriven(actionNode, false, false, "good");
			}
		}
		else
		{
			//Moderate programmer
			if(progFactor > 50)
			{
				if(chance < 40)
				Adhoc(actionNode, false, false, "moderate");
				else
				{
					chance = Random.Range (0, 100);
					if(chance < 60)
						DrawCode(actionNode, false, false, "moderate");
					else
						TestDriven(actionNode, false, false, "moderate");
				}
			}	
			else
			{
				//Bad programmer
				if(chance < 70)
					Adhoc(actionNode, false, false, "bad");
				else
					DrawCode(actionNode, false, false, "bad");
			}
		}
	}
	
	//Under Pressure
	function NotEspecializedUnderPressure(actionNode : ActionNode, progFactor : int, chance : int)
	{
		//Good programmer
		if(progFactor > 75)
		{
			if(chance < 20)
				Adhoc(actionNode, false, true, "good");
			else
				DrawCode(actionNode, false, true, "good");
		}
		else
		{
			//Moderate programmer
			if(progFactor > 50)
			{
				if(chance < 50)
					Adhoc(actionNode, false, true, "moderate");
				else
					DrawCode(actionNode, false, true, "moderate");	
			}
			else
			{
				//Bad programmer
				Adhoc(actionNode, false, true, "bad");
			}
		}
	}
	
	//-----------------------------------------------------
	//Functions for the end points from the decision tree
	//-----------------------------------------------------
	
	//--------------------------------------------
	//Adhoc, more produtivity, more defects, lower code quality
	//--------------------------------------------
	function Adhoc(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			//actionNode.task = "Evolution Adhoc";
			Evolution(1.5, 4.0, actionNode, isEsp, isPressured, prog, -0.2, "Evolution_Adhoc");
			//ModifyCodeQuality(- 0.2);
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				//actionNode.task = "Repair Adhoc";
				Repair(1.0, 2.0, 1.5, actionNode, isEsp, isPressured, prog, "Repair_Adhoc");
			}
		}
	}
	
	//--------------------------------------------
	//DrawCode, default
	//--------------------------------------------
	function DrawCode(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			//actionNode.task = "Evolution Draw-code";
			Evolution(1.0, 2.0, actionNode, isEsp, isPressured, prog, 0, "Evolution_Draw-code");
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				//actionNode.task = "Repair Draw-code";
				Repair(1.5, 1.0, 0.75, actionNode, isEsp, isPressured, prog, "Repair_Draw-code");
			}
		}
	}
	
	//--------------------------------------------
	//Test-Driven, less produtivity, less bugs, unitary test cases
	//--------------------------------------------
	function TestDriven(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		//Make Unitary Test Cases
		var qnt : int = parseInt(programador * 0.02);
		project.testCases.AddUnitary(qnt);
		actionNode.artifact = "Unitary Test Cases";
		actionNode.work_4 = qnt + " UTC";
		equipe.influences.SetBonusTesterProg(actionNode, qnt);
		
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			//actionNode.task = "Evolution Test-Driven";
			Evolution(0.75, 1.0, actionNode, isEsp, isPressured, prog, 0.1, "Evolution_Test-Driven");
			//ModifyCodeQuality(0.1);
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				//actionNode.task = "Repair Test-Driven";
				Repair(3.0, 0.5, 0.25, actionNode, isEsp, isPressured, prog, "Repair_Test-Driven");
			}
		}
	}
	
	//--------------------------------------------
	//Refacting, No produtivity, more quality, generate unitary test cases
	//--------------------------------------------
	function Refactoring(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		//programador : range from 0 to 350
		//Make Unitary Test Cases	
		var qnt : int = parseInt(programador * 0.03);
		project.testCases.AddUnitary(qnt);
		actionNode.artifact = "Unitary Test Cases";
		actionNode.work_4 = qnt + " UTC";
		equipe.influences.SetBonusTesterProg(actionNode, qnt);
		
		var refact : float = 0.0;
		var progress : boolean = false;
		
		refact = ModifyCodeQuality(1);
		if(refact != 0)
			progress = true;
			
		NewAction(actionNode, isEsp, isPressured, prog, refact.ToString() + " Quality", "", "", "Refactoring", progress);
		floatingLines.showFloatText1("", "Refactoring", "blue", "", delay);
		floatingLines.showFloatText2("+", refact.ToString(), "blue", "% Improved", delay);
	}
	function ModifyCodeQuality(mod : float)
	{
		//mod range from -1 to 1, where 1 equals to refactoring task and negative number will decrease quality
		var randomizer : float = Random.Range (0.5, 1.5);
		var refact : float = 0.0;
		//range must be from 0.965 to 1.035
		refact = 1 + (programador * randomizer * 0.0001 * mod);
		refact = project.ChangeCodeQuality(refact);
		return refact;
	}
	//--------------------------------------------
	//End Decision tree
	//--------------------------------------------
	
	//--------------------------------------------
	//Old functions
	//--------------------------------------------
	
	function Evolution(modCode : float, modBug : float, actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String, 
	qualityMod : float, task : String)
	{
		//modCode : MOdify the number of lines produced
		//modBug : Modify the number of possible new bugs inserted
		var random : int;
		var i : int;
		var bugCount : int = 0;
		var maxBugs : float = 0;
		var codeLines : float = 0.0;
		var randomizer : float = Random.Range (0.5, 1.5);
		
		codeLines = programador;
		if (RequisitoLinguagem == true && project.GetFractionDone() < 100)
		{			
			//Apply a small variation
			codeLines = codeLines * randomizer * modCode;
			//Cap at model
			codeLines = codeLines * constant.PROG_LINES_DAY_MOD;
			codeLines = parseInt(codeLines);			
			codeLines = project.SetLinesDone(codeLines);
			
			var refact : float = 0;
			var progress : boolean = false;
			if(codeLines > 0)
			{
				refact = ModifyCodeQuality(qualityMod);
				//refact = (Mathf.Floor(refact * 1000)) * 0.001;
				progress = true;
				//Cant add bug if you cant code
				if ((project.GetSincronismo() > 0 ) && (func.GetWorkingHours() > 0 ))
				{
					//Debug.Log("BUGS!");
					maxBugs = (100.0 - func.GetProgramador()) * constant.PROG_BUG_MOD * modBug;
					//Number of bugs is influenced by the code quality
					maxBugs = maxBugs * ( 200 - project.GetCodeQuality()) * 0.01;
					maxBugs = parseInt(maxBugs + 1);
					//Chance to add bugs, to a total of "maxBugs"
					//Debug.Log("maxBugs: "+maxBugs);
					bugCount = project.RandomizeBugs(maxBugs);
					//Debug.Log("bugCount: "+bugCount);
				}
			}
			
			ProgReport(codeLines, 0, report);
			NewAction(actionNode, isEsp, isPressured, prog, codeLines.ToString() + " Progress", refact.ToString() + " Quality", 
			bugCount.ToString() + " New Bug", task, progress);
			
			floatingLines.showFloatText1("", "Evolution", "blue", "", delay);
			floatingLines.showFloatText2("+", codeLines.ToString(), "blue", " Progress", delay);		
			//Will be ommited
			//floatingLines.showFloatText3("+", bugCount.ToString(), "red", " Bugs", delay);
		}
		else
		{
			NewAction(actionNode, isEsp, isPressured, prog, "Idle", "Idle", "", task, progress);
		}
	}
	
	
	function Repair(modRepair : float, modQuantity : float, modIntroduce : float, actionNode : ActionNode, isEsp : boolean, 
	isPressured : boolean, prog : String, task : String)
	{
		//t : Number of attempts to repair bugs each day
		//modRepair : Modify the probability to repair a bug for each attempt
		//modQuantity : Modify the quantity of attempts per day
		//modIntroduce : Modify the probability to insert new bug after repairing
		var random : float;
		var i : int;
		var bugUnitary : int = 0;
		var bugIntegration : int = 0;
		var bugSystem : int = 0;
		var bugAcception : int = 0;
		var t : int = 0.0;
		var repaired : int = 0;
		var newBugs : int = 0;
		
		t = parseInt(programador * 0.05 * modQuantity * constant.PROGRAMMER_REPAIR); //from 0.25 to 0.05
		
		i = 0;
		//Debug.Log("Repair #Bugs: " + t);
		while(i < t)
		{
			random = Random.Range (0.0, 1.0);
			//Debug.Log("Prog Random = " + random);
			i++;
			if (random < (project.GetCodeQuality() * modRepair))
			{ 
				if(project.GetBugUnitaryFound() > project.GetBugUnitaryRepaired())
				{
					newBugs += project.IncrementBugsRepairedByType(1, 0, 0, 0, modIntroduce);
					repaired++;
				}
				else
				{
					if(project.GetBugIntegrationFound() > project.GetBugIntegrationRepaired())
					{
						newBugs += project.IncrementBugsRepairedByType(0, 1, 0, 0, modIntroduce);
						repaired++;
					}
					else
					{
						if(project.GetBugSystemFound() > project.GetBugSystemRepaired())
						{
							newBugs += project.IncrementBugsRepairedByType(0, 0, 1, 0, modIntroduce);
							repaired++;
						}
						else
						{
							if(project.GetBugAcceptionFound() > project.GetBugAcceptionRepaired())
							{
								newBugs += project.IncrementBugsRepairedByType(0, 0, 0, 1, modIntroduce);
								repaired++;
							}
						}
					}
				}
			}
		}
		ProgReport(0, - repaired, report);
		
		var progress : boolean = false;
		if(repaired > 0)
			progress = true;
		if(newBugs > 0)	
			NewAction(actionNode, isEsp, isPressured, prog, repaired.ToString() + " Repaired", "", newBugs.ToString() + " New Bug",task, progress);
		else
			NewAction(actionNode, isEsp, isPressured, prog, repaired.ToString() + " Repaired", "", "",task, progress);
		
		floatingLines.showFloatText1("", "Repair", "blue", "", delay);
		floatingLines.showFloatText2("+", repaired.ToString(), "blue", " Bugs Repaired", delay);
		//project.IncrementBugsRepairedByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
	}
	
	function ProgReport(prog : int, bugs : int, report : WeeklyReport)
	{
		report.programmerReport_prog = report.programmerReport_prog + prog;
		report.programmerReport_bug = report.programmerReport_bug + bugs;
	}
	
	//--------------------------------------------
	//Set the action
	//--------------------------------------------
	function NewAction(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String, work : String, work_2 : String, work_5 : String, 
	task : String, progress : boolean)
	{
		var esp : String = "";
		var pressure : String = "";
		
		if(!isEsp)
			esp = "not";
		if(!isPressured)
			pressure = "not";
		/*
		if(isPressured)
		{
			actionNode.pressure = behavior.GetPAction();
		}
		else
			actionNode.pressure = null;
		*/
		var d1 : String = "Employee is " + esp + " especialized, is a " + prog + " programmer and \n is " + pressure +" under pressure";
		var d2 : String = "Employee is " + esp + " especialized, is a " + prog + " programmer and <br> is " + pressure +" under pressure";
		//actionNode.NewAction(task, d1, d2, func, date, "Programmer", work, work, work_2, "");
		if(progress)
			actionNode.NewAction(task, d1, d2, func, date, "Programmer", work, work, work_2, actionNode.work_4, work_5, actionNode.artifact, rate);
		else
			actionNode.NewAction(task, d1, d2, func, date, "Programmer", work, "0 Change", actionNode.artifact, rate);
	}
}