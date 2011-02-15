
private var func : Funcionario;
private var aprendendo : String = "";
private var deadline_treino : float = 0.0;
private var islockedEscolha : boolean = false;

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
	   
	   case "metodoAgil":
			func.SetM_agil(t);
	   break;
	   
	   case "metodoClassico":
			func.SetM_classico(t);
	   break;
	   
	   case "desenvolvimentoAgil":
			func.SetD_agil(t);
	   break;
	   
	   case "desenvolvimentoEvolutivo":
			func.SetD_evolutivo(t);
	   break;
	   
	   case "desenvolvimentoIterativo":
			func.SetD_iterativo(t);
	   break;
	   
	   case "analiseDeProgramas":
			func.SetF_programas(t);
	   break;
	   
	   case "controleDeVersao":
			func.SetF_versao(t);
	   break;
	   
	   case "depuracao":
			func.SetF_depuracao(t);
	   break;
	   
	   case "gerenciaDeProjetos":
			func.SetF_projetos(t);
	   break;
	   
	   case "metricas":
			func.SetF_metricas(t);
	   break;
	   
	   case "planejamento":
			func.SetF_planejamento(t);
	   break;
	   
	   case "teste":
			func.SetF_teste(t);
	   break;
	   
	   default:
			Debug.Log("Erro no treinamento");
		  break;
	}
	//deadline_treino = 0.0;
	//Paga o custo de treinamento precisa ser feito
	islockedEscolha = false;
	func.SetPapel("Nenhum");
	Debug.Log("PRONTO");
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
}

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
}