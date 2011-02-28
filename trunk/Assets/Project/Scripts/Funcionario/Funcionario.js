
private var atributos : Atributos = new Atributos();
private var especializacao : Especializacoes = new Especializacoes();

//Atributos de cada Papel
private var analista : float = 0;
private var arquiteto : float = 0;
private var gerente : float = 0;
private var marketing : float = 0;
private var programador : float = 0;
private var tester : float = 0;
private var nome : String;
private var defaultSalary : int;
private var salary : int;
private var role : String;
private var workingHours : int = 40;
private var morale : float = 100.0;
//private var isEmploee : boolean = false;
//private var cargo : String;

//--------------------------------------------Get/Set-----------------------------------------------------------

//Get e Set dos atributos humanos e mesa

function GetAtributos(){
	return atributos;
}
function SetAtributos(t : Atributos){
	atributos = t;
}
function GetEspecializacao(){
	return especializacao;
}
function SetEspecializacoes(t : Especializacoes){
	especializacao = t;
}
function GetNome() {
	return nome;
}
function SetNome(t: String) {
	nome = t;
}
function GetAdaptabilidade() {
	return atributos.adaptabilidade;
}
function SetAdaptabilidade(t: int) {
	atributos.adaptabilidade = t;
}
function GetAutoDitada() {
	return atributos.autoDitada;
}
function SetAutoDitada(t: int) {
	atributos.autoDitada = t;
}
function GetDetalhista() {
	return atributos.detalhista;
}
function SetDetalhista(t: int) {
	atributos.detalhista = t;
}
function GetNegociacao() {
	return atributos.negociacao;
}
function SetNegociacao(t: int) {
	atributos.negociacao = t;
}
function GetObjetividade() {
	return atributos.objetividade;
}
function SetObjetividade(t: int) {
	atributos.objetividade = t;
}
function GetOrganizacao() {
	return atributos.organizacao;
}
function SetOrganizacao(t: int) {
	atributos.organizacao = t;
}
function GetPaciencia() {
	return atributos.paciencia;
}
function SetPaciencia(t: int) {
	atributos.paciencia = t;
}
function GetRaciocinioLogico() {
	return atributos.raciocinioLogico;
}
function SetRaciocinioLogico(t: int) {
	atributos.raciocinioLogico = t;
}
function GetRelacionamentoHumano() {
	return atributos.relacionamentoHumano;
}
function SetRelacionamentoHumano(t: int) {
	atributos.relacionamentoHumano = t;
}
function GetPapel() {
	return role;
}
function SetPapel(t: String) {
	role = t;
}
function GetSalarioDefault() {
	return defaultSalary;
}
function SetSalarioDefault(t: int) {
	defaultSalary = t;
}
function GetSalario() {
	return salary;
}
function SetSalario(t: int) {
	salary = t;
}
function GetWorkingHours() {
	return workingHours;
}
function SetWorkingHours(t: int) {
	workingHours = t;
}
function GetMorale() {
	return morale;
}
function SetMorale(t: float) {
	morale = t;
}
//Get e Set Atributos de cada papel

function GetAtributoPapel(p1: float, p2: float, p3: float, p4: float, p5: float, p6: float, p7: float, p8: float, p9: float){
	var atributoPapel = (atributos.adaptabilidade*p1) + (atributos.autoDitada*p2) + (atributos.detalhista*p3) + (atributos.negociacao*p4) + 
	(atributos.objetividade*p5) + (atributos.organizacao*p6) + (atributos.paciencia*p7) + (atributos.raciocinioLogico*p8) + (atributos.relacionamentoHumano*p9);
	return atributoPapel;
}

function GetAnalista(){
	return analista;
}
function GetArquiteto(){
	return arquiteto;
}
function GetGerente(){
	return gerente;
}
function GetMarketing(){
	return marketing;
}
function GetProgramador(){
	return programador;
}
function GetTester(){
	return tester;
}
function SetAnalista() {
	analista = GetAtributoPapel(0.20, 0.05, 0.10, 0.05, 0.10, 0.05, 0.10, 0.10, 0.25);
}
function SetArquiteto() {
	arquiteto = GetAtributoPapel(0.25, 0.05, 0.15, 0.05, 0.10, 0.10, 0.10, 0.15, 0.05);
}
function SetGerente() {
	gerente = GetAtributoPapel(0.10, 0.10, 0.05, 0.10, 0.05, 0.25, 0.10, 0.05, 0.20);
}
function SetMarketing() {
	marketing = GetAtributoPapel(0.05, 0.05, 0.05, 0.25, 0.05, 0.05, 0.20, 0.05, 0.25);
}
function SetProgramador() {
	programador = GetAtributoPapel(0.05, 0.20, 0.05, 0.05, 0.15, 0.10, 0.10, 0.25, 0.05);
}
function SetTester() {
	tester = GetAtributoPapel(0.05, 0.05, 0.25, 0.05, 0.10, 0.10, 0.15, 0.20, 0.05);
}
	
//Gets e Sets de especializacoes

function GetL_assembly () {
	return especializacao.assembly;
}
function SetL_Assembly (t: boolean) {
	especializacao.assembly = t;
}
function GetL_csharp () {
	return especializacao.csharp;
}
function SetL_csharp (t: boolean) {
	especializacao.csharp = t;
}
function GetL_java () {
	return especializacao.java;
}
function SetL_java (t: boolean) {
	especializacao.java = t;
}
function GetL_perl () {
	return especializacao.perl;
}
function SetL_perl (t: boolean) {
	especializacao.perl = t;
}
function GetL_ruby () {
	return especializacao.ruby;
}
function SetL_ruby (t: boolean) {
	especializacao.ruby = t;
}
function GetM_agil () {
	return especializacao.metodoAgil ;
}
function SetM_agil (t: boolean) {
	especializacao.metodoAgil = t;
}
function GetM_classico () {
	return especializacao.metodoClassico;
}
function SetM_classico (t: boolean) {
	especializacao.metodoClassico = t;
}
function GetF_programas (){
	return especializacao.analiseDeProgramas;
}
function SetF_programas (t: boolean) {
	especializacao.analiseDeProgramas = t;
}
function GetF_versao () {
	return especializacao.controleDeVersao;
}
function SetF_versao (t: boolean) {
	especializacao.controleDeVersao = t;
}
function GetF_depuracao (){
	return especializacao.depuracao;
}
function SetF_depuracao (t: boolean) {
	especializacao.depuracao = t;
}
function GetF_projetos (){
	return especializacao.gerenciaDeProjetos;
}
function SetF_projetos (t: boolean) {
	especializacao.gerenciaDeProjetos = t;
}
function GetF_metricas () {
	return especializacao.metricas;
}
function SetF_metricas (t: boolean) {
	especializacao.metricas = t;
}
function GetF_planejamento (){
	return especializacao.planejamento;
}
function SetF_planejamento (t: boolean) {
	especializacao.planejamento = t;
}
function GetF_teste () {
	return especializacao.teste;
}
function SetF_teste (t: boolean) {
	especializacao.teste = t;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake() 
{ 

} 

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
	SetAnalista();
	SetArquiteto();
	SetGerente();
	SetMarketing();
	SetProgramador();
	SetTester();
}