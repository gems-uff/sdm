
private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;
private var showList = false;
private var NUMBEROFDAYS = 5;
public var stringNames : StringNames;
public var customGuiStyle : GUIStyle;
public var projeto : Project;
public var gametime : GameTime;

public var equipe : Equipe;

function AlterarMetodologia(metodologia : String)
{
	if (gametime. GetGameTime() < projeto.GetStartDay() + NUMBEROFDAYS)
		equipe.SetMetodologia(metodologia);
}
//--------------------------------------------MetogologiaEquipe-----------------------------------------------------------

//Implementar para permitir alteracao na metodologia

function MetodologiaEquipe(){
	GUI.BeginGroup(Rect (90,25,220,100));
	GUI.Box (Rect (00,00,90,25), "Methodology:"); //+ equipe.GetMetodologia())
	if (Popup.List (Rect(00, 25, 90, 25), showList, listEntry, GUIContent( equipe.GetMetodologia()), list, listStyle)) {
		if (listEntry != 0)
		{
			switch(listEntry)
			{
			   case 1: 	//caso Agil
					//equipe.SetMetodologia(stringNames.metodo1);
					AlterarMetodologia(stringNames.metodo1);
			   break;
			   
			   case 2: 	//caso Classico
					//equipe.SetMetodologia(stringNames.metodo2);
					AlterarMetodologia(stringNames.metodo2);
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