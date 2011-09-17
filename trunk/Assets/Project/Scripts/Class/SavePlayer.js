class SavePlayer extends System.ValueType{

	//Player
	public var saldo : int;
	public var diasFaltando : int;
	public var completedProjects : int;
	public var failedProjects : int;
	public var totalIncome : int;
	public var totalExpenses : int;
	public var companyLevel : int;
	public var companyExperience : int;
	
	//Equipe
	public var language : String;
	public var metology : String;
	public var report : WeeklyReport;
	
	//GameTime
	var gameTime : int;

	function GetPlayerVariables(_PlayerStats : PlayerStats, _Pagamentos : Pagamentos, _Equipe : Equipe, _Time : GameTime)
	{
		saldo = _PlayerStats.GetSaldo();
		diasFaltando = _Pagamentos.GetDiasFaltando();
		completedProjects = _PlayerStats.GetCompleted();
		failedProjects = _PlayerStats.GetFailed();
		totalIncome = _PlayerStats.GetIncome();
		totalExpenses = _PlayerStats.GetExpenses();
		companyLevel = _PlayerStats.GetCompany();
		companyExperience = _PlayerStats.GetCompanyExperience();
		
		metology = _Equipe.GetMetodologia();
		language = _Equipe.GetLinguagem();
		
		gameTime = _Time.GetGameTime();
		report = _Equipe.GetReport();
	}
	
	function SetPlayerVariables(_PlayerStats : PlayerStats, _Pagamentos : Pagamentos, _Equipe : Equipe, _Time : GameTime)
	{
		_PlayerStats.SetSaldo(saldo);
		_Pagamentos.SetDiasFaltando(diasFaltando);
		_PlayerStats.SetCompleted(completedProjects);
		_PlayerStats.SetFailed(failedProjects);
		_PlayerStats.SetIncome(totalIncome);
		_PlayerStats.SetExpenses(totalExpenses);
		_PlayerStats.SetCompany(companyLevel);
		_PlayerStats.SetCompanyExperience(companyExperience);
		
		_Equipe.SetMetodologia(metology);
		_Equipe.SetLinguagem(language);
		_Equipe.SetReport(report);
		
		_Time.SetGameTime(gameTime);
	}
}