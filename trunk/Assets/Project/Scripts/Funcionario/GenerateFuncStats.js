
private var func : Funcionario;

public var adaptabilidade = 51;
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

private var atualizado : boolean = false;
private var atributos : Atributos = new Atributos();


function SetaAtributos()
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

function Awake () {
	func = GetComponentInChildren(Funcionario);
	}

function Update () {
	if (!atualizado)
	{
		atualizado = true;
		SetaAtributos();
	}
}