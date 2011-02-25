//Para usar este script:
//private var menuObj : GameObject;
//private var menu : FuncWindow;
//menuObj = GameObject.Find("GUI");
//menu = menuObj.GetComponent(FuncWindow);
//menu.SetJanelatributo(func.GetAtributos(), func.GetEspecializacao(), func.GetNome(), func.GetPapel(),func.GetSalario());

private var timerObj : GameObject;
private var timer : GameTime;
public var fichaGuiStyle : GUIStyle;
private var especializacao_array = new Array(17);
public var atributos : Atributos = new Atributos();

private var nome : String;
private var salario : int;
private var papel : String;
private var showJanela	:boolean = false;

//--------------------------------------------FichaFuncionarioEspecializacao-----------------------------------------------------------

//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
function SetJanelatributo(a1 : Atributos, a2 : Especializacoes, funcNome : String, funcPapel : String, funcSalario : int ){
	var i : int = 0;
	nome = funcNome;
	showJanela = true;
	atributos = a1;
	salario = funcSalario;
	papel = funcPapel;
	
	for (i=0;i<=17;i++)
		especializacao_array[i]  = "";
	
	i = 0;
	if ( a2.assembly == true )
	{
		especializacao_array[i] = " Assembly";
		i++;
	}
	if ( a2.csharp == true )
	{
		especializacao_array[i] = " Csharp";
		i++;
	}
	if ( a2.java == true )
	{
		especializacao_array[i] = " Java";
		i++;
	}
	if ( a2.perl == true )
	{
		especializacao_array[i] = " Perl";
		i++;
	}
	if ( a2.ruby == true )
	{
		especializacao_array[i] = " Ruby";
		i++;
	}
	if ( a2.metodoAgil == true )
	{
		especializacao_array[i] = " Agile Method";
		i++;
	}
	if ( a2.metodoClassico == true )
	{
		especializacao_array[i] = " Classic Method";
		i++;
	}
	if ( a2.analiseDeProgramas == true )
	{
		especializacao_array[i] = " Analysis Program";
		i++;
	}
	if ( a2.controleDeVersao == true )
	{
		especializacao_array[i] = " Version Control";
		i++;
	}
	if ( a2.depuracao == true )
	{
		especializacao_array[i] = " Depuration";
		i++;
	}
	if ( a2.gerenciaDeProjetos == true )
	{
		especializacao_array[i] = " Project Management";
		i++;
	}
	if ( a2.metricas == true )
	{
		especializacao_array[i] = " Metrics";
		i++;
	}
	if ( a2.planejamento == true )
	{
		especializacao_array[i] = " Planning";
		i++;
	}
	if ( a2.teste == true )
	{
		especializacao_array[i] = " Test";
		i++;
	}
}

//--------------------------------------------FichaFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function MostraJanelaFunc()	{
	if(showJanela)
	{
		timer.PauseGame();
		GUI.BeginGroup(Rect (350,125,750,350));
		//Lado esquerdo
		GUI.Box (Rect (0,0,200,25), (" Name: "+ nome),fichaGuiStyle);
		GUI.Box (Rect (0,25,200,25), (" Adaptability: "+ atributos.adaptabilidade),fichaGuiStyle);
		GUI.Box (Rect (0,50,200,25), (" Autodidact: "+ atributos.autoDitada),fichaGuiStyle);
		GUI.Box (Rect (0,75,200,25), (" Meticulous: "+ atributos.detalhista),fichaGuiStyle);
		GUI.Box (Rect (0,100,200,25), (" Negotiation: "+ atributos.negociacao),fichaGuiStyle);
		GUI.Box (Rect (0,125,200,25), (" Objectivity: "+ atributos.objetividade),fichaGuiStyle);
		//Lado direito
		GUI.Box (Rect (200,0,200,25), (" Organization: "+ atributos.organizacao),fichaGuiStyle);
		GUI.Box (Rect (200,25,200,25), (" Patience: "+ atributos.paciencia),fichaGuiStyle);
		GUI.Box (Rect (200,50,200,25), (" Logical Reasoning: "+ atributos.raciocinioLogico),fichaGuiStyle);
		GUI.Box (Rect (200,75,200,25), (" Human Relations: "+ atributos.relacionamentoHumano),fichaGuiStyle);
		GUI.Box (Rect (200,100,200,25), (" Role: "+ papel),fichaGuiStyle);
		GUI.Box (Rect (200,125,200,25), (" Salary: "+ salario),fichaGuiStyle);
		//Embaixo dos atributos
		GUI.Box (Rect (0,150,400,25), ("---------------------------------- Specialties ----------------------------------"),fichaGuiStyle);
		GUI.Box (Rect (0,175,400,25), (especializacao_array[0].ToString()+ "\t" + especializacao_array[1].ToString() + "\t" + especializacao_array[2].ToString()),fichaGuiStyle);
		GUI.Box (Rect (0,200,400,25), (especializacao_array[3].ToString()+ "\t" + especializacao_array[4].ToString() + "\t" + especializacao_array[5].ToString()),fichaGuiStyle);
		GUI.Box (Rect (0,225,400,25), (especializacao_array[6].ToString()+ "\t" + especializacao_array[7].ToString() + "\t" + especializacao_array[8].ToString()),fichaGuiStyle);
		GUI.Box (Rect (0,250,400,25), (especializacao_array[9].ToString()+ "\t" + especializacao_array[10].ToString() + "\t" + especializacao_array[11].ToString()),fichaGuiStyle);
		GUI.Box (Rect (0,275,400,25), (especializacao_array[12].ToString()+ "\t" + especializacao_array[13].ToString() + "\t" + especializacao_array[14].ToString()),fichaGuiStyle);
		GUI.Box (Rect (0,300,400,25), (especializacao_array[15].ToString()+ "\t" + especializacao_array[16].ToString() + "\t" + especializacao_array[17].ToString()),fichaGuiStyle);
		
		if (GUI.Button (Rect (0,325,400,25), "Close Window")) 
		{
			showJanela  = false;
			timer.SpeedNormal();
		}
		GUI.EndGroup ();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Janela das fichas dos funcionarios
	MostraJanelaFunc();
}