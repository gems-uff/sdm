//Script para escolher o papel para cada funcinario pelo menu de funcionarios na parte superior da HUD. Tambem serve para exibir a ficha dos funcs.

//public var myFont : Font;
public var stringNames : StringNames;
private var showList1 = false;	//Showlist para cada mesa
private var showList2 = false;
private var showList3 = false;
private var showList4 = false;
private var showList5 = false;
private var showList6 = false;
private var showList7 = false;
private var showList8 = false;

private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;

private var treino : Treinamento;
private var func : Funcionario;
public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;
public var menuAtr : FuncWindow;
public var menuEsp : EspWindow;
public var menuPapel : PapelWindow;
public var workHours : WorkingHoursWindow;
public var playStyle : GameplayStyle;

private var novopapel = "";


//-----------------------------------------Funcoes da Popup List--------------------------------------------------------

//Funcao que executa as operacoes quando um item da lista popup eh selecionada
function ExecutaBotaoPopup(t : String, listEntry : int){
	funcObj = GameObject.Find(t);
	func = funcObj.GetComponent(Funcionario);
	treino = funcObj.GetComponent(Treinamento);
	if (listEntry != 0 && listEntry != 1)
	{
		switch(listEntry)
		{
			case 2: 	//"Change Task"
				if (treino.GetLockEscolha() == false)// && playStyle.IsMacro() == false)
					menuPapel.MudarPapel(func, treino);
		   break;
		   
		   case 3: 	//"Train"
				if (treino.GetLockEscolha() == false && playStyle.IsMacro() == false)
				{
					treino.SetLockEscolha(true);
					novopapel = TakePapel(listEntry);
					menuEsp.Especializar(func, treino);
				}
		   break;
		   
		   case 4: 	//"Profile"
				menuAtr.SetJanelatributo(func, true, func.report);
		   break;
		   
		   case 5: 	//"Work Hours"
				if(playStyle.IsMacro() == false)
					workHours.ChangeWorkHours(func);
		   break;
		   
		   default:
			break;
		}
	}
}

//Pega o papel correspondente ao box selecionado
function TakePapel(t: int)
{
	var papel : String;
	switch(t)
	{
	   case 2: 	//caso analista
		  papel = "Analyst";
	   break;
	   
	   case 3:	//caso arquiteto
			papel = "Architect";
	   break;
	   
	   case 4:	//caso gerente
			papel = "Manager";
	   break;
	   
	   case 5:	//caso marketing
			papel = "Marketing";
	   break;
	   
	   case 6:	//caso programador
			papel = "Programmer";
	   break;
	   
	   case 7:	//caso tester
			papel = "Tester";
	   break;
	   
	   case 8:	//caso nenhum papel
			papel = "None";
	   break;
	   
	   case 9:	//caso treinamento
			papel = "Training";
	   break;

	   default:
			papel = "None";
		break;
	}
	return papel;
}

//--------------------------------------------PopUpList-----------------------------------------------------------

