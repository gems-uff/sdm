
//Constantes
private var PENALIDADE = 0.7;
private var BONUS = 0.25;
private var ANALISTA_INICIO = 0.8;
private var ANALISTA_DURANTE = 0.00001;
private var GERENTE_PROG = 0.125;
private var GERENTE_ANA = 0.00000125;
private var GERENTE_TEST = 0.0000000625;
private var PROG_DURANTE = 0.00003;
private var TESTER_DURANTE = 0.0000007;
//Fim Constantes

private var func : Funcionario;
private var projectObj : GameObject;
private var project : Project;

function Awake () {
	func = GetComponentInChildren(Funcionario);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
}
	
function Update () {
	Work();
}

function Work(){	//Função que atualiza os campos de projeto conforme a performace do funcionario no seu papel
	switch(func.GetPapel())
	{
	   case "Analista": 	//caso analista
		  AnalistaWork();
	   break;

	   case "Arquiteto":	//caso arquiteto
		  ArquitetoWork();
	   break;
	   
	   case "Gerente":	//caso gerente
		  GerenteWork();
	   break;
	   
	   case "Marketing":	//caso marketing
		  MarketingWork();
	   break;
	   
	   case "Programador":	//caso programador
			ProgramadorWork();
	   break;
	   
	   case "Testador":	//caso tester
		  TesterWork();
	   break;

	   default:
		  break;
	}
}

function AnalistaWork(){
	var aux = 0.0;
	var analista;
	var modificador_positivo = EspecializacaoFerramenta();
	var penal_metodo = RequisitoMetodo();
	
	analista = func.GetAnalista();
	if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
	{
		aux = analista * ANALISTA_INICIO * penal_metodo * modificador_positivo;
		project.SetSincronismo(aux);
	}
	else
	{
		if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
		{
			aux = analista * ANALISTA_DURANTE * penal_metodo * modificador_positivo;
			project.SetSincronismo(aux);
		}
	}
}

function ArquitetoWork(){
	var aux = 0.0;
	var arquiteto;
	var modificador_positivo = EspecializacaoFerramenta();
	var penal_metodo = RequisitoMetodo();
	
	arquiteto = func.GetArquiteto();	
	aux = arquiteto * penal_metodo * modificador_positivo;
	project.SetFindbugScore(aux);
}

function GerenteWork(){
	var auxprog = 0;
	var auxanalista = 0.0;
	var auxtester = 0.0;
	var gerente;
	var modificador_positivo = EspecializacaoFerramenta();
	var penal_prog = RequisitoLinguagem() + RequisitoMetodo();
	var penal_metodo_analista = RequisitoMetodo();
	
	analista = func.GetAnalista();
	gerente = func.GetGerente();
	auxprog = gerente * GERENTE_PROG * penal_prog * modificador_positivo;
	auxanalista = gerente * GERENTE_ANA * penal_metodo_analista * modificador_positivo;
	auxtester = gerente * GERENTE_TEST * penal_prog * modificador_positivo;
	
	if(project.GetSincronismo() != 00)
		if(project.GetSincronismo() < 100)
			project.SetSincronismo(auxanalista);
	project.SetLinesDone(auxprog);
	project.SetNumBugs(auxtester);
}

function MarketingWork(){
	//Fazer
}

function ProgramadorWork(){
	var aux = 0.0;
	var programador;
	var modificador_positivo = EspecializacaoFerramenta();
	var penal = RequisitoLinguagem() + RequisitoMetodo();
	
	programador = func.GetProgramador();
	aux = (100 - programador ) * PROG_DURANTE * (1 + (1 - penal)) * modificador_positivo;
	project.SetNumBugs(aux);
	project.SetLinesDone(programador * penal * modificador_positivo);
}

function TesterWork(){
	var aux;
	var tester;
	var modificador_positivo = EspecializacaoFerramenta();
	var penal = RequisitoLinguagem() + RequisitoMetodo();

	tester = func.GetTester();
	aux = tester * TESTER_DURANTE * penal;		//Por parte do tester
	aux = -aux * (project.GetFindbugScore());	//Por parte do arquiteto
	project.SetNumBugs(aux);
}

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto
function RequisitoLinguagem(){
	var modificador = PENALIDADE;
	
	switch(project.GetLinguagem())
	{
	   case "assembly": 
		  if (func.GetL_assembly == true)
				modificador = 1;
	   break;

	   case "csharp":
		  if (func.GetL_csharp == true)
				modificador = 1;
	   break;
	   
	   case "java":
		  if (func.GetL_java == true)
				modificador = 1;
	   break;
	   
	   case "perl":
		  if (func.GetL_perl == true)
				modificador = 1;
	   break;
	   
	   case "ruby":
			if (func.GetL_ruby == true)
				modificador = 1;
	   break;
	   
	   default:
			modificador = 1;
		  break;
	}
	return modificador;
}

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto
function RequisitoMetodo(){
	var modificador = PENALIDADE;
	
	switch(project.GetMetodo())
	{
	   case "agil": 
		   if (func.GetD_agil == true)
				modificador = 1;
	   break;

	   case "evolutivo":
		   if (func.GetD_evolutivo == true)
				modificador = 1;
	   break;
	   
	   case "iterativo":
		   if (func.GetD_iterativo == true)
				modificador = 1;
	   break;

	   default:
			modificador = 1;
		  break;
	}
	return modificador;
}

//Funcao para verificar se o funcionario tera algum modificador positivo de acordo com seu papel e especialidade
function EspecializacaoFerramenta ()
{
	var modificador_positivo = 1;
	
	switch(func.GetPapel())
	{
	   case "Analista": 	//caso analista
			if (func.GetF_metricas == true)			//Se for especializado na ferramenta de metricas entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;

	   case "Arquiteto":	//caso arquiteto
			if (func.GetF_programas == true)		//Se for especializado na ferramenta de analise de programas entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Gerente":	//caso gerente
			if (func.GetF_projetos == true)						//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  BONUS;
			if (func.GetF_planejamento == true)				//Se for especializado na ferramenta de depuracao entao se benificiará
					modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Marketing":	//caso marketing
	   break;
	   
	   case "Programador":	//caso programador
			if (func.GetF_depuracao == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo + BONUS;
	   break;
	   
	   case "Testador":	//caso tester
			if (func.GetF_depuracao == true)					//Se for especializado na ferramenta de depuracao entao se benificiará
				modificador_positivo = modificador_positivo +  BONUS;
			if (func.GetF_teste == true)							//Se for especializado na ferramenta de testes entao se benificiará
					modificador_positivo = modificador_positivo + BONUS;
	   break;

	   default:
		  break;
	}
	return modificador_positivo;
}

/*
//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando
function MetodologiaEquipe(){
	var modificador = PENALIDADE;
	
	switch(equipe.GetMetodologia())
	{
	   case "agil": 
		   if (func.GetM_agil == true)
				modificador = 1;
	   break;

	   case "classico":
		   if (func.GetM_classico == true)
				modificador = 1;
	   break;

	   default:
		  break;
	}
	return modificador;
}
*/