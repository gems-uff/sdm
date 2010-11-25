
//Atributos Humanos
public var adaptabilidade = 50;
public var autoDitada = 50;
public var detalhista = 50;
public var negociacao = 50;
public var objetividade = 50;
public var organizacao = 50;
public var paciencia = 50;
public var raciocinioLogico = 50;
public var relacionamentoHumano = 50;
public var papel = "";
//Atributos de cada Papel
private var analista = 0;
private var arquiteto = 0;
private var gerente = 0;
private var marketing = 0;
private var programador = 0;
private var tester = 0;

private var projectObj : GameObject;
private var project : Project;


//Inicializa os atributos de papeis e pega o gameobject project para poder atualiza-lo conforme os funcionarios trabalhem
function Awake() 
{ 
   projectObj = GameObject.Find("Project");
   project = projectObj.GetComponent(Project);
   SetAnalista();
   SetArquiteto();
   SetGerente();
   SetMarketing();
   SetProgramador();
   SetTester();
} 


function AnalistaWork(){
	var aux = 0.0;
	if(project.GetSincronismo() == 00)
	{
		aux = analista* 0.8;
		project.SetSincronismo(aux);
	}
	else
	{
		if(project.GetSincronismo() < 100)
		{
			aux = analista* 0.00001;
			project.SetSincronismo(aux);
		}
	}
}

function ArquitetoWork(){
	var aux = 0.0;
	aux = arquiteto;
	project.SetFindbugScore(aux);
}

function GerenteWork(){
	var auxprog = 0;
	var auxanalista = 0.0;
	var auxtester = 0.0;
	
	auxprog = gerente*0.25;
	auxprog = auxprog *0.5;
	
	auxanalista = gerente*0.25;
	auxanalista = auxanalista *0.000005;
	
	auxtester = gerente*0.25;
	auxtester = auxtester*0.00000025;
	
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
	aux = (100 - programador )*0.00003;
	project.SetNumBugs(aux);
	project.SetLinesDone(programador);
}

function TesterWork(){
	var aux;
	aux = tester*0.0000007;
	aux = -aux*(project.GetFindbugScore());
	project.SetNumBugs(aux);
}


function Work(){	//Função que atualiza os campos de projeto conforme a performace do funcionario no seu papel
	switch(papel)
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
//Gets dos atributos humanos

function GetAdaptabilidade() {
	return adaptabilidade;
}
function GetAutoDitada() {
	return autoDitada;
}
function GetDetalhista() {
	return detalhista;
}
function GetNegociacao() {
	return negociacao;
}
function GetObjetividade() {
	return objetividade;
}
function GetOrganizacao() {
	return organizacao;
}
function GetPaciencia() {
	return paciencia;
}
function GetRaciocinioLogico() {
	return raciocinioLogico;
}
function GetRelacionamentoHumano() {
	return relacionamentoHumano;
}

function GetPapel() {
	return papel;
}

//Sets dos atributos humanos

function SetAdaptabilidade(t: int) {
	adaptabilidade = t;
}
function SetAutoDitada(t: int) {
	autoDitada = t;
}
function SetDetalhista(t: int) {
	detalhista = t;
}
function SetNegociacao(t: int) {
	negociacao = t;
}
function SetObjetividade(t: int) {
	objetividade = t;
}
function SetOrganizacao(t: int) {
	organizacao = t;
}
function SetPaciencia(t: int) {
	paciencia = t;
}
function SetRaciocinioLogico(t: int) {
	raciocinioLogico = t;
}
function SetRelacionamentoHumano(t: int) {
	relacionamentoHumano = t;
}

function SetPapel(t: String) {
	papel = t;
}

//Set Atributos de cada papel

function GetAtributo(p1: float, p2: float, p3: float, p4: float, p5: float, p6: float, p7: float, p8: float, p9: float){
	var atributo = (adaptabilidade*p1) + (autoDitada*p2) + (detalhista*p3) + (negociacao*p4) + (objetividade*p5) + (organizacao*p6) + (paciencia*p7) + (raciocinioLogico*p8) + (relacionamentoHumano*p9);
	return atributo;
}

function SetAnalista() {
	analista = GetAtributo(0.20, 0.05, 0.10, 0.05, 0.10, 0.05, 0.10, 0.10, 0.25);
}
function SetArquiteto() {
	arquiteto = GetAtributo(0.25, 0.05, 0.15, 0.05, 0.10, 0.10, 0.10, 0.15, 0.05);
}
function SetGerente() {
	gerente = GetAtributo(0.10, 0.10, 0.05, 0.10, 0.05, 0.25, 0.10, 0.05, 0.20);
}
function SetMarketing() {
	marketing = GetAtributo(0.05, 0.05, 0.05, 0.25, 0.05, 0.05, 0.20, 0.05, 0.25);
}
function SetProgramador() {
	programador = GetAtributo(0.05, 0.20, 0.05, 0.05, 0.15, 0.10, 0.10, 0.25, 0.05);
}
function SetTester() {
	tester = GetAtributo(0.05, 0.05, 0.25, 0.05, 0.10, 0.10, 0.15, 0.20, 0.05);
}
	
function Update () {
	Work();
}