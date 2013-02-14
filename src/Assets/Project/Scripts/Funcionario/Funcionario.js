
public var stringNames : StringNames;
public var behavior : BehaviorPlanner;
public var constants : GameConstants;

public var atributos : Atributos = new Atributos();
public var especializacao : Especializacoes = new Especializacoes();
public var floatingLevel : FloatingLevel;
public var startEmpty : boolean = false;
public var isRandom : boolean = true;
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
private var mainRole : String;
private var secRole : String;
private var mainRoleRate : int;
private var secRoleRate : int;
private var job : String;		//Junior, plain, senior
private var workingHours : int = 8;
private var morale : int = 100;
private var stamina : int = 100;

//variaveis referentes a level do funcionario
private var EXPERIENCE_MOD : int = 100;
//private var PROJECT_EXPERIENCE : int = 5;
private var levelCap : int = 20;
private var level : int = 1;
private var experience : int = 0;
private var requiredExperience : int = level * level * EXPERIENCE_MOD;
private var days_modifier : int = 1;
//variaveis referentes aos modificadores de atributos quando subir de level
private var days_analista : int = 0;
private var days_arquiteto : int = 0;
private var days_gerente: int = 0;
private var days_marketing : int = 0;
private var days_programador : int = 0;
private var days_tester : int = 0;
//Historico de modificadores do level up
private var aux_adap: int = 0;
private var aux_auto : int = 0;
private var aux_det : int = 0;
private var aux_neg : int = 0;
private var aux_obj : int = 0;
private var aux_org : int = 0;
private var aux_pac : int = 0;
private var aux_rac : int = 0;
private var aux_rel : int = 0;

public var report : WeeklyReport;


function CopyLevel(t : Funcionario){
	ResetDays();
	level =t.GetLevel();
	experience = t.GetExperience();
	requiredExperience = level * level * EXPERIENCE_MOD;
	aux_adap = t.GetAdapMod();
	aux_auto = t.GetAutoMod();
	aux_det = t.GetDetMod();
	aux_neg = t.GetNegMod();
	aux_obj = t.GetObjMod();
	aux_org = t.GetOrgMod();
	aux_pac = t.GetPacMod();
	aux_rac = t.GetRacMod();
	aux_rel = t.GetRelMod();
}
function ResetLevel(){
	ResetDays();
	level =1;
	experience = 0;
	requiredExperience = level * level * EXPERIENCE_MOD;
	aux_adap = 0;
	aux_auto = 0;
	aux_det = 0;
	aux_neg = 0;
	aux_obj = 0;
	aux_org = 0;
	aux_pac = 0;
	aux_rac = 0;
	aux_rel = 0;
}
function ResetDays(){
	days_analista = 0;
	days_arquiteto = 0;
	days_gerente = 0;
	days_marketing = 0;
	days_programador = 0;
	days_tester = 0;
}

function WorkingAnalista(){
	days_analista = days_analista + 1;
}

function WorkingArquiteto(){
	days_arquiteto = days_arquiteto + 1;
}

function WorkingGerente(){
	days_gerente = days_gerente + 1;
}

function WorkingMarketing(){
	days_marketing = days_marketing + 1;
}

function WorkingProgramador(){
	days_programador = days_programador + 1;
}

function WorkingTester(){
	days_tester = days_tester + 1;
}

function LevelUp(){
	var count : int = 0;
	if ( experience > requiredExperience)
	{
		count = 0;
		while ( experience > requiredExperience)
		{
			/*
			level = level + 1;
			experience = experience - requiredExperience;
			requiredExperience = level * level * EXPERIENCE_MOD;
			IncreaseAttributes();
			count = count + 1;
			*/
			if (level >= levelCap)
			{
				level = levelCap;
				experience = levelCap * levelCap * EXPERIENCE_MOD;
				requiredExperience = experience;
			}
			else
			{
				level = level + 1;
				experience = experience - requiredExperience;
				requiredExperience = level * level * EXPERIENCE_MOD;
				IncreaseAttributes();
				count = count + 1;
			}
		}
		ResetDays();
		floatingLevel.showFloatText(count);
	}
	requiredExperience = level * level * EXPERIENCE_MOD;
}

