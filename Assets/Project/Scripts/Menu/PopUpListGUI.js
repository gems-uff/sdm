//Script para escolher o papel para cada funcinario pelo menu de funcionarios na parte superior da HUD. Tambem serve para exibir a ficha dos funcs.

//public var myFont : Font;
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
				if (treino.GetLockEscolha() == false)
					menuPapel.MudarPapel(func, treino);
		   break;
		   
		   case 3: 	//"Train"
				if (treino.GetLockEscolha() == false)
				{
					treino.SetLockEscolha(true);
					novopapel = TakePapel(listEntry);
					menuEsp.Especializar(func, treino);
				}
		   break;
		   
		   case 4: 	//"Profile"
				menuAtr.SetJanelatributo(func, true);
		   break;
		   
		   case 5: 	//"Work Hours"
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
	if (Popup.List (Rect(000, 00, 90, 40), showList1, listEntry, GUIContent( func1.GetNome() +"\n"+ func1.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario1", listEntry);
    }
	if (Popup.List (Rect(90, 00, 90, 40), showList2, listEntry, GUIContent(func2.GetNome() +"\n"+ func2.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario2", listEntry);
    }
	if (Popup.List (Rect(180, 00, 90, 40), showList3, listEntry, GUIContent(func3.GetNome() +"\n"+ func3.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario3", listEntry);
    }
	if (Popup.List (Rect(270, 00, 90, 40), showList4, listEntry, GUIContent(func4.GetNome() +"\n"+ func4.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario4", listEntry);
    }
	if (Popup.List (Rect(360, 00, 90, 40), showList5, listEntry, GUIContent(func5.GetNome() +"\n"+ func5.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario5", listEntry);
    }
	if (Popup.List (Rect(450, 00, 90, 40), showList6, listEntry, GUIContent(func6.GetNome() +"\n"+ func6.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario6", listEntry);
    }
	if (Popup.List (Rect(540, 00, 90, 40), showList7, listEntry, GUIContent(func7.GetNome() +"\n"+ func7.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario7", listEntry);
    }
	if (Popup.List (Rect(630, 00, 90, 40), showList8, listEntry, GUIContent(func8.GetNome() +"\n"+ func8.GetPapel()), list, listStyle)) {
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
