
private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;
private var showList = false;
public var stringNames : StringNames;
public var customGuiStyle : GUIStyle;

public var equipe : Equipe;

//--------------------------------------------MetogologiaEquipe-----------------------------------------------------------

//Implementar para permitir alteracao na metodologia

function MetodologiaEquipe(){
	GUI.BeginGroup(Rect (00,200,220,75));
	GUI.Box (Rect (00,00,130,25), "Team's Methodology: "); //+ equipe.GetMetodologia())
	if (Popup.List (Rect(130, 00, 90, 25), showList, listEntry, GUIContent( equipe.GetMetodologia()), list, listStyle)) {
		if (listEntry != 0)
		{
			switch(listEntry)
			{
			   case 1: 	//caso Agil
					equipe.SetMetodologia(stringNames.metodo1);
			   break;
			   
			   case 2: 	//caso Classico
					equipe.SetMetodologia(stringNames.metodo2);
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
}

//--------------------------------------------Start-----------------------------------------------------------

//Funcao que cria a lista para selecao de papel e visualizacao da ficha do funcionario
function Start () {
    // Make some content for the popup list	
	 list = new GUIContent[3];
	list[0] = new GUIContent("");
	list[1] = new GUIContent(stringNames.metodo1);
	list[2] = new GUIContent(stringNames.metodo2);
    
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
	//Exibe a metogologia da equipe
	MetodologiaEquipe();
}