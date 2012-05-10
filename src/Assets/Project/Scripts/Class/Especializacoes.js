class Especializacoes extends System.ValueType{

	//fields
	//Especializacoes para codificacao
	//Afetará os programadores e testers, projetos podem ter um destes itens como requisito
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
	public var teste : boolean;											//+bonus em testers

	//Constructor 

	public function Especializacao(a1 : boolean, a2 : boolean, a3 : boolean, a4 : boolean, a5 : boolean, a6 : boolean, a7 : boolean, a8 : boolean, a9 : boolean,
	a10 : boolean, a11 : boolean, a12 : boolean, a13 : boolean, a14 : boolean)
	{
		this.assembly = a1;
		this.csharp = a2;
		this.java = a3;
		this.perl = a4;
		this.ruby = a5;
		
		this.metodoAgil = a6;
		this.metodoClassico = a7;
		
		this.analiseDeProgramas = a8;
		this.controleDeVersao = a9;
		this.depuracao = a10;
		this.gerenciaDeProjetos = a11;
		this.metricas = a12;
		this.planejamento = a13;
		this.teste = a14;
	}
}