function SetExperienceDaysModifier( mod : int){
//A experiencia ganha � em fun��o do numero de semanas trabalhadas.
	days_modifier = mod / 7;
	if (days_modifier < 1)
		days_modifier = 1;
	//print("Days Mod: "+days_modifier);
	//print("Mod: " +mod);
}
function IncreaseExp(project_mod : int){
	//project_mod = 1(simple) 2(regular) 3(complex) 4(insane)
	var quantity : int =  0;
	quantity = (project_mod * days_modifier * (50 + (atributos.autoDidata * 0.5)));
	quantity = quantity * 0.5;
	experience = experience + quantity;
	floatingLevel.showFloatTextExperience(quantity);
}

//Ganha experiencia se fizer prototipos
function EarnExperiencePrototype(mod : int){
	experience = experience + mod * 5;
	days_arquiteto = days_arquiteto + mod;
	floatingLevel.showFloatTextExperience(mod * 5);
}

//Ganha experiencia se fizer negocia��o
function EarnExperienceNegotiation(mod : int){
	experience = experience + mod * 4;
	days_marketing = days_marketing + mod;
	floatingLevel.showFloatTextExperience(mod * 4);
}

function IncreaseAttribute(att : int, aux : int)
{
	att += aux;
	if( att > 100)
	{
		aux = aux - (att - 100);
		att = 100;
	}
	return aux;
}
function IncreaseAttributes(){
	var aux : int =0;
	
	aux = CalculaAcrescimo(days_analista * 0.2, days_arquiteto * 0.25, days_gerente * 0.1, days_marketing * 0.05, days_programador * 0.05, days_tester * 0.05);
	//atributos.adaptabilidade = atributos.adaptabilidade + aux;
	aux = IncreaseAttribute(atributos.adaptabilidade, aux);
	aux_adap = aux_adap + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.05, days_arquiteto * 0.05, days_gerente * 0.1, days_marketing * 0.05, days_programador * 0.2, days_tester * 0.05);
	//atributos.autoDidata = atributos.autoDidata + aux;
	aux = IncreaseAttribute(atributos.autoDidata, aux);
	aux_auto = aux_auto + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.1, days_arquiteto * 0.15, days_gerente * 0.05, days_marketing * 0.05, days_programador * 0.05, days_tester * 0.25);
	//atributos.detalhista = atributos.detalhista + aux;
	aux = IncreaseAttribute(atributos.detalhista, aux);
	aux_det = aux_det + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.05, days_arquiteto * 0.05, days_gerente * 0.1, days_marketing * 0.25, days_programador * 0.05, days_tester * 0.05);
	//atributos.negociacao = atributos.negociacao + aux;
	aux = IncreaseAttribute(atributos.negociacao, aux);
	aux_neg = aux_neg + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.1, days_arquiteto * 0.1, days_gerente * 0.05, days_marketing * 0.05, days_programador * 0.15, days_tester * 0.1);
	//atributos.objetividade = atributos.objetividade + aux;
	aux = IncreaseAttribute(atributos.objetividade, aux);
	aux_obj = aux_obj + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.05, days_arquiteto * 0.1, days_gerente * 0.25, days_marketing * 0.05, days_programador * 0.1, days_tester * 0.1);
	//atributos.organizacao = atributos.organizacao + aux;
	aux = IncreaseAttribute(atributos.organizacao, aux);
	aux_org = aux_org + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.1, days_arquiteto * 0.1, days_gerente * 0.1, days_marketing * 0.2, days_programador * 0.1, days_tester * 0.15);
	//atributos.paciencia = atributos.paciencia + aux;
	aux = IncreaseAttribute(atributos.paciencia, aux);
	aux_pac = aux_pac + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.1, days_arquiteto * 0.15, days_gerente * 0.05, days_marketing * 0.05, days_programador * 0.25, days_tester * 0.2);
	//atributos.raciocinioLogico = atributos.raciocinioLogico + aux;
	aux = IncreaseAttribute(atributos.raciocinioLogico, aux);
	aux_rac = aux_rac + aux;
	
	aux = CalculaAcrescimo(days_analista * 0.25, days_arquiteto * 0.05, days_gerente * 0.2, days_marketing * 0.25, days_programador * 0.05, days_tester * 0.05);
	//atributos.relacionamentoHumano = atributos.relacionamentoHumano + aux;
	aux = IncreaseAttribute(atributos.relacionamentoHumano, aux);
	aux_rel = aux_rel + aux;
}

