
private var atributos : Atributos = new Atributos();

//Atributos de cada Papel
private var analista = 0;
private var arquiteto = 0;
private var gerente = 0;
private var marketing = 0;
private var programador = 0;
private var tester = 0;

private var projectObj : GameObject;
private var project : Project;



//Funcoes que fazem os funcionarios produzirem
function AnalistaWork(){
	var aux = 0.0;
	if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
	{
		aux = analista* 0.8;
		project.SetSincronismo(aux);
	}
	else
	{
		if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
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
	switch(atributos.papel)
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
//Gets dos atributos humanos e mesa

function GetAtributos(){
	return atributos;
}
function GetNumMesa() {
	return atributos.nummesa;
}
function GetAdaptabilidade() {
	return atributos.adaptabilidade;
}
function GetAutoDitada() {
	return atributos.autoDitada;
}
function GetDetalhista() {
	return atributos.detalhista;
}
function GetNegociacao() {
	return atributos.negociacao;
}
function GetObjetividade() {
	return atributos.objetividade;
}
function GetOrganizacao() {
	return atributos.organizacao;
}
function GetPaciencia() {
	return atributos.paciencia;
}
function GetRaciocinioLogico() {
	return atributos.raciocinioLogico;
}
function GetRelacionamentoHumano() {
	return atributos.relacionamentoHumano;
}
function GetPapel() {
	return atributos.papel;
}
function GetSalario() {
	return atributos.salario;
}
//Sets dos atributos humanos e mesa
function SetAtributos(t : Atributos){
	atributos = t;
}
function SetNumMesa(t: int) {
	atributos.nummesa = t;
}
function SetAdaptabilidade(t: int) {
	atributos.adaptabilidade = t;
}
function SetAutoDitada(t: int) {
	atributos.autoDitada = t;
}
function SetDetalhista(t: int) {
	atributos.detalhista = t;
}
function SetNegociacao(t: int) {
	atributos.negociacao = t;
}
function SetObjetividade(t: int) {
	atributos.objetividade = t;
}
function SetOrganizacao(t: int) {
	atributos.organizacao = t;
}
function SetPaciencia(t: int) {
	atributos.paciencia = t;
}
function SetRaciocinioLogico(t: int) {
	atributos.raciocinioLogico = t;
}
function SetRelacionamentoHumano(t: int) {
	atributos.relacionamentoHumano = t;
}
function SetPapel(t: String) {
	atributos.papel = t;
}
function SetSalario(t: int) {
	atributos.salario = t;
}

//Set Atributos de cada papel

function GetAtributo(p1: float, p2: float, p3: float, p4: float, p5: float, p6: float, p7: float, p8: float, p9: float){
	var atributoPapel = (atributos.adaptabilidade*p1) + (atributos.autoDitada*p2) + (atributos.detalhista*p3) + (atributos.negociacao*p4) + 
	(atributos.objetividade*p5) + (atributos.organizacao*p6) + (atributos.paciencia*p7) + (atributos.raciocinioLogico*p8) + (atributos.relacionamentoHumano*p9);
	return atributoPapel;
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

function Update () {
	Work();
	Debug.Log(atributos.nummesa);
}