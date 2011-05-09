
public var stringNames : StringNames;
private var func : Funcionario;
private var atualizado : boolean = false;

private var nome : String = "John";
private var assembly : boolean = false;
private var csharp : boolean = false;
private var java : boolean = false;
private var perl : boolean = false;
private var ruby : boolean = false;
private var metodoAgil : boolean = false;
private var metodoClassico : boolean = false;
private var analiseDeProgramas : boolean = false;
private var controleDeVersao : boolean = false;
private var depuracao : boolean = false;
private var gerenciaDeProjetos : boolean = false;
private var metricas : boolean = false;
private var planejamento : boolean = false;
private var teste : boolean = false;
private var atributos : Atributos = new Atributos();
private var especializacao : Especializacoes = new Especializacoes();
private var newNome : RandomNameGenerator = new RandomNameGenerator();

//--------------------------------------------ReturnRandomValue-----------------------------------------------------------

function ReturnRandomValue(){
	var value1 : int = Random.Range (10, 101);
	var value2 : int = Random.Range (10, 101);
	var aux : int;
	aux = (value1 + value2) / 2;
	if (value1 > value2)
		aux = (aux + value1) / 2;
	else
		aux = (aux + value1) / 2;
	return aux;
}

//--------------------------------------------SetAtributos-----------------------------------------------------------

function SetAtributos()
{
	atributos.adaptabilidade = ReturnRandomValue();
	atributos.autoDidata = ReturnRandomValue();
	atributos.detalhista = ReturnRandomValue();
	atributos.negociacao = ReturnRandomValue();
	atributos.objetividade = ReturnRandomValue();
	atributos.organizacao = ReturnRandomValue();
	atributos.paciencia = ReturnRandomValue();
	atributos.raciocinioLogico = ReturnRandomValue();
	atributos.relacionamentoHumano = ReturnRandomValue();
	
	func.SetAtributos(atributos);
}

//--------------------------------------------SetEspecializacao-----------------------------------------------------------

function SetEspecializacao (t: int){
	switch(t)
	{
		//Linguagens comeca apartir do 01
	   case 1:
		  assembly = true;
	   break;
	   
	   case 2:
			csharp = true;
	   break;
	   
	   case 3:
			java = true;
	   break;
	   
	   case 4:
			perl = true;
	   break;
	   
	   case 5:
			ruby = true;
	   break;
	   
	   //Metodos comeca apartir do 11
	   
	   case 11:
			metodoAgil = true;
	   break;
	   
	   case 12:
			metodoClassico = true;
	   break;
	   
	   //Ferramentas comeca apartir do 21
	   case 21:
			controleDeVersao = true;
	   break;
	   
	   case 22:
		  planejamento = true;
	   break;
	   case 23:
			metricas = true;
	   break;
	   
	   case 24:
			gerenciaDeProjetos = true;
	   break;
	   
	   case 25:
			depuracao = true;
	   break;
	   
	   case 26:
			teste = true;
	   break;
	   
	   case 27:
			analiseDeProgramas = true;
	   break;

	   default:
		break;
	}
}

//--------------------------------------------SetEspecializacoes-----------------------------------------------------------

function SetEspecializacoes()
{
	var espLing : int = Random.Range(1, 8);		//Linguagem
	var espM : int = Random.Range(11, 18);		//Metodo
	var espF : int = Random.Range(21, 41);		//Ferramentas
	var esp1 : int = Random.Range(1, 101);		//Qualquer incommum
	var esp2 : int = Random.Range(1, 141);		//Qualquer raro
	var esp3 : int = Random.Range(1, 181);		//Qualquer muito raro
	
	assembly = false;
	csharp = false;
	java = false;
	perl = false;
	ruby = false;
	metodoAgil = false;
	metodoClassico = false;
	analiseDeProgramas = false;
	controleDeVersao = false;
	depuracao = false;
	gerenciaDeProjetos = false;
	metricas = false;
	planejamento = false;
	teste = false;
	
	SetEspecializacao(espLing);
	SetEspecializacao(espM);
	SetEspecializacao(espF);
	SetEspecializacao(esp1);
	SetEspecializacao(esp2);
	SetEspecializacao(esp3);
	
	especializacao.assembly = assembly;
	especializacao.csharp = csharp;
	especializacao.java = java;
	especializacao.perl = perl;
	especializacao.ruby = ruby;
	especializacao.metodoAgil = metodoAgil;
	especializacao.metodoClassico = metodoClassico;
	especializacao.controleDeVersao = controleDeVersao;
	especializacao.planejamento = planejamento;
	especializacao.metricas = metricas;
	especializacao.gerenciaDeProjetos = gerenciaDeProjetos;
	especializacao.depuracao = depuracao;
	especializacao.teste = teste;
	especializacao.analiseDeProgramas = analiseDeProgramas;
	
	func.SetEspecializacoes(especializacao);
}

//--------------------------------------------NewSalary-----------------------------------------------------------

function NewSalario(){
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

//--------------------------------------------NewFuncionario-----------------------------------------------------------
//Esta funcao serve para criar um funcionario randomico para possivel contratacao
function FireFuncionario (t : Funcionario) {
	var body : GameObject;
	func = t;
	EmptyFuncionario();
	func.SetNome(stringNames.fired);
	func.SetPapel(stringNames.papelNenhum);
	func.SetMorale(100);
	func.SetWorkingHours(0);
	func.SetSalarioDefault(0);
	func.SetSalario(0);
	func.GetComponentInChildren(MeshRenderer).enabled = false;
}

function EmptyFuncionario(){
	atributos.adaptabilidade = 0;
	atributos.autoDidata = 0;
	atributos.detalhista = 0;
	atributos.negociacao = 0;
	atributos.objetividade = 0;
	atributos.organizacao = 0;
	atributos.paciencia = 0;
	atributos.raciocinioLogico = 0;
	atributos.relacionamentoHumano = 0;
	func.SetAtributos(atributos);
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
	
	func.SetEspecializacoes(especializacao);
}

function ClearFuncionario (t : Funcionario) {
	var body : GameObject;
	func = t;
	EmptyFuncionario();
	func.SetNome(stringNames.vazio);
	func.SetPapel(stringNames.vazio);
	func.SetMorale(100);
	func.SetWorkingHours(0);
	func.SetSalarioDefault(0);
	func.SetSalario(0);
}
//--------------------------------------------RandomFuncionarioStarter-----------------------------------------------------------

//Esta funcao server para gerar um funcionario inicial totalmente randomico
function RandomFuncionarioStarter () {
	SetAtributos();
	SetEspecializacoes();
	func.SetNome(newNome.RandomName());
	func.SetCargo(stringNames.jobJunior);
	func.SetPapel(stringNames.papelNenhum);
	func.SetMorale(100);
	func.SetWorkingHours(40);
	func.SetSalarioDefault(NewSalario());
	func.SetSalario(NewSalario());
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	}

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
	if (!atualizado)
	{
		atualizado = true;
		RandomFuncionarioStarter();
	}
}