class Employee extends System.ValueType
{
	public var atributos : Atributos;
	public var especializacao : Especializacoes;
	
	public var nome : String;
	public var salary : int;
	public var mainRole : String;
	public var secRole : String;
	public var mainRoleRate : int;
	public var secRoleRate : int;
	public var job : String;		//Junior, plain, senior
	public var workingHours : int;
	public var morale : int;
	public var stamina : int;
	public var level : int;

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
	function GetSalario() {
		return salary;
	}
	function SetSalario(t: int) {
		salary = t;
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
	function GetCargo() {
	return job;
	}
	function SetCargo(t: String) {
		job = t;
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
	function SetMorale(t: int) {
		morale = t;
	}
	function GetStamina() {
		return stamina;
	}
	function GetLevel(){
		return level;
	}

}