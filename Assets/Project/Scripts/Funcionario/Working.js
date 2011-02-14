
//Constantes
private var PENALIDADE : float = 0.3;
private var BONUS : float = 0.25;
private var ANALISTA_INICIO : float = 0.8;
private var ANALISTA_DURANTE : float = 0.00001;
private var GERENTE_PROG : float = 0.125;
private var GERENTE_ANA : float = 0.00000125;
private var GERENTE_TEST : float = 0.0000000625;
private var PROG_DURANTE : float = 0.00002;
private var TESTER_DURANTE : float = 0.0000007;
//Fim Constantes

private var func : Funcionario;
private var equipeObj : GameObject;
private var equipe : Equipe;
private var projectObj : GameObject;
private var project : Project;

function Awake () {
	func = GetComponentInChildren(Funcionario);
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
}

function Update(){
	//Work();
}

function FixedUpdate() {
	Work();
}

function Work(){	//Função que atualiza os campos de projeto conforme a performace do funcionario no seu papel
	var modificador_positivo : float = EspecializacaoFerramenta();	//Resultado é um numero >= 0
	var penal : float = RequisitoMetodo() + MetodologiaEquipe();	//Resultado é um numero >= 0
		
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

	   default:
		  break;
	}
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
	var penal_prog : float = penal + RequisitoLinguagem();
	var penal_metodo_analista : float = penal;
	
	analista = func.GetAnalista();
	gerente = func.GetGerente();
	auxprog = gerente * GERENTE_PROG * (1 + modificador_positivo - penal_prog);
	auxanalista = gerente * GERENTE_ANA * (1 + modificador_positivo - penal_metodo_analista);
	auxtester = gerente * GERENTE_TEST * (1 + modificador_positivo - penal_prog);
	
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
	var penal_prog : float = penal + RequisitoLinguagem();
	
	programador = func.GetProgramador();
	numBugs = (100.0 - programador ) * PROG_DURANTE * (1.0 - modificador_positivo + penal_prog); //Para acrescentar/reduzir o numero de bugs, os modificadores tem seu papel invertido 
	
	//Debug.Log("Prog=" +(100.0 - programador ));
	//Debug.Log("ProgDUR=" +PROG_DURANTE);
	//Debug.Log("Mod=" +(1.0 - modificador_positivo + penal_prog));
	//Debug.Log("Bugs=" +numBugs);
	
	project.SetNumBugs(numBugs);
	project.SetLinesDone(programador * (1 + modificador_positivo - penal_prog));
}

function TesterWork(modificador_positivo : float, penal : float){
	var aux : float;
	var tester : float;
	var penal_prog : float = penal + RequisitoLinguagem();

	tester = func.GetTester();
	aux = tester * TESTER_DURANTE * (1 + modificador_positivo - penal);		//Por parte do tester
	aux = -aux * (project.GetFindbugScore());	//Por parte do arquiteto
	project.SetNumBugs(aux);
}

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto. O valor retornado é 0 ou PENALIDADE
function RequisitoLinguagem(){
	var modificador : float = PENALIDADE;
	
	switch(project.GetLinguagem())
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
			modificador = 0;
		  break;
	}
	return modificador;
}

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto. O valor retornado é 0 ou PENALIDADE
function RequisitoMetodo(){
	var modificador : float = PENALIDADE;
	
	switch(project.GetMetodo())
	{
	   case "agil": 
		   if (func.GetD_agil() == true)
				modificador = 0;
	   break;

	   case "evolutivo":
		   if (func.GetD_evolutivo() == true)
				modificador = 0;
	   break;
	   
	   case "iterativo":
		   if (func.GetD_iterativo() == true)
				modificador = 0;
	   break;

	   default:
			modificador = 0;
		  break;
	}
	return modificador;
}

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

//Funcao para verificar se o funcionario tera algum modificador positivo de acordo com seu papel e especialidade. O retorno ja é o modificador final somado em 1, ou seja, será sempre retornado um numero >= 1
function EspecializacaoFerramenta ()
{
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
