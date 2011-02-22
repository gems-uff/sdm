
private var func : Funcionario;

public var adaptabilidade : int = 50;
public var autoDitada : int = 50;
public var detalhista : int = 50;
public var negociacao : int = 50;
public var objetividade : int = 50;
public var organizacao : int = 50;
public var paciencia : int = 50;
public var raciocinioLogico : int = 50;
public var relacionamentoHumano : int = 50;
public var papel : String = "Nenhum";
public var salario : float = 0;
public var nome : String = "John";

public var assembly : boolean = false;
public var csharp : boolean = false;
public var java : boolean = false;
public var perl : boolean = false;
public var ruby : boolean = false;

public var metodoAgil : boolean = false;
public var metodoClassico : boolean = false;

public var desenvolvimentoAgil : boolean = false;
public var desenvolvimentoEvolutivo : boolean = false;
public var desenvolvimentoIterativo : boolean = false;

public var analiseDeProgramas : boolean = false;
public var controleDeVersao : boolean = false;
public var depuracao : boolean = false;
public var gerenciaDeProjetos : boolean = false;
public var metricas : boolean = false;
public var planejamento : boolean = false;
public var teste : boolean = false;


private var atualizado : boolean = false;
private var atributos : Atributos = new Atributos();
private var especializacao : Especializacoes = new Especializacoes();


function SetAtributos()
{
	atributos.adaptabilidade = adaptabilidade;
	atributos.autoDitada = autoDitada;
	atributos.detalhista = detalhista;
	atributos.negociacao = negociacao;
	atributos.objetividade = objetividade;
	atributos.organizacao = organizacao;
	atributos.paciencia = paciencia;
	atributos.raciocinioLogico = raciocinioLogico;
	atributos.relacionamentoHumano = relacionamentoHumano;
	
	func.SetAtributos(atributos);
}

function SetEspecializacoes()
{
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

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	}

//--------------------------------------------Update-----------------------------------------------------------

function Update () {
	if (!atualizado)
	{
		atualizado = true;
		SetAtributos();
		SetEspecializacoes();
		func.SetNome(nome);
		func.SetSalario(salario);
		func.SetPapel(papel);
	}
}