#pragma strict
class AnalystMacro extends System.ValueType{
		
	private var func : Funcionario;
	private var project : Project;
	private var report : WeeklyReport;
	private var floatingLines : FloatingLines;
	private var equipe : Equipe;
	private var constant : GameConstants;
	private var analista : float;
	private var val : float;	
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, analistaP : float)
	{
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		analista = analistaP;
		
		
		var randomizer : float = Random.Range (0.5, 1.0);
		val = analista / (project.GetProjectSize() * 0.001);
		val = val * randomizer;
		val = Mathf.Round(val * 100f) / 100f;
		
		randomizer = Random.Range (0.8, 1.2);
		analista = parseInt(randomizer * analista);
		
		Validation();
		MakeModel();
		MakeAcceptionCases();
	}
	
	function Validation()
	{
		if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
		{
			if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
			{
				val = val * 5;
			}
			//Update project validation rate
			project.UpdateValidation(val);
			AnalistReport(parseInt(val), report);
			floatingLines.showFloatText2("+", analista.ToString(), "blue", " Val.");
			ClientFindBug();
		}
	}
	
	function ClientFindBug()
	{
		var random : int = Random.Range (0, 100);
		if ((random < 20)&& project.GetBugAcception() > project.GetBugAcceptionFound())
		{
			project.IncrementBugsFoundByType(0, 0, 0, 1);
		}
	}
	
	function MakeModel()
	{
		//update project model rate
		project.ChangeModel(val);
		//AnalistReport(parseInt(analista), report);
		floatingLines.showFloatText2("+", analista.ToString(), "blue", " Model");
		
	}
	
	function MakeAcceptionCases()
	{
		equipe.SetAcceptionBonus(analista);
		floatingLines.showFloatText1("+", analista.ToString(), "blue","% Testing");
		
	}
	function AnalistReport(t : int, report : WeeklyReport)
	{
		report.analistReport = report.analistReport + t;
	}
}