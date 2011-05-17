

//Variaves de configuracao de desempenho durante o trabalho
public var stringNames : StringNames;
public var equipe : Equipe;
public var project : Project;
public var timer : GameTime;
public var playerStats : PlayerStats;
public var constant : GameConstants;
public var floatingLines : FloatingLines;
public var floatingLinesBelow : FloatingLinesBelow;

public var workingHoursModifier : float = 1.0;
public var maxTrainingDays : int = 14;
private var morale : float = 1.0;		//Valor entre 0.0 e 1.0
private var func : Funcionario;
private var treino : Treinamento;


//--------------------------------------------Get-----------------------------------------------------------
function GetWorkingHoursModifier() {
	return workingHoursModifier;
}

//--------------------------------------------GameModifiers-----------------------------------------------------------

function GameModifiers( aux : float ){
	var cargo_mod : float;
	cargo_mod = AjusteWork();
	aux = aux * cargo_mod * workingHoursModifier * morale;
	return aux;
}

//--------------------------------------------WorkHours-----------------------------------------------------------
//Funcao que calcula o modificardor de producao do funcionario de acordo com as horas que ele trabalha

function WorkHours(){
	var aux : int;
	var newSalary : int;
	if(func.GetNome() != stringNames.fired)
	{
		aux = func.GetWorkingHours();
		aux = aux / 5;
		workingHoursModifier = aux * 12.5;
		workingHoursModifier = workingHoursModifier / 100;
		newSalary = func.GetSalarioDefault();
		newSalary = newSalary * AjusteSalario();
		newSalary = newSalary * workingHoursModifier;
		newSalary = newSalary / 10;		//Para ser 0 na unidade do salario
		newSalary = newSalary * 10;		//Para ser 0 na unidade do salario
		morale = func.GetMoraleforBonus();
		morale = morale / 100;
		if (newSalary < constant.MINPAYMENT)
			func.SetSalario(constant.MINPAYMENT);
		else
			func.SetSalario(newSalary);
	}
}

//--------------------------------------------AjusteSalario-----------------------------------------------------------

function AjusteSalario(){
	var mod : float = 1.0;
	switch(func.GetCargo())
	{
	   case stringNames.jobJunior: 	//caso analista
			mod = constant.JUNIOR_SALARY;
	   break;

	   case stringNames.jobPleno:	//caso arquiteto
			mod = constant.PLENO_SALARY;
	   break;
	   
	   case stringNames.jobSenior:	//caso gerente
			mod = constant.SENIOR_SALARY;
	   break;

	   default:
		  break;
	}
	return mod;
}

//--------------------------------------------AjusteWork-----------------------------------------------------------

function AjusteWork(){
	var mod : float = 1.0;
	switch(func.GetCargo())
	{
	   case stringNames.jobJunior: 	//caso analista
			mod = constant.JUNIOR_MODIFICATOR;
	   break;

	   case stringNames.jobPleno:	//caso arquiteto
			mod = constant.PLENO_MODIFICATOR;
	   break;
	   
	   case stringNames.jobSenior:	//caso gerente
			mod = constant.SENIOR_MODIFICATOR;
	   break;

	   default:
		  break;
	}
	return mod;
}
//--------------------------------------------Work-----------------------------------------------------------

function AnalistaWork(){
	if( func.GetPapel() == stringNames.papelAnalista)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var aux : float = 0.0;
		var analista : float ;
		var randomizer : float = Random.Range (0.5, 1.0);
		
		
		analista = func.GetAnalista();
		if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
		{
			aux = analista * constant.ANALISTA_INICIO * (1 + modificador_positivo - penal);
			project.SetSincronismo(aux);
		}
		else
		{
			if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			{
				aux = analista / (project.GetProjectSize() / 1000) * (1 + modificador_positivo - penal);
				aux = GameModifiers(aux);
				aux = aux * equipe.GetBonusAnalista();
				aux = aux * randomizer;
				aux = Mathf.Round(aux * 100f) / 100f; //Para truncar na segunda casa decimal
				project.SetSincronismo(aux);
				floatingLines.showFloatText("+", aux, " Validation");
			}
		}
	}
}

function ArquitetoWork(){
	if( func.GetPapel() == stringNames.papelArquiteto)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var aux : float = 0.0;
		var arquiteto : float ;
		var randomizer : float = Random.Range (0.8, 1.2);
		var randomizer2 : float = Random.Range (0.8, 1.2);
		
		arquiteto = func.GetArquiteto();	
		aux = arquiteto;
		aux = aux * (1 + modificador_positivo - penal);
		aux = GameModifiers(aux);
		aux = aux * equipe.GetBonusArquiteto();
		aux = (aux * 2);
		aux = parseInt(aux * randomizer);
		equipe.SetFindbugScore(aux);
		arquiteto = parseInt(randomizer2 * aux / 10);
		equipe.SetBonusProg(arquiteto);
		floatingLines.showFloatText("+", aux, "% Bug Find");
		floatingLinesBelow.showFloatText("+", arquiteto.ToString(), "blue", " % Architecture");
	}
}