function PopupList(){
	GUI.Box (Rect (180,00,720,20), "Staff Team");
	GUI.BeginGroup(Rect (180,20,1200,280));
	var sFunc1 : String;
	var sFunc2 : String;
	var sFunc3 : String;
	var sFunc4 : String;
	var sFunc5 : String;
	var sFunc6 : String;
	var sFunc7 : String;
	var sFunc8 : String;
	
	//If Micro Style
	if(playStyle.IsMacro() == false)
	{
		list[0] = new GUIContent("");
		list[1] = new GUIContent("");
	    list[2] = new GUIContent("Change Task");
	    list[3] = new GUIContent("Train");
	    list[4] = new GUIContent("Profile");
	    list[5] = new GUIContent("Work Hours");
    }
    else
    {
    //If Macro Style
		list[0] = new GUIContent("");
		list[1] = new GUIContent("");
		list[2] = new GUIContent("Change Task");
		list[3] = new GUIContent("");
		list[4] = new GUIContent("Profile");
		list[5] = new GUIContent("");
	}
	//
	if (func1.GetNome() != stringNames.fired)
	{
		sFunc1 = func1.GetNome() +"\n"+ func1.GetPapel()+"\n"+ func1.GetPapelSec();
	}
	else
	{
		sFunc1 = "";
	}
	if (func2.GetNome() != stringNames.fired)
	{
		sFunc2 = func2.GetNome() +"\n"+ func2.GetPapel()+"\n"+ func2.GetPapelSec();
	}
	else
	{
		sFunc2 = "";
	}
	if (func3.GetNome() != stringNames.fired)
	{
		sFunc3 = func3.GetNome() +"\n"+ func3.GetPapel()+"\n"+ func3.GetPapelSec();
	}
	else
	{
		sFunc3 = "";
	}
	if (func4.GetNome() != stringNames.fired)
	{
		sFunc4 = func4.GetNome() +"\n"+ func4.GetPapel()+"\n"+ func4.GetPapelSec();
	}
	else
	{
		sFunc4 = "";
	}
	if (func5.GetNome() != stringNames.fired)
	{
		sFunc5 = func5.GetNome() +"\n"+ func5.GetPapel()+"\n"+ func5.GetPapelSec();
	}
	else
	{
		sFunc5 = "";
	}
	if (func6.GetNome() != stringNames.fired)
	{
		sFunc6 = func6.GetNome() +"\n"+ func6.GetPapel()+"\n"+ func6.GetPapelSec();
	}
	else
	{
		sFunc6 = "";
	}
	if (func7.GetNome() != stringNames.fired)
	{
		sFunc7 = func7.GetNome() +"\n"+ func7.GetPapel()+"\n"+ func7.GetPapelSec();
	}
	else
	{
		sFunc7 = "\n Marketing \n";
	}
	if (func8.GetNome() != stringNames.fired)
	{
		sFunc8 = func8.GetNome() +"\n"+ func8.GetPapel()+"\n"+ func8.GetPapelSec();
	}
	else
	{
		sFunc8 = "\n Manager \n";
	}
	
	if (Popup.List (Rect(000, 00, 90, 60), showList1, listEntry, GUIContent(sFunc1), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario1", listEntry);
    }
	if (Popup.List (Rect(90, 00, 90, 60), showList2, listEntry, GUIContent(sFunc2), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario2", listEntry);
    }
	if (Popup.List (Rect(180, 00, 90, 60), showList3, listEntry, GUIContent(sFunc3), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario3", listEntry);
    }
	if (Popup.List (Rect(270, 00, 90, 60), showList4, listEntry, GUIContent(sFunc4), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario4", listEntry);
    }
	if (Popup.List (Rect(360, 00, 90, 60), showList5, listEntry, GUIContent(sFunc5), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario5", listEntry);
    }
	if (Popup.List (Rect(450, 00, 90, 60), showList6, listEntry, GUIContent(sFunc6), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario6", listEntry);
    }
	if (Popup.List (Rect(540, 00, 90, 60), showList7, listEntry, GUIContent(sFunc7), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario7", listEntry);
    }
	if (Popup.List (Rect(630, 00, 90, 60), showList8, listEntry, GUIContent(sFunc8), list, listStyle)) {
			ExecutaBotaoPopup("Funcionario8", listEntry);
		}

	GUI.EndGroup ();
}

//--------------------------------------------Awake-----------------------------------------------------------

//"inicializa" cada funcionario
function Awake () {

	}
//--------------------------------------------Start-----------------------------------------------------------

//Funcao que cria a lista para selecao de papel e visualizacao da ficha do funcionario
function Start () {
    // Make some content for the popup list
    list = new GUIContent[6];
	list[0] = new GUIContent("");
	list[1] = new GUIContent("");
    list[2] = new GUIContent("Change Task");
    list[3] = new GUIContent("Train");
    list[4] = new GUIContent("Profile");
    list[5] = new GUIContent("Work Hours");
	
    // Make a GUIStyle that has a solid white hover/onHover background to indicate highlighted items
    listStyle = new GUIStyle();
    listStyle.normal.textColor = Color.green;
	listStyle.fontSize= 12;
    var tex = new Texture2D(2, 2);
    listStyle.hover.background = tex;
    listStyle.onHover.background = tex;
    listStyle.padding.left = listStyle.padding.right = listStyle.padding.top = listStyle.padding.bottom = 4;
}


//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	PopupList();
	//GUI.skin.button.font = myFont;
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
}
