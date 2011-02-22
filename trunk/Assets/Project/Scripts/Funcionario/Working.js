
//Constantes
//Variaves de configuracao de desempenho durante o trabalho
private var PENALIDADE : float = 0.3;
private var BONUS : float = 0.25;
private var ANALISTA_INICIO : float = 0.8;
private var ANALISTA_DURANTE : float = 0.00001;
private var GERENTE_PROG : float = 0.125;
private var GERENTE_ANA : float = 0.00000125;
private var GERENTE_TEST : float = 0.0000000625;
private var PROG_DURANTE : float = 0.000022;
private var TESTER_DURANTE : float = 0.0000007;

//Valores para Salarios
//Valores retirados de http://info.abril.com.br/professional/salarios/
private var ANALISTA_SALARIO_JUNIOR : int = 4800;
private var ARQUITETO_SALARIO_JUNIOR : int = 3000;
private var GERENTE_SALARIO_JUNIOR : int = 15600;
private var MARKETING_SALARIO_JUNIOR : int = 2000;
private var PROGRAMADOR_SALARIO_JUNIOR : int = 2500;
private var TESTER_SALARIO_JUNIOR : int = 2500;

//Valor do salario é dividido por 14 para pagar dia sim dia nao

private var ANALISTA_SALARIO_PLENO : int = 450;			//6300
private var ARQUITETO_SALARIO_PLENO : int = 300;		//4200
private var GERENTE_SALARIO_PLENO : int = 1300;			//18100
private var MARKETING_SALARIO_PLENO : int = 245;		//3400
private var PROGRAMADOR_SALARIO_PLENO : int = 275;	//3800
private var TESTER_SALARIO_PLENO : int = 250;				//3500

private var ANALISTA_SALARIO_SENIOR : int = 7600;
private var ARQUITETO_SALARIO_SENIOR : int = 5500;
private var GERENTE_SALARIO_SENIOR : int = 22500;
private var MARKETING_SALARIO_SENIOR : int = 4100;
private var PROGRAMADOR_SALARIO_SENIOR : int = 5500;
private var TESTER_SALARIO_SENIOR : int = 5000;

private var STANDBY_SALARIO : int = 100;
//Fim Constantes

private var func : Funcionario;
private var treino : Treinamento;
private var equipeObj : GameObject;
private var equipe : Equipe;
private var projectObj : GameObject;
private var project : Project;


//--------------------------------------------Work-----------------------------------------------------------

function Work(){	//Função que atualiza os campos de projeto conforme a performace do funcionario no seu papel
	var modificador_positivo : float = EspecializacaoFerramenta();	//Resultado é um numero >= 0
	var penal : float = MetodologiaEquipe();	//Resultado é um numero >= 0
		
	switch(func.GetPapel())
	{
	   case "Analista": 	//caso analista
		  AnalistaWork(modificador_positivo, penal);
	   break;

	   case "Arquiteto":	//caso arquiteto
		  ArquitetoWork(modificador_positivo, penal);
	   break;
	   
	   case "Gerente":	//caso gerente
		  GerenteWork(modificador_positivo, penal);
	   break;
	   
	   case "Marketing":	//caso marketing
		  MarketingWork(modificador_positivo, penal);
	   break;
	   
	   case "Programador":	//caso programador
			ProgramadorWork(modificador_positivo, penal);
	   break;
	   
	   case "Testador":	//caso tester
		  TesterWork(modificador_positivo, penal);
	   break;
	   
	   case "Treinamento":	//caso esteja em treinamento
		  Treinando();
	   break;

	   default:
		  break;
	}
	SetSalarios();
}

function AnalistaWork(modificador_positivo : float, penal : float){
	var aux : float = 0.0;
	var analista : float ;
	analista = func.GetAnalista();
	
	if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
	{
		aux = analista * ANALISTA_INICIO * (1 + modificador_positivo - penal);
		if (Time.timeScale != 0 )
		{
			aux = aux / Time.timeScale;
			project.SetSincronismo(aux);
		}
	}
	else
	{
		if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
		{
			aux = analista * ANALISTA_DURANTE * (1 + modificador_positivo - penal) / Time.timeScale;
			project.SetSincronismo(aux);
		}
	}
}

