#pragma strict
public var setStats : boolean = false;
private var func : Funcionario;
public var adaptabilidade : int;
public var autoDidata : int;
public var detalhista : int;
public var negociacao : int;
public var objetividade : int;
public var organizacao : int;
public var paciencia : int;
public var raciocinioLogico : int;
public var relacionamentoHumano : int;

public var assembly : boolean;
public var csharp : boolean;
public var java : boolean;
public var perl : boolean;
public var ruby : boolean;

//Especializacoes de metodologias
//afetara o desempenho de cada integrante da equipe
public var metodoAgil : boolean;
public var metodoClassico : boolean;

//Especializacoes de ferramentas
public var analiseDeProgramas : boolean;					//+bonus em arquiteto
public var controleDeVersao : boolean;						//+ bonus em programacao
public var depuracao : boolean; 								//+bonus em testers e programadores
public var gerenciaDeProjetos : boolean;					//+ bonus em gerente
public var metricas : boolean;									//+bonus em analista
public var planejamento : boolean;							//+bonus em gerente
public var teste : boolean;		
	
function Start () {
	
}

function Update () {

}

function Awake () {
	if(setStats)
	{
		func = GetComponentInChildren(Funcionario);
		
		var atributos : Atributos = new Atributos();
		
		atributos.adaptabilidade = adaptabilidade;
		atributos.autoDidata = autoDidata;
		atributos.detalhista = detalhista;
		atributos.negociacao = negociacao;
		atributos.objetividade = objetividade;
		atributos.organizacao = organizacao;
		atributos.paciencia = paciencia;
		atributos.raciocinioLogico = raciocinioLogico;
		atributos.relacionamentoHumano = relacionamentoHumano;
		
		func.SetAtributos(atributos);
		
		
		var especializacao : Especializacoes = new Especializacoes();
		
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
}