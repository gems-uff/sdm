class Atributos extends System.ValueType{

//fields
public var adaptabilidade : int;
public var autoDidata : int;
public var detalhista : int;
public var negociacao : int;
public var objetividade : int;
public var organizacao : int;
public var paciencia : int;
public var raciocinioLogico : int;
public var relacionamentoHumano : int;

//Constructor 

	public function Atributos(a1 : int, a2 : int, a3 : int, a4 : int, a5 : int, a6 : int, a7 : int, a8 : int, a9 : int)
	{
		this.adaptabilidade = a1;
		this.autoDidata = a2;
		this.detalhista = a3;
		this.negociacao = a4;
		this.objetividade = a5;
		this.organizacao = a6;
		this.paciencia = a7;
		this.raciocinioLogico =a8;
		this.relacionamentoHumano = a9;
	}
}