function CalculaAcrescimo ( m1 : int, m2 : int, m3 : int, m4 : int, m5 : int, m6 : int)
{
	var aux : int = 0;
	aux = 2 + ( (m1 + m2 + m3 + m4 + m5 + m6) / 9 );
	if (aux > 5)
		aux = 5;
	aux = Random.Range (0, aux);
	return aux;
}
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
function GetAutoDidata() {
	return atributos.autoDidata;
}
function SetAutoDitada(t: int) {
	atributos.autoDidata = t;
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
	return mainRole;
}
function GetPapelSec() {
	return secRole;
}
function SetPapel(t: String) {
	mainRole = t;
}
function SetPapelSec(t: String) {
	secRole = t;
}
function GetPapelRate() {
	return mainRoleRate;
}
function GetPapelSecRate() {
	return secRoleRate;
}
function SetPapelRate(t: int) {
	mainRoleRate = t;
}
function SetPapelSecRate(t: int) {
	secRoleRate = t;
}

function SetRates(t : int)
{
	if(t < 50)
		t = 50;
	mainRoleRate = t;
	secRoleRate = 100 - t;
}

function GetCargo() {
	return job;
}

function GetJob()
{
	if(job == stringNames.jobJunior)
	{
		return constants.JUNIOR_MODIFICATOR;
	}
	else if (job == stringNames.jobPleno)
	{
		return constants.PLENO_MODIFICATOR;
	}
	else
	{
		return constants.SENIOR_MODIFICATOR;
	}
}
function SetCargo(t: String) {
	job = t;
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
function GetMoraleForBonus() {
	if (morale < 20)
		return 20;
	return morale;
}
function GetMorale() {
	return morale;
}
function SetMorale(t: int) {
	morale = t;
}
function GetStaminaForBonus() {
	if (stamina < 20)
		return 20;
	return stamina;
}
function GetStamina() {
	return stamina;
}

function GetReq_Experience(){
	return requiredExperience;
}

function GetLevel(){
	return level;
}
function GetExperience(){
	return experience;
}
function GetDaysModifier(){
	return days_modifier;
}
function GetDaysAnalista(){
	return days_analista;
}
function GetDaysArquiteto(){
	return days_arquiteto;
}
function GetDaysGerente(){
	return days_gerente;
}
function GetDaysMarketing(){
	return days_marketing;
}
function GetDaysProgramador(){
	return days_programador;
}
function GetDaysTester(){
	return days_tester;
}
function GetAdapMod(){
	return aux_adap;
}
function GetAutoMod(){
	return aux_auto;
}
function GetDetMod(){
	return aux_det;
}
function GetNegMod(){
	return aux_neg;
}
function GetObjMod(){
	return aux_obj;
}
function GetOrgMod(){
	return aux_org;
}
function GetPacMod(){
	return aux_pac;
}
function GetRacMod(){
	return aux_rac;
}
function GetRelMod(){
	return aux_rel;
}

function SetLevel(t : int){
	level = t;
}
function SetExperience(t : int){
	experience = t;
}
function SetDaysModifier(t : int){
	days_modifier = t;
}
function SetDaysAnalista(t : int){
	days_analista = t;
}
function SetDaysArquiteto(t : int){
	days_arquiteto = t;
}
function SetDaysGerente(t : int){
	days_gerente = t;
}
function SetDaysMarketing(t : int){
	days_marketing = t;
}
function SetDaysProgramador(t : int){
	days_programador = t;
}
function SetDaysTester(t : int){
	days_tester = t;
}
function SetAdapMod(t : int){
	aux_adap = t;
}
function SetAutoMod(t : int){
	aux_auto = t;
}
function SetDetMod(t : int){
	aux_det = t;
}
function SetNegMod(t : int){
	aux_neg = t;
}
function SetObjMod(t : int){
	aux_obj = t;
}
function SetOrgMod(t : int){
	aux_org = t;
}
function SetPacMod(t : int){
	aux_pac = t;
}
function SetRacMod(t : int){
	aux_rac = t;
}
function SetRelMod(t : int){
	aux_rel = t;
}
function SetStamina(t: int) {
	stamina = t;
}
//Get e Set Atributos de cada papel

function GetAtributoPapel(p1: float, p2: float, p3: float, p4: float, p5: float, p6: float, p7: float, p8: float, p9: float){
	var atributoPapel : int = (atributos.adaptabilidade*p1) + (atributos.autoDidata*p2) + (atributos.detalhista*p3) + (atributos.negociacao*p4) + 
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

//
//Creates a copy of this employee
//
function Copy()
{
	var employee : Employee;
	
	employee.atributos = GetAtributos();
	employee.especializacao = GetStringSpecializations();
	
	employee.nome = GetNome();
	employee.salary = GetSalario();
	employee.mainRole = GetPapel();
	employee.secRole = GetPapelSec();
	employee.mainRoleRate = GetPapelRate();
	employee.secRoleRate = GetPapelSecRate();
	employee.job = GetCargo();
	employee.workingHours = GetWorkingHours();
	employee.morale = GetMorale();
	employee.stamina = GetStamina();
	employee.level = GetLevel();
	
	return employee;
	
}

//--------------------------------------------------------------------------------------
//Fire this employee
//--------------------------------------------------------------------------------------

public var log : HistoryLog;
public var staminaBar : StaminaBar;
public var moraleBar : MoraleBar;
public var body : MeshRenderer;

function FireEmployee (event : boolean) {
	var body : GameObject;
	
	if(event)
	{
		//fire action
		var slot : EmployeeList;
		slot = log.GetSlot(this);
		log.NewFiredAction(slot, this);
	}
	EmptyEmployee();
	this.SetNome(stringNames.fired);
	this.SetCargo(stringNames.jobJunior);
	this.SetPapel(stringNames.papelNenhum);
	this.SetPapelSec(stringNames.papelNenhum);
	this.SetPapelRate(100);
	this.SetPapelSecRate(0);
	this.SetMorale(100);
	this.SetStamina(100);
	this.SetWorkingHours(0);
	this.SetSalarioDefault(0);
	this.SetSalario(0);
	this.GetComponentInChildren(MeshRenderer).enabled = false;
	//body.enable = false;
	staminaBar = this.GetComponentInChildren(StaminaBar);
	moraleBar = this.GetComponentInChildren(MoraleBar);
	staminaBar.Stamina_Bar();
	moraleBar.Morale_Bar();
	
}

function EmptyEmployee(){
	atributos.adaptabilidade = 0;
	atributos.autoDidata = 0;
	atributos.detalhista = 0;
	atributos.negociacao = 0;
	atributos.objetividade = 0;
	atributos.organizacao = 0;
	atributos.paciencia = 0;
	atributos.raciocinioLogico = 0;
	atributos.relacionamentoHumano = 0;
	this.SetAtributos(atributos);
	especializacao.assembly = false;
	especializacao.csharp = false;
	especializacao.java = false;
	especializacao.perl = false;
	especializacao.ruby = false;
	especializacao.metodoAgil = false;
	especializacao.metodoClassico = false;
	especializacao.controleDeVersao = false;
	especializacao.planejamento = false;
	especializacao.metricas = false;
	especializacao.gerenciaDeProjetos = false;
	especializacao.depuracao = false;
	especializacao.teste = false;
	especializacao.analiseDeProgramas = false;
	this.ResetLevel();
	this.SetEspecializacoes(especializacao);
}

function ClearEmployee () {
	EmptyEmployee();
	this.SetNome(stringNames.vazio);
	this.SetCargo(stringNames.jobJunior);
	this.SetPapel(stringNames.vazio);
	this.SetPapelSec(stringNames.vazio);
	this.SetPapelRate(100);
	this.SetPapelSecRate(0);
	this.SetMorale(100);
	this.SetStamina(100);
	this.SetWorkingHours(0);
	this.SetSalarioDefault(0);
	this.SetSalario(0);
}

//--------------------------------------------------------------------------------------
//Random Starter
//--------------------------------------------------------------------------------------

//Esta funcao server para gerar um funcionario inicial totalmente randomico
function RandomFuncionarioStarter () {
	if(this.startEmpty == false)
	{
		var newNome : RandomNameGenerator = new RandomNameGenerator();
		
		if(isRandom)
		{
			SetAtributosStarter();
			SetEspecializacoes();
		}
		
		this.SetNome(newNome.RandomName());
		this.SetCargo(stringNames.jobJunior);
		this.SetPapel(stringNames.papelNenhum);
		this.SetPapelSec(stringNames.papelNenhum);
		this.SetPapelRate(100);
		this.SetPapelSecRate(0);
		this.SetMorale(100);
		this.SetWorkingHours(8);
		this.SetSalarioDefault(this.NewSalary());
		this.SetSalario(this.NewSalary());
	}
	else
		//FireFuncionario(func);
		this.FireEmployee(false);
}

//Diferenciado para evitar que o jogador come�e com funcionarios muito ruins
function ReturnRandomValueStarter(){
	var value1 : int;
	var value2 : int;
	var aux : int = 0;
	while (aux < 30)
	{
		value1 = Random.Range (30, 101);
		value2 = Random.Range (25, 101);
		aux = (value1 + value2) / 2;
		if (value1 > value2)
			aux = (aux + value1) / 2;
		else
			aux = (aux + value1) / 2;
	}
	return aux;
}

//--------------------------------------------SetAtributos-----------------------------------------------------------

function SetAtributosStarter()
{
	atributos.adaptabilidade = ReturnRandomValueStarter();
	atributos.autoDidata = ReturnRandomValueStarter();
	atributos.detalhista = ReturnRandomValueStarter();
	atributos.negociacao = ReturnRandomValueStarter();
	atributos.objetividade = ReturnRandomValueStarter();
	atributos.organizacao = ReturnRandomValueStarter();
	atributos.paciencia = ReturnRandomValueStarter();
	atributos.raciocinioLogico = ReturnRandomValueStarter();
	atributos.relacionamentoHumano = ReturnRandomValueStarter();
	
	SetAtributos(atributos);
}

function NewSalary(){
	var salario : int = 0;
	var randomModifier : int = Random.Range(100, 121);
	var aux : float;
	
	aux = randomModifier * 0.01;
	salario = atributos.adaptabilidade + atributos.autoDidata +	atributos.detalhista + atributos.negociacao + atributos.objetividade + atributos.organizacao + atributos.paciencia + atributos.raciocinioLogico + atributos.relacionamentoHumano;
	salario = salario * aux;
	salario = salario * 10;
	//salario = salario * 100;
	
	return salario;
}

function SetEspecializacao (t: int){
	switch(t)
	{
		//Linguagens comeca apartir do 01
	   case 1:
		  especializacao.assembly = true;
	   break;
	   
	   case 2:
			especializacao.csharp = true;
	   break;
	   
	   case 3:
			especializacao.java = true;
	   break;
	   
	   case 4:
			especializacao.perl = true;
	   break;
	   
	   case 5:
			especializacao.ruby = true;
	   break;
	   
	   //Metodos comeca apartir do 21
	   
	   case 21:
			especializacao.metodoAgil = true;
	   break;
	   
	   case 22:
			especializacao.metodoClassico = true;
	   break;
	   
	   //Ferramentas comeca apartir do 31
	   case 31:
			especializacao.controleDeVersao = true;
	   break;
	   
	   case 32:
		  especializacao.planejamento = true;
	   break;
	   case 33:
			especializacao.metricas = true;
	   break;
	   
	   case 34:
			especializacao.gerenciaDeProjetos = true;
	   break;
	   
	   case 35:
			especializacao.depuracao = true;
	   break;
	   
	   case 36:
			especializacao.teste = true;
	   break;
	   
	   case 37:
			especializacao.analiseDeProgramas = true;
	   break;

	   default:
		break;
	}
}

function GetStringSpecializations()
{
	var esp : String = "";
	if ( especializacao.assembly == true )
	{
		esp += stringNames.showEsp01 + "  ";
	}
	if ( especializacao.csharp == true )
	{
		esp += stringNames.showEsp02 + "  ";
	}
	if ( especializacao.java == true )
	{
		esp += stringNames.showEsp03 + "  ";
	}
	if ( especializacao.perl == true )
	{
		esp += stringNames.showEsp04 + "  ";
	}
	if ( especializacao.ruby == true )
	{
		esp += stringNames.showEsp05 + "  ";
	}
	if ( especializacao.metodoAgil == true )
	{
		esp += stringNames.showEsp06 + "  ";
	}
	if ( especializacao.metodoClassico == true )
	{
		esp += stringNames.showEsp07 + "  ";
	}
	if ( especializacao.analiseDeProgramas == true )
	{
		esp += stringNames.showEsp08 + "  ";
	}
	if ( especializacao.controleDeVersao == true )
	{
		esp += stringNames.showEsp09 + "  ";
	}
	if ( especializacao.depuracao == true )
	{
		esp += stringNames.showEsp10 + "  ";
	}
	if ( especializacao.gerenciaDeProjetos == true )
	{
		esp += stringNames.showEsp11 + "  ";
	}
	if ( especializacao.metricas == true )
	{
		esp += stringNames.showEsp12 + "  ";
	}
	if ( especializacao.planejamento == true )
	{
		esp += stringNames.showEsp13 + "  ";
	}
	if ( especializacao.teste == true )
	{
		esp += stringNames.showEsp14 + "  ";
	}
	return esp;
}

//--------------------------------------------SetEspecializacoes-----------------------------------------------------------

function SetEspecializacoes()
{
	var espLing : int = Random.Range(1, 20);	//Linguagem
	var espM : int = Random.Range(21, 30);		//Metodo
	var espF : int = Random.Range(31, 61);		//Ferramentas
	var esp1 : int = Random.Range(1, 251);		//Qualquer incommum
	var esp2 : int = Random.Range(1, 451);		//Qualquer raro
	var esp3 : int = Random.Range(1, 851);		//Qualquer muito raro
	var esp4 : int = Random.Range(1, 1651);		//Qualquer muito^2 raro

	SetEspecializacao(espLing);
	SetEspecializacao(espM);
	SetEspecializacao(espF);
	SetEspecializacao(esp1);
	SetEspecializacao(esp2);
	SetEspecializacao(esp3);
	SetEspecializacao(esp4);

}


//--------------------------------------------------------------------------------------
//Update
//--------------------------------------------------------------------------------------
//--------------------------------------------Update-----------------------------------------------------------

function FixedUpdate () {
	SetAnalista();
	SetArquiteto();
	SetGerente();
	SetMarketing();
	SetProgramador();
	SetTester();
}

function Awake () 
{
	RandomFuncionarioStarter();
}	