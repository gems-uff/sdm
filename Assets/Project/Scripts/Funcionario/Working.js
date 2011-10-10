

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
private var stamina : float = 1.0;		//Valor entre 0.0 e 1.0
private var morale : float = 1.0;
private var func : Funcionario;
private var treino : Treinamento;

private var report : WeeklyReport;
public var funcWindow : FuncWindow;

function GetReport(){	
	return report;
}
function SetReport(t : WeeklyReport){
	report = t;
}
function AnalistReport(t : int)
{
	report.analistReport = report.analistReport + t;
}
function ArchitectReport(bug : int, archt : int)
{
	report.architectReport_bug = report.architectReport_bug + bug;
	report.architectReport_archt = report.architectReport_archt + archt;
}
function ManagerReport(design : int, dev : int)
{
	report.managerReport_design = report.managerReport_design + design;
	report.managerReport_dev = report.managerReport_dev + dev;
}
function MarketingReport(val : int, money : int)
{
	report.marketingReport_val = report.marketingReport_val + val;
	report.marketingReport_money = report.marketingReport_money + money;
}
function ProgReport(prog : int, bugs)
{
	report.programmerReport_prog = report.programmerReport_prog + prog;
	report.programmerReport_bug = report.programmerReport_bug + bugs;
}
function TesterReport(bug : int)
{
	report.testerReport = report.testerReport + bug;
}
function WeeklyReport()
{
	//Exibo o historico
	
	//Mudo a semana
	func.report.previous3AnalistReport = 					func.report.previous2AnalistReport;
	func.report.previous3ArchitectReport_bug = 		func.report.previous2ArchitectReport_bug;
	func.report.previous3ArchitectReport_archt = 		func.report.previous2ArchitectReport_archt;
	func.report.previous3ManagerReport_design = 		func.report.previous2ManagerReport_design;
	func.report.previous3ManagerReport_dev = 			func.report.previous2ManagerReport_dev;
	func.report.previous3MarketingReport_val = 			func.report.previous2MarketingReport_val;
	func.report.previous3MarketingReport_money = 	func.report.previous2MarketingReport_money;
	func.report.previous3ProgrammerReport_prog = 	func.report.previous2ProgrammerReport_prog;
	func.report.previous3ProgrammerReport_bug = 		func.report.previous2ProgrammerReport_bug;
	func.report.previous3TesterReport = 					func.report.previous2TesterReport;
	
	func.report.previous2AnalistReport = 					func.report.previousAnalistReport;
	func.report.previous2ArchitectReport_bug = 		func.report.previousArchitectReport_bug;
	func.report.previous2ArchitectReport_archt = 		func.report.previousArchitectReport_archt;
	func.report.previous2ManagerReport_design = 		func.report.previousManagerReport_design;
	func.report.previous2ManagerReport_dev = 			func.report.previousManagerReport_dev;
	func.report.previous2MarketingReport_val = 			func.report.previousMarketingReport_val;
	func.report.previous2MarketingReport_money = 	func.report.previousMarketingReport_money;
	func.report.previous2ProgrammerReport_prog = 	func.report.previousProgrammerReport_prog;
	func.report.previous2ProgrammerReport_bug = 		func.report.previousProgrammerReport_bug;
	func.report.previous2TesterReport = 					func.report.previousTesterReport;
	
	func.report.previousAnalistReport = 					func.report.analistReport;
	func.report.previousArchitectReport_bug = 			func.report.architectReport_bug;
	func.report.previousArchitectReport_archt = 		func.report.architectReport_archt;
	func.report.previousManagerReport_design = 		func.report.managerReport_design;
	func.report.previousManagerReport_dev = 			func.report.managerReport_dev;
	func.report.previousMarketingReport_val = 			func.report.marketingReport_val;
	func.report.previousMarketingReport_money = 		func.report.marketingReport_money;
	func.report.previousProgrammerReport_prog = 		func.report.programmerReport_prog;
	func.report.previousProgrammerReport_bug = 		func.report.programmerReport_bug;
	func.report.previousTesterReport = 					func.report.testerReport;
	
	func.report.analistReport = 								report.analistReport;
	func.report.architectReport_bug = 						report.architectReport_bug / 7;
	func.report.architectReport_archt = 					report.architectReport_archt /7;
	func.report.managerReport_dev = 						report.managerReport_dev / 7;
	func.report.managerReport_design = 					report.managerReport_design / 7;
	func.report.marketingReport_val = 						report.marketingReport_val / 7;
	func.report.marketingReport_money = 				report.marketingReport_money;
	func.report.programmerReport_prog = 					report.programmerReport_prog;
	func.report.programmerReport_bug = 					report.programmerReport_bug;
	func.report.testerReport = 								report.testerReport;
	//Reinicio para a proxima semana
	
	
	report.analistReport = 0;
	report.architectReport_bug = 0;
	report.architectReport_archt = 0;
	report.managerReport_design = 0;
	report.managerReport_dev = 0;
	report.marketingReport_val = 0;
	report.marketingReport_money = 0;
	report.programmerReport_prog = 0;
	report.programmerReport_bug = 0;
	report.testerReport = 0;
}
//--------------------------------------------Get-----------------------------------------------------------
function GetWorkingHoursModifier() {
	return workingHoursModifier;
}