function ArquitetoWork(modificador_positivo : float, penal : float){
	var aux : float = 0.0;
	var arquiteto : float ;
	
	arquiteto = func.GetArquiteto();	
	aux = arquiteto * (1 + modificador_positivo - penal);
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
	auxanalista = gerente * GERENTE_ANA * (1 + modificador_positivo - penal_metodo_analista) / Time.timeScale;
	if (RequisitoLinguagem() == true)
	{
		auxprog = gerente * GERENTE_PROG * (1 + modificador_positivo - penal_prog) / Time.timeScale;
		auxprog = auxprog * LinguagemProgEquipe();
		auxtester = gerente * GERENTE_TEST * (1 + modificador_positivo - penal_prog) / Time.timeScale;
		auxtester = auxtester * LinguagemProgEquipe();
	}
	if(project.GetSincronismo() != 00)
		if(project.GetSincronismo() < 100)
			project.SetSincronismo(auxanalista);
	project.SetLinesDone(auxprog);
	project.SetNumBugs(auxtester);
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
		numBugs = (100.0 - programador ) * PROG_DURANTE * (1.0 - modificador_positivo + penal_prog) / Time.timeScale; //Para acrescentar/reduzir o numero de bugs, os modificadores tem seu papel invertido 
		numBugs = numBugs * LinguagemProgEquipe();
		aux = programador * (1 + modificador_positivo - penal_prog) / Time.timeScale;
		aux = aux * LinguagemProgEquipe();
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
		aux = tester * TESTER_DURANTE * (1 + modificador_positivo - penal) / Time.timeScale;		//Por parte do tester
		aux = -aux * (project.GetFindbugScore());	//Por parte do arquiteto
		aux = aux * LinguagemProgEquipe();
		project.SetNumBugs(aux);
	}
}

function Treinando(){
	//Implementar, colocar um "deadline" aonde o funcionario nao poderá trocar de papel enquanto nao terminar o seu treinamento
	//Quando terminar o treinamento o funcionario ganhará a especializaçao na qual treinou.
	if ((Time.timeSinceLevelLoad > treino.GetDeadline_Treino()) && (treino.GetDeadline_Treino() >0))
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
	var modificador : float = 0;
	
	switch(equipe.GetLinguagem())
	{
	   case "assembly": 
		  if (func.GetL_assembly() == true)
				modificador = 1;
	   break;

	   case "csharp":
		  if (func.GetL_csharp() == true)
				modificador = 1;
	   break;
	   
	   case "java":
		  if (func.GetL_java() == true)
				modificador = 1;
	   break;
	   
	   case "perl":
		  if (func.GetL_perl() == true)
				modificador = 1;
	   break;
	   
	   case "ruby":
			if (func.GetL_ruby() == true)
				modificador = 1;
	   break;
	   
	   default:
			modificador = 0;
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
	   case "Agil": 
		   if (func.GetM_agil() == true)
				modificador = 0;
	   break;

	   case "Classico":
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
	   case "Analista": 	//caso analista
			if (func.GetF_metricas() == true)			//Se for especializado na ferramenta de metricas entao se benificiará
				modificador_positivo = BONUS;
	   break;

	   case "Arquiteto":	//caso arquiteto
			if (func.GetF_programas() == true)		//Se for especializado na ferramenta de analise de programas entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Gerente":	//caso gerente
			if (func.GetF_projetos() == true)						//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  BONUS;
			if (func.GetF_planejamento() == true)				//Se for especializado na ferramenta de depuracao entao se benificiará
					modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Marketing":	//caso marketing
	   break;
	   
	   case "Programador":	//caso programador
			if (func.GetF_depuracao() == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Testador":	//caso tester
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

function SetSalarios(){
switch(func.GetPapel())
	{
	   case "Analista": 	//caso analista
			func.SetSalario(ANALISTA_SALARIO_PLENO);
	   break;

	   case "Arquiteto":	//caso arquiteto
			func.SetSalario(ARQUITETO_SALARIO_PLENO);
	   break;
	   
	   case "Gerente":	//caso gerente
			func.SetSalario(GERENTE_SALARIO_PLENO);
	   break;
	   
	   case "Marketing":	//caso marketing
			func.SetSalario(MARKETING_SALARIO_PLENO);
	   break;
	   
	   case "Programador":	//caso programador
			func.SetSalario(PROGRAMADOR_SALARIO_PLENO);
	   break;
	   
	   case "Testador":	//caso tester
			func.SetSalario(TESTER_SALARIO_PLENO);
	   break;
		
		case "Treinamento":	//caso esteja em treinamento
			//Nao altera
	   break;
	   
	   default:
			func.SetSalario(STANDBY_SALARIO);
		  break;
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
}

//--------------------------------------------Update-----------------------------------------------------------

function Update(){
	//Work();
}

//--------------------------------------------FixedUpdate-----------------------------------------------------------

function FixedUpdate() {
	if ((Time.timeSinceLevelLoad % 7) <5)
		Work(); //para ser independente do frame rate de cada maquina.
	if ((Time.timeSinceLevelLoad % 7) == 6)
		project.SetFindbugScore(1);
}

