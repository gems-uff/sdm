#pragma strict
class Manager extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, gerente : float, auxAnaArq : float, auxProg : float)
	{
		var randomizer : float = Random.Range (2.0, 2.5);
		var randomizer2 : float = Random.Range (1.0, 1.5);
		
		
		auxAnaArq = parseInt(auxAnaArq * randomizer);
		auxProg = parseInt(auxProg * randomizer2);
		
		equipe.SetBonusAnalista(auxAnaArq);
		equipe.SetBonusArquiteto(auxAnaArq);
		equipe.SetBonusProg(auxProg);
		ManagerReport(auxAnaArq, auxProg, report);
		floatingLines.showFloatText1("+", auxAnaArq.ToString(), "blue", "% Design");
		floatingLines.showFloatText2("+", auxProg.ToString(), "blue", " % Dev.");
	}
	
	function ManagerReport(design : int, dev : int, report : WeeklyReport)
{
	report.managerReport_design = report.managerReport_design + design;
	report.managerReport_dev = report.managerReport_dev + dev;
}

}