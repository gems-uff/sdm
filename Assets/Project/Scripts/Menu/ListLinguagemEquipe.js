
private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;
private var showList = false;
public var customGuiStyle : GUIStyle;

private var equipeObj : GameObject;
private var equipe : Equipe;

//--------------------------------------------LinguagemEquipe-----------------------------------------------------------

//Implementar para permitir alteracao na metodologia

function LinguagemEquipe(){
	GUI.BeginGroup(Rect (00,225,220,150));
	GUI.Box (Rect (00,00,130,25), "Linguagem Equipe: "); //+ equipe.GetMetodologia())
	if (Popup.List (Rect(130, 00, 90, 25), showList, listEntry, GUIContent( equipe.GetLinguagem()), list, listStyle)) {
		if (listEntry != 0)
		{
			switch(listEntry)
			{
			   case 1: 	//caso Agil
					equipe.SetLinguagem("assembly");
			   break;
			   
			   case 2: 	//caso Classico
					equipe.SetLinguagem("csharp");
			   break;
			   
			   case 3: 	//caso Classico
					equipe.SetLinguagem("java");
			   break;
			   
			   case 4: 	//caso Classico
					equipe.SetLinguagem("perl");
			   break;
			   case 5: 	//caso Classico
					equipe.SetLinguagem("ruby");
			   break;
			   
			   default:
				break;
			}
		}
	}
	GUI.EndGroup ();
	
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
}

//--------------------------------------------Start-----------------------------------------------------------

//Funcao que cria a lista para selecao de papel e visualizacao da ficha do funcionario
function Start () {
    // Make some content for the popup list	
	list = new GUIContent[6];
	list[0] = new GUIContent("");
	list[1] = new GUIContent("assembly");
	list[2] = new GUIContent("csharp");
	list[3] = new GUIContent("java");
	list[4] = new GUIContent("perl");
	list[5] = new GUIContent("ruby");
    
    // Make a GUIStyle that has a solid white hover/onHover background to indicate highlighted items
    listStyle = new GUIStyle();
    listStyle.normal.textColor = Color.green;
    var tex = new Texture2D(2, 2);
    listStyle.hover.background = tex;
    listStyle.onHover.background = tex;
    listStyle.padding.left = listStyle.padding.right = listStyle.padding.top = listStyle.padding.bottom = 4;
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Exibe a linguagem de programacao adotada pela equipe
	LinguagemEquipe();
}