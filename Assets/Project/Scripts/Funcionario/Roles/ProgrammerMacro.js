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
						
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, programadorP : float, RequisitoLinguagemP : boolean)
	{
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		programador = programadorP;
		RequisitoLinguagem = RequisitoLinguagemP;
		
		//Work on the code in order to expand it
		Evolution();
		//Work on the code in order to remove bugs
		//Repair();
	}
	function Evolution()
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
			codeLines = codeLines * (1 + equipe.GetBonusProg());
			//Apply a small variation
			codeLines = codeLines * randomizer;
			//Cap at model
			codeLines = codeLines * (project.GetSincronismo() / 100);
						
			maxBugs = (100.0 - func.GetProgramador()) * constant.PROG_BUG_MOD; 
			//Number of bugs is influenced by the code quality
			maxBugs = maxBugs * ( 2 - project.GetCodeQuality());
			codeLines = codeLines * constant.PROG_LINES_DAY_MOD;
			
			maxBugs = parseInt(maxBugs);
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
			//Chance to add bugs, to a total of "maxBugs"
			bugCount = RandomizeBugs(maxBugs);
			
			project.SetLinesDone(codeLines);
			ProgReport(codeLines, bugCount, report);
			floatingLines.showFloatText1("+", codeLines.ToString(), "blue", " Progress");
			floatingLines.showFloatText2("+", bugCount.ToString(), "red", " Bugs");
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
		
		t = parseInt(programador / 10);
		
		i = 0;
		Debug.Log("Repair #Bugs: " + t);
		while(i < t)
		{
			random = Random.Range (0.0, 2.0);
			Debug.Log("Prog Random = " + random);
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
		floatingLines.showFloatText1("+", repaired.ToString(), "blue", " Bugs Repaired");
		//project.IncrementBugsRepairedByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
	}
	
	//Function that randomizes the types of bugs inserted in the code by a max o t bugs
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
	function ProgReport(prog : int, bugs : int, report : WeeklyReport)
	{
		report.programmerReport_prog = report.programmerReport_prog + prog;
		report.programmerReport_bug = report.programmerReport_bug + bugs;
	}

}