#pragma strict
class MarketingMicro extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, playerStats : PlayerStats, marketing : float)
	{
		var randomizer : float = Random.Range (5.0, 7.5);
		var randomizer2 : float = Random.Range (4.0, 6.0);
		var aux : float = marketing * 0.5;
		marketing = parseInt(aux * randomizer2);
		aux = parseInt(aux * randomizer);
		equipe.SetBonusAnalista(aux);
		playerStats.ChangeSaldo(marketing);
		MarketingReport(aux, marketing, report);
		floatingLines.showFloatText1("+", aux.ToString(), "blue", "% Val.");
		floatingLines.showFloatText2("+", marketing.ToString(), "", " Money");
	}
	
	function MarketingReport(val : int, money : int, report : WeeklyReport)
{
	report.marketingReport_val = report.marketingReport_val + val;
	report.marketingReport_money = report.marketingReport_money + money;
}

}