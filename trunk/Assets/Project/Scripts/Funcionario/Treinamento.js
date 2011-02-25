
private var PRECO : int = 2000;

private var func : Funcionario;
private var aprendendo : String = "";
private var deadline_treino : float = 0.0;
private var islockedEscolha : boolean = false;
private var pagar : Pagamentos;

//--------------------------------------------Gets/Sets-----------------------------------------------------------

function GetLockEscolha(){
	return islockedEscolha;
}
function SetLockEscolha(t : boolean){
	islockedEscolha = t;
}

function GetDeadline_Treino(){
	return deadline_treino;
}
function SetDeadline_Treino(t : float){
	deadline_treino = t;
}

function GetAprendendo(){
	return aprendendo;
}
function SetAprendendo(t : String){
	aprendendo = t;
}

//--------------------------------------------Especializar-----------------------------------------------------------

function Especializando (){
	var t : boolean = true;
	switch(aprendendo)
	{
	   case "assembly": 
			func.SetL_Assembly(t);
	   break;

	   case "csharp":
			func.SetL_csharp(t);
	   break;
	   
	   case "java":
			func.SetL_java(t);
	   break;
	   
	   case "perl":
			func.SetL_perl(t);
	   break;
	   
	   case "ruby":
			func.SetL_ruby(t);
	   break;
	   
	   case "agileMethod":
			func.SetM_agil(t);
	   break;
	   
	   case "classicMethod":
			func.SetM_classico(t);
	   break;
	   
	   case "analysisProgram":
			func.SetF_programas(t);
	   break;
	   
	   case "versionControl":
			func.SetF_versao(t);
	   break;
	   
	   case "depuration":
			func.SetF_depuracao(t);
	   break;
	   
	   case "projectManagement":
			func.SetF_projetos(t);
	   break;
	   
	   case "metrics":
			func.SetF_metricas(t);
	   break;
	   
	   case "planning":
			func.SetF_planejamento(t);
	   break;
	   
	   case "test":
			func.SetF_teste(t);
	   break;
	   
	   default:
		  break;
	}
	//deadline_treino = 0.0;
	pagar.PagarFuncionarioTreinamento(PRECO);//Paga o custo de treinamento precisa ser feito
	islockedEscolha = false;
	func.SetPapel("None");
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	pagar = GetComponentInChildren(Pagamentos);
}

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
}