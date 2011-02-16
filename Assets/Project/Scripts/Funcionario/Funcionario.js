
private var atributos : Atributos = new Atributos();
private var especializacao : Especializacoes = new Especializacoes();

//Atributos de cada Papel
private var analista : float = 0;
private var arquiteto : float = 0;
private var gerente : float = 0;
private var marketing : float = 0;
private var programador : float = 0;
private var tester : float = 0;
private var mesa : int;	//Em que desk o funcionario esta alocado

//--------------------------------------------Get/Set-----------------------------------------------------------

//Get e Set dos atributos humanos e mesa

function GetAtributos(){
	return atributos;
}
function GetEspecializacao(){
	return especializacao;
}
function GetNumMesa() {
	return mesa;
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

function SetAtributos(t : Atributos){
	atributos = t;
}
function SetEspecializacoes(t : Especializacoes){
	especializacao = t;
}
function SetNumMesa(t: int) {
	mesa = t;
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
function GetL_csharp () {
	return especializacao.csharp;
}
function GetL_java () {
	return especializacao.java;
}
function GetL_perl () {
	return especializacao.perl;
}
function GetL_ruby () {
	return especializacao.ruby;
}
function GetM_agil () {
	return especializacao.metodoAgil ;
}
function GetM_classico () {
	return especializacao.metodoClassico;
}
function GetF_programas (){
	return especializacao.analiseDeProgramas;
}
function GetF_versao () {
	return especializacao.controleDeVersao;
}
function GetF_depuracao (){
	return especializacao.depuracao;
}
function GetF_projetos (){
	return especializacao.gerenciaDeProjetos;
}
function GetF_metricas () {
	return especializacao.metricas;
}
function GetF_planejamento (){
	return especializacao.planejamento;
}
function GetF_teste () {
	return especializacao.teste;
}


function SetL_Assembly (t: boolean) {
	especializacao.assembly = t;
}
function SetL_csharp (t: boolean) {
	especializacao.csharp = t;
}
function SetL_java (t: boolean) {
	especializacao.java = t;
}
function SetL_perl (t: boolean) {
	especializacao.perl = t;
}
function SetL_ruby (t: boolean) {
	especializacao.ruby = t;
}
function SetM_agil (t: boolean) {
	especializacao.metodoAgil = t;
}
function SetM_classico (t: boolean) {
	especializacao.metodoClassico = t;
}
function SetF_programas (t: boolean) {
	especializacao.analiseDeProgramas = t;
}
function SetF_versao (t: boolean) {
	especializacao.controleDeVersao = t;
}
function SetF_depuracao (t: boolean) {
	especializacao.depuracao = t;
}
function SetF_projetos (t: boolean) {
	especializacao.gerenciaDeProjetos = t;
}
function SetF_metricas (t: boolean) {
	especializacao.metricas = t;
}
function SetF_planejamento (t: boolean) {
	especializacao.planejamento = t;
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