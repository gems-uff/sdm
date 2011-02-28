
//Constantes
//Variaves de configuracao de desempenho durante o trabalho
public var PENALIDADE : float = 0.3;
public var BONUS : float = 0.25;
public var ANALISTA_INICIO : float = 0.8;
public var ANALISTA_DURANTE : float = 0.01;
public var GERENTE_PROG : float = 0.1;
public var GERENTE_ANA : float = 0.2;
public var GERENTE_TEST : float = 0.2;
public var PROG_LINES_DAY_MOD : float = 5;
public var PROG_BUG_MOD : float = 0.02;
public var TESTER_DURANTE : float = 0.5;

private var MINPAYMENT : int = 2000;

//Fim Constantes
private var workingHoursModifier : float = 1.0;
private var morale : float = 100.0;
private var func : Funcionario;
private var treino : Treinamento;
private var equipeObj : GameObject;
private var equipe : Equipe;
private var projectObj : GameObject;
private var project : Project;
private var timerObj : GameObject;
private var timer : GameTime;


function GetWorkingHoursModifier() {
	return workingHoursModifier;
}
/*
function SetWorkingHoursModifier(t: int) {
	workingHoursModifier = t;
}
*/

function GameModifiers( aux : float ){
	aux = aux * workingHoursModifier * morale;
	return aux;
}

//--------------------------------------------WorkHours-----------------------------------------------------------
//Funcao que calcula o modificardor de producao do funcionario de acordo com as horas que ele trabalha

function WorkHours(){
	var aux : int;
	var newSalary : int;
	aux = func.GetWorkingHours();
	aux = aux / 5;
	workingHoursModifier = aux * 12.5;
	workingHoursModifier = workingHoursModifier / 100;
	newSalary = func.GetSalarioDefault();
	newSalary = newSalary * workingHoursModifier;
	newSalary = newSalary / 10;		//Para ser 0 na unidade do salario
	newSalary = newSalary * 10;		//Para ser 0 na unidade do salario
	morale = func.GetMorale();
	morale = morale / 100;
	if (newSalary == 0)
		func.SetSalario(MINPAYMENT);
	else
		func.SetSalario(newSalary);
}

//--------------------------------------------Work-----------------------------------------------------------

function Work(){	//Função que atualiza os campos de projeto conforme a performace do funcionario no seu papel
	var modificador_positivo : float = EspecializacaoFerramenta();	//Resultado é um numero >= 0
	var penal : float = MetodologiaEquipe();	//Resultado é um numero >= 0
	
	switch(func.GetPapel())
	{
	   case "Analyst": 	//caso analista
		  AnalistaWork(modificador_positivo, penal);
	   break;

	   case "Architect":	//caso arquiteto
		  ArquitetoWork(modificador_positivo, penal);
	   break;
	   
	   case "Manager":	//caso gerente
		  GerenteWork(modificador_positivo, penal);
	   break;
	   
	   case "Marketing":	//caso marketing
		  MarketingWork(modificador_positivo, penal);
	   break;
	   
	   case "Programmer":	//caso programador
			ProgramadorWork(modificador_positivo, penal);
	   break;
	   
	   case "Tester":	//caso tester
		  TesterWork(modificador_positivo, penal);
	   break;
	   
	   case "Training":	//caso esteja em treinamento
		  Treinando();
	   break;

	   default:
		  break;
	}
	//SetSalarios();
}

function AnalistaWork(modificador_positivo : float, penal : float){
	var aux : float = 0.0;
	var analista : float ;
	analista = func.GetAnalista();
	
	if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
	{
		aux = analista * ANALISTA_INICIO * (1 + modificador_positivo - penal);
		project.SetSincronismo(aux);
	}
	else
	{
		if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
		{
			aux = analista * ANALISTA_DURANTE * (1 + modificador_positivo - penal);
			
			aux = GameModifiers(aux);	//Modificadores de desempenho por gamespeed, moral e horas de trabalho
			
			project.SetSincronismo(aux);
		}
	}
}

function ArquitetoWork(modificador_positivo : float, penal : float){
	var aux : float = 0.0;
	var arquiteto : float ;
	
	arquiteto = func.GetArquiteto();	
	aux = arquiteto * (1 + modificador_positivo - penal);
	
	aux = GameModifiers(aux);	//Modificadores de desempenho por gamespeed, moral e horas de trabalho
	
	project.SetFindbugScore(aux);
}

function GerenteWork(modificador_positivo : float, penal : float){
	var auxprog : float = 0;
	var auxanalista : float = 0.0;
	var auxtester : float = 0.0;
	var gerente : float ;
	var penal_prog : float = PenalidadeProgramacao(penal);
	var penal_metodo_analista : float = penal;
	
	analista = func.GetAnalista();
	gerente = func.GetGerente();
	auxanalista = gerente * GERENTE_ANA * (1 + modificador_positivo - penal_metodo_analista);
	if (RequisitoLinguagem() == true)
	{
		auxprog = gerente * GERENTE_PROG;
		auxtester = gerente * GERENTE_TEST;
		auxprog = auxprog * (1 + modificador_positivo - penal_prog - LinguagemProgEquipe());
		auxtester = auxtester * (1 + modificador_positivo - penal_prog - LinguagemProgEquipe());
	}
	auxanalista = GameModifiers(auxanalista);
	auxprog = GameModifiers(auxprog);
	auxtester = GameModifiers(auxtester);	
	
	project.SetLinesDone(auxprog);
	project.SetNumBugs(auxtester);
	if(project.GetSincronismo() != 00)
		if(project.GetSincronismo() < 100)
			project.SetSincronismo(auxanalista);
}

