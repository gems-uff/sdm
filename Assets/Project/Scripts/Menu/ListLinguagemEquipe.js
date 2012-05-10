
private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;
private var showList = false;
public var equipe : Equipe;
public var stringNames : StringNames;
public var playStyle : GameplayStyle;
public var customGuiStyle : GUIStyle;


//--------------------------------------------LinguagemEquipe-----------------------------------------------------------

//Implementar para permitir alteracao na metodologia

function LinguagemEquipe(){
	GUI.Box (Rect (00,00,180,25), "Staff's Settings");
	GUI.BeginGroup(Rect (00,25,220,175));
	GUI.Box (Rect (00,00,90,25), "Language:"); //+ equipe.GetMetodologia())
	if(playStyle.IsMacro() == false)
	{
		if (Popup.List (Rect(00, 25, 90, 25), showList, listEntry, GUIContent( equipe.GetLinguagem()), list, listStyle)) 
		{
			if (listEntry != 0)
			{
				switch(listEntry)
				{
				   case 1: 	//caso asembly
						equipe.SetLinguagem(stringNames.esp01);
				   break;
				   
				   case 2: 	//caso csharp
						equipe.SetLinguagem(stringNames.esp02);
				   break;
				   
				   case 3: 	//caso java
						equipe.SetLinguagem(stringNames.esp03);
				   break;
				   
				   case 4: 	//caso perl
						equipe.SetLinguagem(stringNames.esp04);
				   break;
				   case 5: 	//caso ruby
						equipe.SetLinguagem(stringNames.esp05);
				   break;
				   
				   default:
					break;
				}
			}
		}
	}
	else
	{
		GUI.Box (Rect (00,25,90,25), equipe.GetLinguagem());
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
	list = new GUIContent[6];
	list[0] = new GUIContent("");
	list[1] = new GUIContent(stringNames.showEsp01);
	list[2] = new GUIContent(stringNames.showEsp02);
	list[3] = new GUIContent(stringNames.showEsp03);
	list[4] = new GUIContent(stringNames.showEsp04);
	list[5] = new GUIContent(stringNames.showEsp05);
    
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