function GerenteWork(){
	if( func.GetPapel() == stringNames.papelGerente)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var auxAnaArq : float = 0.0;
		var auxArquiteto : float = 0.0;
		var auxProg : float = 0;
		var gerente : float ;
		var penal_prog : float = PenalidadeProgramacao(penal);
		var randomizer : float = Random.Range (0.8, 1.2);
		var randomizer2 : float = Random.Range (0.7, 1.3);
		
		gerente = func.GetGerente();
		auxAnaArq = gerente * constant.GERENTE;
		auxProg = gerente * constant.GERENTE;
		
		auxAnaArq = auxAnaArq * (1 + modificador_positivo - penal);
		auxProg = auxProg * (1 + modificador_positivo - penal_prog);
		auxAnaArq = GameModifiers(auxAnaArq);
		auxProg = GameModifiers(auxProg);
		
		auxAnaArq = parseInt(auxAnaArq * randomizer);
		auxProg = parseInt(auxProg * randomizer2);
		
		equipe.SetBonusAnalista(auxAnaArq);
		equipe.SetBonusArquiteto(auxAnaArq);
		equipe.SetBonusProg(auxProg);
		floatingLines.showFloatText("+", auxAnaArq, "% Design");
		floatingLinesBelow.showFloatText("+", auxProg.ToString(), "blue", " % Dev.");
	}
}

function MarketingWork(){
	if( func.GetPapel() == stringNames.papelMarketing)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var aux : float = 0.0;
		var marketing : float ;
		var randomizer : float = Random.Range (0.8, 1.2);
		var randomizer2 : float = Random.Range (0.6, 1.4);
		
		marketing = func.GetMarketing();	
		aux = marketing * 0.5;
		aux = aux * (1 + modificador_positivo - penal);
		aux = GameModifiers(aux);
		marketing = parseInt(aux * 2 * randomizer2);
		aux = parseInt(aux * randomizer);
		equipe.SetBonusAnalista(aux);
		playerStats.ChangeSaldo(marketing);
		floatingLines.showFloatText("+", aux, "% Val. Bonus");
		floatingLinesBelow.showFloatText("+", marketing.ToString(), "", " Money");
		
	}

}

function ProgramadorWork(){
	if( func.GetPapel() == stringNames.papelProg)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var numBugs : float = 0.0;
		var programador : float ;
		var penal_prog : float = PenalidadeProgramacao(penal);
		var aux : float = 0;
		var random : int;
		var i : int;
		var bugCount : int = 0;
		var variation : int;
		programador = func.GetProgramador();
		
		if (RequisitoLinguagem() == true)
		{
			numBugs = (100.0 - programador ) * constant.PROG_BUG_MOD; //Para acrescentar/reduzir o numero de bugs, os modificadores tem seu papel invertido 
			numBugs = numBugs * (1 + modificador_positivo - penal_prog);
			aux = programador * constant.PROG_LINES_DAY_MOD;
			aux = aux * (1 + modificador_positivo - penal_prog);
			aux = GameModifiers(aux);
			aux = aux * equipe.GetBonusProg();	
			variation = aux * 0.2;
			aux = aux * 0.9;
			aux = aux + Random.Range (0, variation);
			aux = parseInt(aux);
			numBugs = GameModifiers(numBugs);	
			numBugs = parseInt(numBugs);
			if (func.GetWorkingHours() > 0 )
				numBugs = numBugs + 1;
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
			floatingLines.showFloatText("+", aux, " Lines");
			floatingLinesBelow.showFloatText("+", bugCount.ToString(), "red", " Bugs");
		}
	}
}

function TesterWork(){
	if( func.GetPapel() == stringNames.papelTester)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var aux : float;
		var tester : float;
		var penal_prog : float = PenalidadeProgramacao(penal);
		var bugCount : int = 0;
		var i : int;
		var randomizer : float = Random.Range (0.7, 1.0);
		tester = func.GetTester();
		
		if (RequisitoLinguagem() == true)
		{
			aux = tester * constant.TESTER_DURANTE;		//Por parte do tester
			aux = aux * (1 + modificador_positivo - penal_prog);
			aux = GameModifiers(aux);
			aux = aux * equipe.GetFindbugScore();	
			aux = parseInt(aux * randomizer);
			//Chance to remove a bug, to a total of "aux" bugs
			for (i = 0; i < aux; i++)
			{
				random = Random.Range (0, 10);
				if (random > 5)
				{
					bugCount++;
					project.SetNumBugs(-1);
				}
			}
			floatingLines.showFloatText(" -", bugCount, " Bugs");
		}
	}
}