function MarketingWork(modificador_positivo : float, penal : float){
	//Fazer
}

function ProgramadorWork(modificador_positivo : float, penal : float){
	var numBugs : float = 0.0;
	var programador : float ;
	var penal_prog : float = PenalidadeProgramacao(penal);
	var aux : float = 0;
	programador = func.GetProgramador();
	
	if (RequisitoLinguagem() == true)
	{
		numBugs = (100.0 - programador ) * PROG_BUG_MOD; //Para acrescentar/reduzir o numero de bugs, os modificadores tem seu papel invertido 
		numBugs = numBugs * (1 + modificador_positivo - penal_prog - LinguagemProgEquipe());
		aux = programador * PROG_LINES_DAY_MOD;
		aux = aux * (1 + modificador_positivo - penal_prog - LinguagemProgEquipe());
		
		//Modificadores de desempenho por gamespeed, moral e horas de trabalho
		aux = GameModifiers(aux);	
		numBugs = GameModifiers(numBugs);	
		
		project.SetNumBugs(numBugs);
		project.SetLinesDone(aux);
	}
}

function TesterWork(modificador_positivo : float, penal : float){
	var aux : float;
	var tester : float;
	var penal_prog : float = PenalidadeProgramacao(penal);
	tester = func.GetTester();
	
	if (RequisitoLinguagem() == true)
	{
		aux = tester * TESTER_DURANTE;		//Por parte do tester
		aux = aux * (1 + modificador_positivo - penal - LinguagemProgEquipe());
		
		//Modificadores de desempenho por gamespeed, moral e horas de trabalho
		aux = GameModifiers(aux);
		aux = -aux * (project.GetFindbugScore() / 100);	//Por parte do arquiteto, o bug score eh de 0 a 100, precisa converter para 0.0 a 1.0
		
		project.SetNumBugs(aux);
	}
}

function Treinando(){
	//Quando terminar o treinamento o funcionario ganhará a especializaçao na qual treinou.
	if ((timer.GetGameTime() > treino.GetDeadline_Treino()) && (treino.GetDeadline_Treino() >0))
	{
		treino.SetDeadline_Treino(0.0);
		treino.Especializando();
	}
}

function PenalidadeProgramacao(penal : float){
	return penal + (PENALIDADE * LinguagemProgEquipe());
}
//--------------------------------------------ReqLinguagem-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto. O valor retornado é 0 ou PENALIDADE
function LinguagemProgEquipe(){
	var modificador : float = PENALIDADE;
	
	switch(equipe.GetLinguagem())
	{
	   case "assembly": 
		  if (func.GetL_assembly() == true)
				modificador = 0;
	   break;

	   case "csharp":
		  if (func.GetL_csharp() == true)
				modificador = 0;
	   break;
	   
	   case "java":
		  if (func.GetL_java() == true)
				modificador = 0;
	   break;
	   
	   case "perl":
		  if (func.GetL_perl() == true)
				modificador = 0;
	   break;
	   
	   case "ruby":
			if (func.GetL_ruby() == true)
				modificador = 0;
	   break;
	   
	   default:
			modificador = PENALIDADE;
		  break;
	}
	return modificador;
}

//--------------------------------------------ReqMetodologia-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando. O valor retornado é 0 ou PENALIDADE
function MetodologiaEquipe(){
	var modificador : float = PENALIDADE;
	
	switch(equipe.GetMetodologia())
	{
	   case "Agile": 
		   if (func.GetM_agil() == true)
				modificador = 0;
	   break;

	   case "Classic":
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
	   case "assembly": 
		  if (equipe.GetLinguagem() == "assembly")
				modificador = true;
	   break;

	   case "csharp":
		  if (equipe.GetLinguagem() == "csharp")
				modificador = true;
	   break;
	   
	   case "java":
		  if (equipe.GetLinguagem() == "java")
				modificador = true;
	   break;
	   
	   case "perl":
		  if (equipe.GetLinguagem() == "perl")
				modificador = true;
	   break;
	   
	   case "ruby":
			if (equipe.GetLinguagem() == "ruby")
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
	   case "Analyst": 	//caso analista
			if (func.GetF_metricas() == true)			//Se for especializado na ferramenta de metricas entao se benificiará
				modificador_positivo = BONUS;
	   break;

	   case "Architect":	//caso arquiteto
			if (func.GetF_programas() == true)		//Se for especializado na ferramenta de analise de programas entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Manager":	//caso gerente
			if (func.GetF_projetos() == true)						//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  BONUS;
			if (func.GetF_planejamento() == true)				//Se for especializado na ferramenta de depuracao entao se benificiará
					modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Marketing":	//caso marketing
	   break;
	   
	   case "Programmer":	//caso programador
			if (func.GetF_depuracao() == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Tester":	//caso tester
			if (func.GetF_depuracao() == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  BONUS;
			if (func.GetF_teste() == true)							//Se for especializado na ferramenta de testes entao se benificiará
					modificador_positivo = modificador_positivo + BONUS;
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
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------FixedUpdate-----------------------------------------------------------
//para ser independente do frame rate de cada maquina.
function FixedUpdate() {
	//if ((timer.GetGameTime() % 7) <5)
	//WorkHours();
	//Work(); 
	//if ((timer.GetGameTime() % 7) == 6)
	//	project.SetFindbugScore(1);
}

