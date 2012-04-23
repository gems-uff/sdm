#pragma strict
class ArchitectMacro extends System.ValueType{
			
	private var func : Funcionario;
	private var project : Project;
	private var report : WeeklyReport;
	private var floatingLines : FloatingLines;
	private var equipe : Equipe;
	private var constant : GameConstants;
	private var arquiteto : float;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, arquitetoP : float)
	{
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		arquiteto = arquitetoP;
		
		var randomizer : float = Random.Range (0.8, 1.2);
		
		arquiteto = parseInt(randomizer * arquiteto);
		
		MakePrototype();
		MakeSystemCases();
		MakeIntegrationCases();
		ModularizateCode();
	}
	
	//Makes a prototype for the analyst
	function MakePrototype()
	{
		//ArchitectReport(aux, arquiteto, report);
	}
	
	//Make test cases for system bugs
	function MakeSystemCases()
	{
		equipe.SetSystemBonus(arquiteto);
		floatingLines.showFloatText1("+", arquiteto.ToString(), "blue","% Testing");
		//ArchitectReport(aux, arquiteto, report);
	}
	
	//Make test cases for integration bugs
	function MakeIntegrationCases()
	{
		equipe.SetIntegrationBonus(arquiteto);
		floatingLines.showFloatText1("+", arquiteto.ToString(), "blue","% Testing");
		//ArchitectReport(aux, arquiteto, report);
	}
	
	//Modularizate the code to aid the programmers
	function ModularizateCode()
	{
		equipe.SetBonusProg(arquiteto);
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue", " % Archit.");
	}
	
	function ArchitectReport(bug : int, archt : int, report : WeeklyReport)
	{
		report.architectReport_bug = report.architectReport_bug + bug;
		report.architectReport_archt = report.architectReport_archt + archt;
	}

}