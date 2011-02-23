
//Usa Time.timeScale = 0.5;

public var customGuiStyle : GUIStyle;
private var project : Project;
private var pgjog : PagarJogador;
public var msgFalha : String;
//public var msgSucesso : String;
private var closeDialog : boolean = false;

//Funcoes Get/Set para serem utilizadas caso seja possivel aceitar outro projeto apois a conclusao do corrente. O set "reseta" este script
function GetCloseDialog(){
	return closeDialog;
}

function SetCloseDialog(){
	closeDialog = false;
}

msgFalha = "\n Fim do Prazo \n\n Nos nao conseguimos terminar a tempo e perdemos o contrato !";
//msgSucesso = "\n Concluimos o projeto requisitado e ja podemos entreguar ao cliente";
//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function ProjetoTermina()	{
	if(!closeDialog)
	{
		GUI.BeginGroup(Rect (350,125,400,375));
		if(project.GetTimePassed() > project.GetDeadlineHours())		//Tela que Deadline Expiro
		{
			Time.timeScale = 0.0;
			GUI.Box (Rect (0,0,300,350), msgFalha, customGuiStyle);
			project.SetIscomplete(true);
			if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
			{
				closeDialog = true;
				Time.timeScale = 0.5;
			}
		}
		if(project.GetNumLinesDone() >= 100)							//Tela que projeto foi concluido a tempo
		{
			Time.timeScale = 0.0;
			project.SetIscomplete(true);
			GUI.Box (Rect (0,0,300,350), 
			"\n Concluimos o projeto requisitado e ja podemos entreguar ao cliente \n\n" +
			"Segue abaixo os dados do projeto entregue: \n" +
			"Sincronismo: " + parseInt(project.GetSincronismo()).ToString() + " %" +
			"\n # Bugs encontrados: " + parseInt(project.GetNumBugs()).ToString() +
			"\n Dinheiro recebido: " + pgjog.CalculaPagamentoFinal()
			, customGuiStyle);
			if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
			{
				closeDialog = true;
				Time.timeScale = 0.5;
			}
		}
		GUI.EndGroup ();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
	pgjog = GetComponentInChildren(PagarJogador);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	ProjetoTermina();
}