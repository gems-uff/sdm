class SaveFuncionario extends System.ValueType{

	public var f_atributos : Atributos;
	public var f_especializacao : Especializacoes;
	public var nome : String;
	public var defaultSalary : int;
	public var salary : int;
	public var role : String;
	public var job : String;
	public var workingHours : int;
	public var morale : float;
	public var stamina : float;
	public var lock : boolean;
	public var deadline : float;
	public var aprendendo : String;
	
	public var level : int;
	public var experience : int;
	//public var requiredExperience : int = level * level * EXPERIENCE_MOD;
	public var days_modifier : int;
	//variaveis referentes aos modificadores de atributos quando subir de level
	public var days_analista : int;
	public var days_arquiteto : int;
	public var days_gerente: int;
	public var days_marketing : int;
	public var days_programador : int;
	public var days_tester : int;
	//Historico de modificadores do level up
	public var aux_adap: int;
	public var aux_auto : int;
	public var aux_det : int;
	public var aux_neg : int;
	public var aux_obj : int;
	public var aux_org : int;
	public var aux_pac : int;
	public var aux_rac : int;
	public var aux_rel : int;
	
	public var report : WeeklyReport;
	public var thisWeekReport : WeeklyReport;

	function GetFuncionarioVariables(func : Funcionario, treinamento : Treinamento)
	{
		var work : Working;
		work = func.GetComponentInChildren(Working);
		f_atributos = func.GetAtributos();
		f_especializacao = func.GetEspecializacao();
		nome = func.GetNome();
		defaultSalary = func.GetSalarioDefault();
		salary = func.GetSalario();
		role = func.GetPapel();
		job = func.GetCargo();
		workingHours = func.GetWorkingHours();
		morale = func.GetMorale();
		stamina = func.GetStamina();
		lock = treinamento.GetLockEscolha();
		deadline = treinamento.GetDeadline_Treino();
		aprendendo = treinamento.GetAprendendo();
		
		level = func.GetLevel();
		experience = func.GetExperience();
		//requiredExperience= level * level * EXPERIENCE_MOD;
		days_modifier = func.GetDaysModifier();

		days_analista = func.GetDaysAnalista();
		days_arquiteto = func.GetDaysArquiteto();
		days_gerente = func.GetDaysGerente();
		days_marketing = func.GetDaysMarketing();
		days_programador = func.GetDaysProgramador();
		days_tester = func.GetDaysTester();
		
		aux_adap = func.GetAdapMod();
		aux_auto = func.GetAutoMod();
		aux_det = func.GetDetMod();
		aux_neg = func.GetNegMod();
		aux_obj = func.GetObjMod();
		aux_org = func.GetOrgMod();
		aux_pac = func.GetPacMod();
		aux_rac = func.GetRacMod();
		aux_rel = func.GetRelMod();
		
		report = func.report;
		thisWeekReport = work.GetReport();
	}
	
	function SetFuncionarioVariables(func : Funcionario, treinamento : Treinamento)
	{
		var work : Working;
		work = func.GetComponentInChildren(Working);
		func.SetAtributos(f_atributos);
		func.SetEspecializacoes(f_especializacao);
		func.SetNome(nome);
		func.SetSalarioDefault(defaultSalary);
		func.SetSalario(salary);
		func.SetPapel(role);
		func.SetCargo(job);
		func.SetWorkingHours(workingHours);
		func.SetMorale(morale);
		func.SetStamina(stamina);
		treinamento.SetLockEscolha(lock);
		treinamento.SetDeadline_Treino(deadline);
		treinamento.SetAprendendo(aprendendo);
		
		func.SetLevel(level);
		func.SetExperience(experience);
		//requiredExperience= level * level * EXPERIENCE_MOD;
		func.SetDaysModifier(days_modifier);

		func.SetDaysAnalista(days_analista);
		func.SetDaysArquiteto(days_arquiteto);
		func.SetDaysGerente(days_gerente);
		func.SetDaysMarketing(days_marketing);
		func.SetDaysProgramador(days_programador);
		func.SetDaysTester(days_tester);
		
		func.SetAdapMod(aux_adap);
		func.SetAutoMod(aux_auto);
		func.SetDetMod(aux_det);
		func.SetNegMod(aux_neg);
		func.SetObjMod(aux_obj);
		func.SetOrgMod(aux_org);
		func.SetPacMod(aux_pac);
		func.SetRacMod(aux_rac);
		func.SetRelMod(aux_rel);
		
		func.report = report;
		work.SetReport(thisWeekReport);
	}
}