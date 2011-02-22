//Este script tem apenas um proposito, exibir a janela com os dados do projeto
//Para usar este scrip precisa de:
//private var projectW : ProjectWindow;
//projectW = GetComponentInChildren(ProjectWindow);


private var project : Project;
private var showWindow : boolean = false;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;

//Funcao que permite a exibicao da janela com os dados do projeto
function SetShowWindow(){
	showWindow = true;
}

function ShowProjectDetails(){
	var deadline = project.GetDeadLine();
	var linguagem = project.GetLinguagem();
	var pagamento = project.GetPagamento();
	if (showWindow)
	{
		GUI.BeginGroup(Rect (350,125,400,375));
		GUI.Box (Rect (0,0,300,350), 
		("\n DESCRICAO PROJETO: \n \n" +
		"<Fazer descricao> \n \n" +
		" Deadline: " + deadline + "\n"+ 
		" Linguagem: " + linguagem + "\n" +
		" Pagamento Mensal: " + pagamento +
		"\n Pagamento de conclusao: " + pagamento*4 +
		"\n\n\n\n PS: O pagamento final pode sofrer variacoes de acordo com o produto entregue."), customGuiStyle);
		
		if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
		{
			showWindow  = false;
		}
		GUI.EndGroup ();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	ShowProjectDetails();
}