function Treinando(){
	//Quando terminar o treinamento o funcionario ganhará a especializaçao na qual treinou. A duração do treinamento depende do atributo Auto-Didata
	if ( func.GetPapel() == stringNames.papelTreinando)
	{
		var aux : float;
		var trainingTime : int;
		aux = 125 - func.GetAutoDidata();
		aux = aux / 100;
		aux = maxTrainingDays * aux;
		trainingTime = parseInt(aux);
		BroadcastMessage("ShowTrainingBar", trainingTime);
		if ((timer.GetGameTime() > treino.GetDeadline_Treino()) && (treino.GetDeadline_Treino() >0))
		{
			treino.SetDeadline_Treino(0.0);
			treino.Especializando();
			timer.PauseGame();
			floatingLinesBelow.showFloatText("", "", "green", " Training Complete");
		}
	}
}

function PenalidadeProgramacao(penal : float){
	return penal + LinguagemProgEquipe();
}
//--------------------------------------------ReqLinguagem-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto. O valor retornado é 0 ou PENALIDADE
function LinguagemProgEquipe(){
	var modificador : float = constant.PENALIDADE;
	
	switch(equipe.GetLinguagem())
	{
	   case stringNames.esp01: 
		  if (func.GetL_assembly() == true)
				modificador = 0;
	   break;

	   case stringNames.esp02:
		  if (func.GetL_csharp() == true)
				modificador = 0;
	   break;
	   
	   case stringNames.esp03:
		  if (func.GetL_java() == true)
				modificador = 0;
	   break;
	   
	   case stringNames.esp04:
		  if (func.GetL_perl() == true)
				modificador = 0;
	   break;
	   
	   case stringNames.esp05:
			if (func.GetL_ruby() == true)
				modificador = 0;
	   break;
	   
	   default:
			modificador = constant.PENALIDADE;
		  break;
	}
	return modificador;
}

//--------------------------------------------ReqMetodologia-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando. O valor retornado é 0 ou PENALIDADE
function MetodologiaEquipe(){
	var modificador : float = constant.PENALIDADE;
	
	switch(equipe.GetMetodologia())
	{
	   case stringNames.metodo1: 
		   if (func.GetM_agil() == true)
				modificador = 0;
	   break;

	   case stringNames.metodo2:
		   if (func.GetM_classico() == true)
				modificador = 0;
	   break;

	   default:
		  break;
	}
	return modificador;
}

//--------------------------------------------ReqMetodologia-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando. O valor retornado é 0 ou PENALIDADE
function RequisitoLinguagem(){
	var modificador : boolean = false;
	
	switch(project.GetLinguagem())
	{
	   case stringNames.esp01: 
		  if (equipe.GetLinguagem() == stringNames.esp01)
				modificador = true;
	   break;

	   case stringNames.esp02:
		  if (equipe.GetLinguagem() == stringNames.esp02)
				modificador = true;
	   break;
	   
	   case stringNames.esp03:
		  if (equipe.GetLinguagem() == stringNames.esp03)
				modificador = true;
	   break;
	   
	   case stringNames.esp04:
		  if (equipe.GetLinguagem() == stringNames.esp04)
				modificador = true;
	   break;
	   
	   case stringNames.esp05:
			if (equipe.GetLinguagem() == stringNames.esp05)
				modificador = true;
	   break;
	   
	   default:
			modificador = true;
		  break;
	}
	return modificador;
}
//--------------------------------------------ReqFerramenta-----------------------------------------------------------

//Funcao para verificar se o funcionario tera algum modificador positivo de acordo com seu papel e especialidade. O retorno ja é o modificador final somado em 1, ou seja, será sempre retornado um numero >= 1
function EspecializacaoFerramenta (){
	var modificador_positivo : float = 0.0;
	
	switch(func.GetPapel())
	{
	   case stringNames.papelAnalista: 	//caso analista
			if (func.GetF_metricas() == true)			//Se for especializado na ferramenta de metricas entao se benificiará
				modificador_positivo = constant.BONUS;
	   break;

	   case stringNames.papelArquiteto:	//caso arquiteto
			if (func.GetF_programas() == true)		//Se for especializado na ferramenta de analise de programas entao se benificiará
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelGerente:	//caso gerente
			if (func.GetF_projetos() == true)						//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_planejamento() == true)				//Se for especializado na ferramenta de depuracao entao se benificiará
					modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelMarketing:	//caso marketing
			//Nao tem nenhuma
	   break;
	   
	   case stringNames.papelProg:	//caso programador
			if (func.GetF_depuracao() == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelTester:	//caso tester
			if (func.GetF_depuracao() == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_teste() == true)							//Se for especializado na ferramenta de testes entao se benificiará
					modificador_positivo = modificador_positivo + constant.BONUS;
	   break;

	   default:
		  break;
	}
	return modificador_positivo;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
}