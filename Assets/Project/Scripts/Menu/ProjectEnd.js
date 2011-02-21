public var customGuiStyle : GUIStyle;
private var project : Project;


//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function ProjetoTermina()	{
	if((project.GetTimePassed() > project.GetDeadlineHours()))		//Tela que Deadline Expiro
	{
		GUI.Box (Rect (250,150,90,50), "Fim do Prazo !");
			if((project.GetTimePassed() > project.GetDeadlineHours()) && !(project.GetIscomplete()))		//Se passo do prazo e nao foi terminado, seta como terminado
			{
				project.SetIscomplete(true);
			}
	}
	
	if((project.GetNumLinesDone() >= 100))							//Tela que projeto foi concluido a tempo
	{
		project.SetIscomplete(true);
		GUI.Box (Rect (250,150,90,50), "PARABENS !");
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	ProjetoTermina();
}