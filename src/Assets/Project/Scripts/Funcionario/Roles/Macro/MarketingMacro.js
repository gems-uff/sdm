#pragma strict

//Aid Analyst
//Generate Income

class MarketingMacro extends System.ValueType{
	
						
	var behavior : BehaviorPlanner;
	
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, 
	constant : GameConstants, playerStats : PlayerStats, marketing : float, date : GameTime, behaviorP : BehaviorPlanner, delay : float, rate : int)
	{
		var randomizer_aid : float = Random.Range (-1.5, 0.5);
		var randomizer_aid_2 : float = Random.Range (1.0, 3.0);
		var randomizer_creds : float = Random.Range (2.0, 8.0);
		var aid : float = marketing;
		var credits : int = marketing;
		var actionNode : ActionNode = new ActionNode();
		
		this.behavior = behaviorP;
		//Generate negative influence
		var chance : float = Random.Range (0.0, 110);
		if(func.GetMarketing() < chance)
			aid = parseInt(aid * randomizer_aid);
		else
			aid = parseInt(aid * randomizer_aid_2);
		
		credits = parseInt(credits * randomizer_creds * 2);
		
		var d1 : String = "Marketing Generated Income and aided Analyst, if any";
		var d2 : String = "Marketing Generated Income and aided Analyst, if any";
		var sign : String = "+";
		var color : String = "blue";
		if(aid < 0)
		{
			sign = "";
			color = "red";
		}
		
		actionNode.NewAction("Aid", d1, d2, func, date, "Marketing", aid.ToString() + " % Aid", credits.ToString() + " Credits", "", rate);
		
		equipe.SetBonusAnalista(aid);
		equipe.influences.SetBonusAnalystMarketing(aid, actionNode);
		//equipe.SetBonusAnalystMarketing(aid, actionNode);
		
		playerStats.ChangeSaldo(credits);
		actionNode.projectStat = behavior.Log.GetProjectStat();
		MarketingReport(aid, marketing, report);
		floatingLines.showFloatText1(sign, aid.ToString(), color, "% Analyst", delay);
		floatingLines.showFloatText2("+", credits.ToString(), "", " Credits", delay);
		
		return actionNode;
	}
	
	function MarketingReport(val : int, money : int, report : WeeklyReport)
	{
		report.marketingReport_val = report.marketingReport_val + val;
		report.marketingReport_money = report.marketingReport_money + money;
	}
}