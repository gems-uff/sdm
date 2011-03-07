
private var func : Funcionario;
private var aprendendo : String = "";
private var deadline_treino : float = 0.0;
private var islockedEscolha : boolean = false;
public var stringNames : StringNames;

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
	   case stringNames.esp01: 
			func.SetL_Assembly(t);
	   break;

	   case stringNames.esp02:
			func.SetL_csharp(t);
	   break;
	   
	   case stringNames.esp03:
			func.SetL_java(t);
	   break;
	   
	   case stringNames.esp04:
			func.SetL_perl(t);
	   break;
	   
	   case stringNames.esp05:
			func.SetL_ruby(t);
	   break;
	   
	   case stringNames.esp06:
			func.SetM_agil(t);
	   break;
	   
	   case stringNames.esp07:
			func.SetM_classico(t);
	   break;
	   
	   case stringNames.esp08:
			func.SetF_programas(t);
	   break;
	   
	   case stringNames.esp09:
			func.SetF_versao(t);
	   break;
	   
	   case stringNames.esp10:
			func.SetF_depuracao(t);
	   break;
	   
	   case stringNames.esp11:
			func.SetF_projetos(t);
	   break;
	   
	   case stringNames.esp12:
			func.SetF_metricas(t);
	   break;
	   
	   case stringNames.esp13:
			func.SetF_planejamento(t);
	   break;
	   
	   case stringNames.esp14:
			func.SetF_teste(t);
	   break;
	   
	   default:
		  break;
	}
	islockedEscolha = false;
	func.SetPapel(stringNames.papelNenhum);
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
}

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
}