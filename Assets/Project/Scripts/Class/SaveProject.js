class SaveProject extends System.ValueType{

	public var nome : String;
	public var description : String;
	public var deadline : int;
	public var deadlineDays : int;
	public var maxCodeLines : int;
	public var linguagemProgramacao : String;
	public var pagamento : int;
	public var bugValue : int;
	public var startDay : int;
	public var sincronismo : float;
	public var completed : boolean;
	public var bugs : float;
	public var codeLinesDone : int;

	function GetProjectVariables(_Project : Project)
	{
		nome = _Project.GetNome();
		description = _Project.GetDescription();
		deadline = _Project.GetDeadline();
		deadlineDays = _Project.GetDeadlineDays();
		maxCodeLines = _Project.GetProjectSize();
		linguagemProgramacao = _Project.GetLinguagem();
		pagamento = _Project.GetPagamento();
		bugValue = _Project.GetBugValue();
		startDay = _Project.GetStartDay();
		sincronismo = _Project.GetSincronismo();
		completed = _Project.GetIscomplete();
		bugs = _Project.GetNumBugs();
		codeLinesDone = _Project.GetLinesDone();
	}
	
	function SetProjectVariables(_Project : Project)
	{
		_Project.SetNome(nome);
		_Project.SetDescription(description);
		_Project.SetDeadline(deadline);
		_Project.SetDeadlineDays(deadlineDays);
		_Project.SetProjectSize(maxCodeLines);
		_Project.SetLinguagem(linguagemProgramacao);
		_Project.SetPagamento(pagamento);
		_Project.SetBugValue(bugValue);
		_Project.SetStartDay(startDay);
		_Project.SetSincronismo(sincronismo);
		_Project.SetIscomplete(completed);
		_Project.SetNumBugs(bugs);
		_Project.SetLinesDone(codeLinesDone);
	}
}