//--------------------------------------------GameModifiers-----------------------------------------------------------

function GameModifiers( aux : float ){
	var cargo_mod : float;
	cargo_mod = AjusteWork();
	aux = aux * cargo_mod * workingHoursModifier * stamina * morale;
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
		stamina = func.GetStaminaForBonus();
		stamina = stamina / 100;
		morale = func.GetMoraleForBonus();
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
		
		func.WorkingAnalista();
		
		analista = func.GetAnalista();
		if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
		{
			aux = analista * constant.ANALISTA_INICIO * (1 + modificador_positivo - penal) * randomizer;
			project.SetSincronismo(aux);
			AnalistReport(aux);
			floatingLines.showFloatText("+", aux, " Validation");
			//print("Inicio :" + aux);
		}
		else
		{
			if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			{
				aux = analista / (project.GetProjectSize() * 0.001) * (1 + modificador_positivo - penal);
				aux = GameModifiers(aux);
				aux = aux * equipe.GetBonusAnalista();
				aux = aux * randomizer;
				aux = Mathf.Round(aux * 100f) / 100f; //Para truncar na segunda casa decimal
				project.SetSincronismo(aux);
				AnalistReport(aux);
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
		
		func.WorkingArquiteto();
		
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
		ArchitectReport(aux, arquiteto);
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
		var randomizer : float = Random.Range (2.0, 2.5);
		var randomizer2 : float = Random.Range (1.0, 1.5);
		
		func.WorkingGerente();
		
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
		ManagerReport(auxAnaArq, auxProg);
		floatingLines.showFloatText("+", auxAnaArq, "% Design");
		floatingLinesBelow.showFloatText("+", auxProg.ToString(), "blue", " % Dev.");
	}
}

function MarketingWork(){
	if( func.GetPapel() == stringNames.papelMarketing)
	{
		var penal : float = MetodologiaEquipe();
		var aux : float = 0.0;
		var marketing : float ;
		var randomizer : float = Random.Range (5.0, 7.5);
		var randomizer2 : float = Random.Range (4.0, 6.0);
		
		func.WorkingMarketing();
		
		marketing = func.GetMarketing();	
		aux = marketing * 0.5;
		aux = aux * (1 - penal);
		aux = GameModifiers(aux);
		marketing = parseInt(aux * randomizer2);
		aux = parseInt(aux * randomizer);
		equipe.SetBonusAnalista(aux);
		playerStats.ChangeSaldo(marketing);
		MarketingReport(aux, marketing);
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
		
		func.WorkingProgramador();
		
		if (RequisitoLinguagem() == true && project.GetFractionDone() < 100)
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
			aux = aux * (project.GetSincronismo() / 100);
			aux = parseInt(aux);
			numBugs = GameModifiers(numBugs);	
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
			ProgReport(aux, bugCount);
			floatingLines.showFloatText("+", aux, " Progress");
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
		
		func.WorkingTester();
		
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
			TesterReport(bugCount);
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
			if (func.GetF_metricas() == true)			
				modificador_positivo = constant.BONUS;
	   break;

	   case stringNames.papelArquiteto:	//caso arquiteto
			if (func.GetF_programas() == true)		
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelGerente:	//caso gerente
			if (func.GetF_projetos() == true)						
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_planejamento() == true)			
				modificador_positivo = modificador_positivo + constant.BONUS;
			if (func.GetF_versao() == true)			
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelMarketing:	//caso marketing
			//Nao tem nenhuma
	   break;
	   
	   case stringNames.papelProg:	//caso programador
			if (func.GetF_depuracao() == true)					
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelTester:	//caso tester
			if (func.GetF_depuracao() == true)					
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_teste() == true)						
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
	report.previousAnalistReport = 0;
	report.previousArchitectReport_bug = 0;
	report.previousArchitectReport_archt = 0;
	report.previousManagerReport_design = 0;
	report.previousManagerReport_dev = 0;
	report.previousMarketingReport_val = 0;
	report.previousMarketingReport_money = 0;
	report.previousProgrammerReport_prog = 0;
	report.previousProgrammerReport_bug = 0;
	report.previousTesterReport = 0;
	report.analistReport = 0;
	report.architectReport_bug = 0;
	report.architectReport_archt = 0;
	report.managerReport_design = 0;
	report.managerReport_dev = 0;
	report.marketingReport_val = 0;
	report.marketingReport_money = 0;
	report.programmerReport_prog = 0;
	report.programmerReport_bug = 0;
	report.testerReport = 0;
}