#pragma strict
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
	var date : int;
						
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, programadorP : float, RequisitoLinguagemP : boolean, isEspecializedP : int, behaviorP : BehaviorPlanner, dateP : int)
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
		
		DecisionTree(actionNode);
		//Work on the code in order to expand it
		//Evolution();
		//Work on the code in order to remove bugs
		//Repair();
		
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
		
		NewAction(actionNode, isEsp, isPressured, prog);
		
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			actionNode.task = "Evolution Adhoc";
			Evolution(actionNode);
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				actionNode.task = "Repair Adhoc";
				Repair();
			}
		}
	}
	
	//--------------------------------------------
	//DrawCode, default
	//--------------------------------------------
	function DrawCode(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		NewAction(actionNode, isEsp, isPressured, prog);
		
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			actionNode.task = "Evolution Draw-code";
			Evolution(actionNode);
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				actionNode.task = "Repair Draw-code";
				Repair();
			}
		}
	}
	
	//--------------------------------------------
	//Test-Driven, less produtivity, less bugs, unitary test cases
	//--------------------------------------------
	function TestDriven(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		NewAction(actionNode, isEsp, isPressured, prog);
		
		//Decide which task will be done
		if(behavior.GetProgEvolution())
		{
			actionNode.task = "Evolution Test-Driven";
			Evolution(actionNode);
		}
		else
		{
			if(behavior.GetProgRepair())
			{
				actionNode.task = "Repair Test-Driven";
				Repair();
			}
		}
	}
	
	//--------------------------------------------
	//Refacting, No produtivity, more quality, generate unitary test cases
	//--------------------------------------------
	function Refactoring(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		NewAction(actionNode, isEsp, isPressured, prog);
		actionNode.task = "Refactoring";
	}
	
	
	//--------------------------------------------
	//End Decision tree
	//--------------------------------------------
	
	
	//--------------------------------------------
	//Set the action
	//--------------------------------------------
	function NewAction(actionNode : ActionNode, isEsp : boolean, isPressured : boolean, prog : String)
	{
		//var actionNode : ActionNode = new ActionNode();
		var esp : String = "";
		var pressure : String = "";
		
		if(!isEsp)
			esp = "not";
		if(!isPressured)
			pressure = "not";
		
		actionNode.who = func.GetNome();
		actionNode.date = date;
		//actionNode.who = func.Copy();
		actionNode.role = "Programmer";
		
		if(isPressured)
		{
			actionNode.pressure = behavior.GetPAction();
		}
		else
			actionNode.pressure = null;
		
		actionNode.description = "Employee is " + esp + " especialized, \n is a " + prog + " programmer and \n is " + pressure +" under pressure";
		
		//return actionNode;
	}
	
	//--------------------------------------------
	//Old functions
	//--------------------------------------------
	
	function Evolution(actionNode : ActionNode)
	{
		var random : int;
		var i : int;
		var bugCount : int = 0;
		var maxBugs : float = 0.0;
		var codeLines : float = 0.0;
		var randomizer : float = Random.Range (0.8, 1.2);
		
		codeLines = programador;
		if (RequisitoLinguagem == true && project.GetFractionDone() < 100)
		{			
			//Modify by the architect's bonus
			//codeLines = codeLines * (1 + equipe.GetBonusProg());
			if(equipe.influenceProg.GetBonusProg()!= 1.0)
			{
				codeLines = codeLines * (1 + equipe.influenceProg.GetBonusProg());
				actionNode.influence = equipe.influenceProg.GetInfluence();
				//Debug.Log("Who: " + actionNode.influence.progArchInfluence.who);
			}
			//Apply a small variation
			codeLines = codeLines * randomizer;
			//Cap at model
			//codeLines = codeLines * (project.GetSincronismo() / 100);
						
			maxBugs = (100.0 - func.GetProgramador()) * constant.PROG_BUG_MOD;
			//Debug.Log("MaxBugs1 : " + maxBugs); 
			//Number of bugs is influenced by the code quality
			maxBugs = maxBugs * ( 2 - project.GetCodeQuality());
			//Debug.Log("MaxBugs2 : " + maxBugs);
			//Debug.Log("GetCodeQuality : " + project.GetCodeQuality());
			codeLines = codeLines * constant.PROG_LINES_DAY_MOD;
			
			maxBugs = parseInt(maxBugs);
			//Debug.Log("MaxBugs3 : " + maxBugs);
			codeLines = parseInt(codeLines);
			
			//Cant add bug if you cant code
			if (project.GetSincronismo() == 0 )
				maxBugs = 0;
			else
			{
				if (func.GetWorkingHours() > 0 )
					maxBugs = maxBugs + 1;
				else
					maxBugs = 0;
			}
			//Debug.Log("MaxBugs4 : " + maxBugs);
			//Chance to add bugs, to a total of "maxBugs"
			bugCount = project.RandomizeBugs(maxBugs);
			//Debug.Log("bugCount : " + bugCount);
			
			project.SetLinesDone(codeLines);
			ProgReport(codeLines, 0, report);
			floatingLines.showFloatText1("", "Evolution", "blue", "");
			floatingLines.showFloatText2("+", codeLines.ToString(), "blue", " Progress");			
			//Will be ommited
			floatingLines.showFloatText3("+", bugCount.ToString(), "red", " Bugs");
		}
	}
	
	
	function Repair()
	{
		var random : float;
		var i : int;
		var bugUnitary : int = 0;
		var bugIntegration : int = 0;
		var bugSystem : int = 0;
		var bugAcception : int = 0;
		var t : int = 0.0;
		var repaired : int = 0;
		
		t = parseInt(programador * 0.25);
		
		i = 0;
		//Debug.Log("Repair #Bugs: " + t);
		while(i < t)
		{
			random = Random.Range (0.0, 1.0);
			//Debug.Log("Prog Random = " + random);
			i++;
			if (random < project.GetCodeQuality())
			{ 
				if(project.GetBugUnitaryFound() > project.GetBugUnitaryRepaired())
				{
					project.IncrementBugsRepairedByType(1, 0, 0, 0);
					repaired++;
				}
				else
				{
					if(project.GetBugIntegrationFound() > project.GetBugIntegrationRepaired())
					{
						project.IncrementBugsRepairedByType(0, 1, 0, 0);
						repaired++;
					}
					else
					{
						if(project.GetBugSystemFound() > project.GetBugSystemRepaired())
						{
							project.IncrementBugsRepairedByType(0, 0, 1, 0);
							repaired++;
						}
						else
						{
							if(project.GetBugAcceptionFound() > project.GetBugAcceptionRepaired())
							{
								project.IncrementBugsRepairedByType(0, 0, 0, 1);
								repaired++;
							}
						}
					}
				}
			}
		}
		ProgReport(0, - repaired, report);
		floatingLines.showFloatText1("", "Repair", "blue", "");
		floatingLines.showFloatText2("+", repaired.ToString(), "blue", " Bugs Repaired");
		//project.IncrementBugsRepairedByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
	}
	
	//Function that randomizes the types of bugs inserted in the code by a max o t bugs
	/*
	function RandomizeBugs(t : int)
	{
		var i : int = 0;
		var random : int;
		codeQuality = 4;
		var bugUnitary : int = 0;
		var bugIntegration : int = 0;
		var bugSystem : int = 0;
		var bugAcception : int = 0;
		
		while(i < t)
		{
			random = Random.Range (0, 10);
			if (random > codeQuality)
			{
				i++;
				random = Random.Range (0, 5);
				switch(random)
				{
				   case 1: 
					  bugUnitary++;
				   break;
			
				   case 2:
					  bugIntegration++;
				   break;
				   
				   case 3:
					  bugSystem++;;
				   break;
				   
				   case 4:
					  bugAcception++;
				   break;
				   
				   default:
						bugUnitary++;
					  break;
				}
			}
		}
		project.IncrementBugsByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
		var aux : int;
		aux = (bugUnitary + bugIntegration + bugSystem + bugAcception);
		return aux;
	}
	*/
	function ProgReport(prog : int, bugs : int, report : WeeklyReport)
	{
		report.programmerReport_prog = report.programmerReport_prog + prog;
		report.programmerReport_bug = report.programmerReport_bug + bugs;
	}

}