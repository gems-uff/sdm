#pragma strict
class ProgrammerMicro extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, programador : float, RequisitoLinguagem : boolean)
	{
		var random : int;
		var i : int;
		var bugCount : int = 0;
		//var variation : int;
		var numBugs : float = 0.0;
		var randomizer : float = Random.Range (0.8, 1.2);
		
		if (RequisitoLinguagem == true && project.GetFractionDone() < 100)
		{
			var maxBugs : float = 0.0;
			var codeLines : float = 0.0;
			
			codeLines = programador;
			if (RequisitoLinguagem == true && project.GetFractionDone() < 100)
			{			
				//For a small variation during each day
				//variation = codeLines * 0.2;
				codeLines = codeLines * equipe.GetBonusProg();
				codeLines = codeLines * randomizer;
				codeLines = codeLines * (project.GetSincronismo() / 100);
							
				maxBugs = (100.0 - func.GetProgramador()) * constant.PROG_BUG_MOD; 
				programador = codeLines * constant.PROG_LINES_DAY_MOD;
				
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
				//Chance to add a bug, to a total of "numBugs"
				for (i = 0; i < (numBugs); i++)
				{
					random = Random.Range (0, 10);
					if (random > 4)
					{
						bugCount++;
						project.SetNumBugs(1);
					}
				}
				
				project.SetLinesDone(codeLines);
				ProgReport(codeLines, bugCount, report);
				floatingLines.showFloatText1("+", codeLines.ToString(), "blue", " Progress");
				floatingLines.showFloatText2("+", bugCount.ToString(), "red", " Bugs");
			}
		}
			/*
			//Para acrescentar/reduzir o numero de bugs, os modificadores tem seu papel invertido 
			numBugs = (100.0 - func.GetProgramador()) * constant.PROG_BUG_MOD; 
			aux = programador * constant.PROG_LINES_DAY_MOD;
			aux = aux * equipe.GetBonusProg();	
			variation = aux * 0.2;
			aux = aux * 0.9;
			aux = aux + Random.Range (0, variation);
			aux = aux * (project.GetSincronismo() / 100);
			aux = parseInt(aux);
			numBugs = parseInt(numBugs);
			if (project.GetSincronismo() == 0 )
				numBugs = 0;
			else
			{
				if (func.GetWorkingHours() > 0 )
					numBugs = numBugs + 1;
				else
					numBugs = 0;
			}
			//Chance to add a bug, to a total of "numBugs"
			for (i = 0; i < (numBugs); i++)
			{
				random = Random.Range (0, 10);
				if (random > 4)
				{
					bugCount++;
					project.SetNumBugs(1);
				}
			}
			project.SetLinesDone(aux);
			ProgReport(aux, bugCount, report);
			floatingLines.showFloatText1("+", aux.ToString(), "blue", " Progress");
			floatingLines.showFloatText2("+", bugCount.ToString(), "red", " Bugs");
		}
		*/
	}
	
	function ProgReport(prog : int, bugs : int, report : WeeklyReport)
	{
		report.programmerReport_prog = report.programmerReport_prog + prog;
		report.programmerReport_bug = report.programmerReport_bug + bugs;
	}

}