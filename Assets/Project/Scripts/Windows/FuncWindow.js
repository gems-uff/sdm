//Para usar este script:
//private var menuObj : GameObject;
//private var menu : FuncWindow;
//menuObj = GameObject.Find("GUI");
//menu = menuObj.GetComponent(FuncWindow);
//menu.SetJanelatributo(funcionario : Funcionario);

public var DAYS_MONTH : int = 28;
public var timer : GameTime;
public var stringNames : StringNames;
public var fichaGuiStyle : GUIStyle;
private var especializacao_array = new Array(17);
private var atributos : Atributos = new Atributos();

private var nome : String;
private var salario : int;
private var salarioDay : int;
private var papel : String;
private var cargo : String;
private var showJanela	:boolean = false;
private var workHours : int;
private var morale : int;

private var windowRect : Rect = Rect (600,125,400,420);

function DisableShowWindow(){
	showJanela = false;
}
//--------------------------------------------FichaFuncionarioEspecializacao-----------------------------------------------------------

//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
function SetJanelatributo(funcionario : Funcionario){
	var i : int = 0;
	var a2 : Especializacoes;
	if(funcionario.GetNome() != stringNames.fired)
	{
		a2 = funcionario.GetEspecializacao();
		nome = funcionario.GetNome();
		atributos = funcionario.GetAtributos();
		salario = funcionario.GetSalario();
		salarioDay = salario / DAYS_MONTH;
		papel = funcionario.GetPapel();
		cargo = funcionario.GetCargo();
		workHours = funcionario.GetWorkingHours();
		showJanela = true;
		morale = parseInt(funcionario.GetMorale());
		
		for (i=0;i<=17;i++)
			especializacao_array[i]  = "";
		
		i = 0;
		if ( a2.assembly == true )
		{
			especializacao_array[i] = stringNames.showEsp01;
			i++;
		}
		if ( a2.csharp == true )
		{
			especializacao_array[i] = stringNames.showEsp02;
			i++;
		}
		if ( a2.java == true )
		{
			especializacao_array[i] =  stringNames.showEsp03;
			i++;
		}
		if ( a2.perl == true )
		{
			especializacao_array[i] =  stringNames.showEsp04;
			i++;
		}
		if ( a2.ruby == true )
		{
			especializacao_array[i] =  stringNames.showEsp05;
			i++;
		}
		if ( a2.metodoAgil == true )
		{
			especializacao_array[i] = stringNames.showEsp06;
			i++;
		}
		if ( a2.metodoClassico == true )
		{
			especializacao_array[i] = stringNames.showEsp07;
			i++;
		}
		if ( a2.analiseDeProgramas == true )
		{
			especializacao_array[i] = stringNames.showEsp08;
			i++;
		}
		if ( a2.controleDeVersao == true )
		{
			especializacao_array[i] = stringNames.showEsp09;
			i++;
		}
		if ( a2.depuracao == true )
		{
			especializacao_array[i] = stringNames.showEsp10;
			i++;
		}
		if ( a2.gerenciaDeProjetos == true )
		{
			especializacao_array[i] = stringNames.showEsp11;
			i++;
		}
		if ( a2.metricas == true )
		{
			especializacao_array[i] = stringNames.showEsp12;
			i++;
		}
		if ( a2.planejamento == true )
		{
			especializacao_array[i] = stringNames.showEsp13;
			i++;
		}
		if ( a2.teste == true )
		{
			especializacao_array[i] = stringNames.showEsp14;
			i++;
		}
	}
}

//--------------------------------------------FichaFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function WindowFunction (windowID : int)	{
	timer.PauseGame();
	//Lado esquerdo
	GUI.Box (Rect (02,018,198,20), (" Name: "+ nome),fichaGuiStyle);
	GUI.Box (Rect (02,038,198,20), (" Morale: "+ morale + "%"),fichaGuiStyle);
	GUI.Box (Rect (02,058,198,20), (" Role: "+ papel),fichaGuiStyle);
	GUI.Box (Rect (02,078,198,20), (" Grade: "+ cargo),fichaGuiStyle);
	GUI.Box (Rect (02,098,198,20), (" Weekly Hours: "+ workHours),fichaGuiStyle);
	GUI.Box (Rect (02,118,198,20), (" Monthly Salary: $"+ salario),fichaGuiStyle);
	GUI.Box (Rect (02,138,198,20), (" Salary/Day: $"+ salarioDay),fichaGuiStyle);
	GUI.Box (Rect (02,158,198,20), (" "),fichaGuiStyle);
	GUI.Box (Rect (02,178,198,20), (" "),fichaGuiStyle);
	//Lado direito
	GUI.Box (Rect (200,018,198,20), (" Adaptability: "+ atributos.adaptabilidade),fichaGuiStyle);
	GUI.Box (Rect (200,038,198,20), (" Autodidact: "+ atributos.autoDitada),fichaGuiStyle);
	GUI.Box (Rect (200,058,198,20), (" Human Relations: "+ atributos.relacionamentoHumano),fichaGuiStyle);
	GUI.Box (Rect (200,078,198,20), (" Logical Reasoning: "+ atributos.raciocinioLogico),fichaGuiStyle);
	GUI.Box (Rect (200,098,198,20), (" Meticulous: "+ atributos.detalhista),fichaGuiStyle);
	GUI.Box (Rect (200,118,198,20), (" Negotiation: "+ atributos.negociacao),fichaGuiStyle);
	GUI.Box (Rect (200,138,198,20), (" Objectivity: "+ atributos.objetividade),fichaGuiStyle);
	GUI.Box (Rect (200,158,198,20), (" Organization: "+ atributos.organizacao),fichaGuiStyle);
	GUI.Box (Rect (200,178,198,20), (" Patience: "+ atributos.paciencia),fichaGuiStyle);
	
	//Embaixo dos atributos
	GUI.Box (Rect (02,198,396,20), ("-------------------------------- Specialties --------------------------------"),fichaGuiStyle);
	//Lado esquerdo
	GUI.Box (Rect (02,218,198,20), ("\t" + especializacao_array[0].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,238,198,20), ("\t" + especializacao_array[1].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,258,198,20), ("\t" + especializacao_array[2].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,278,198,20), ("\t" + especializacao_array[3].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,298,198,20), ("\t" + especializacao_array[4].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,318,198,20), ("\t" + especializacao_array[5].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,338,198,20), ("\t" + especializacao_array[6].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,358,198,20), ("\t" + especializacao_array[7].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,378,198,20), ("\t" + especializacao_array[8].ToString()),fichaGuiStyle);
	//Lado direito
	GUI.Box (Rect (200,218,198,20), ("\t" + especializacao_array[9].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,238,198,20), ("\t" + especializacao_array[10].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,258,198,20), ("\t" + especializacao_array[11].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,278,198,20), ("\t" + especializacao_array[12].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,298,198,20), ("\t" + especializacao_array[13].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,318,198,20), ("\t" + especializacao_array[14].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,338,198,20), ("\t" + especializacao_array[15].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,358,198,20), ("\t" + especializacao_array[16].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,378,198,20), ("\t" + especializacao_array[17].ToString()),fichaGuiStyle);
	
	if (GUI.Button (Rect (02,398,396,20), "Close Profile")) 
	{
		showJanela  = false;
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	if(showJanela)
		windowRect = GUI.Window (1, windowRect, WindowFunction, "Profile");
}
