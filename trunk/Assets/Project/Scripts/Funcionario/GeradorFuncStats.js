
private var func : Funcionario;

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
public var salario = 0;
public var nummesa = 0;

public var assembly = false;
public var csharp = false;
public var java = false;
public var perl = false;
public var ruby = false;

public var metodoAgil = false;
public var metodoClassico = false;

public var desenvolvimentoAgil = false;
public var desenvolvimentoEvolutivo = false;
public var desenvolvimentoIterativo = false;

public var analiseDeProgramas = false;
public var controleDeVersao = false;
public var depuracao = false;
public var gerenciaDeProjetos = false;
public var metricas = false;
public var planejamento = false;
public var teste = false;


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
	atributos.papel = papel;
	atributos.salario = salario;
	atributos.nummesa = nummesa;
	
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
	
	especializacao.desenvolvimentoIterativo = desenvolvimentoIterativo;
	especializacao.desenvolvimentoAgil = desenvolvimentoAgil;
	especializacao.desenvolvimentoEvolutivo = desenvolvimentoEvolutivo;
	
	especializacao.controleDeVersao = controleDeVersao;
	especializacao.planejamento = planejamento;
	especializacao.metricas = metricas;
	especializacao.gerenciaDeProjetos = gerenciaDeProjetos;
	especializacao.depuracao = depuracao;
	especializacao.teste = teste;
	especializacao.analiseDeProgramas = analiseDeProgramas;
	
	func.SetEspecializacoes(especializacao);
}

function Awake () {
	func = GetComponentInChildren(Funcionario);
	}

function Update () {
	if (!atualizado)
	{
		atualizado = true;
		SetAtributos();
		SetEspecializacoes();
	}
}