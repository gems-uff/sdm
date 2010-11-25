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

private var func1Obj : GameObject;
private var func2Obj : GameObject;
private var func3Obj : GameObject;
private var func4Obj : GameObject;
private var func5Obj : GameObject;
private var func6Obj : GameObject;
private var func7Obj : GameObject;
private var func8Obj : GameObject;

private var func1 : Funcionario;
private var func2 : Funcionario;
private var func3 : Funcionario;
private var func4 : Funcionario;
private var func5 : Funcionario;
private var func6 : Funcionario;
private var func7 : Funcionario;
private var func8 : Funcionario;

private var novopapel = "";


function Awake () {
		func1Obj = GameObject.Find("Funcionario1");
		func1 = func1Obj.GetComponent(Funcionario);
		func2Obj = GameObject.Find("Funcionario2");
		func2 = func2Obj.GetComponent(Funcionario);
		func3Obj = GameObject.Find("Funcionario3");
		func3 = func3Obj.GetComponent(Funcionario);
		func4Obj = GameObject.Find("Funcionario4");
		func4 = func4Obj.GetComponent(Funcionario);
		func5Obj = GameObject.Find("Funcionario5");
		func5 = func5Obj.GetComponent(Funcionario);
		func6Obj = GameObject.Find("Funcionario6");
		func6 = func6Obj.GetComponent(Funcionario);
		func7Obj = GameObject.Find("Funcionario7");
		func7 = func7Obj.GetComponent(Funcionario);
		func8Obj = GameObject.Find("Funcionario8");
		func8 = func8Obj.GetComponent(Funcionario);
	}
	

//Pega o papel correspondente ao box selecionado
function TakePapel(t: int)
{
	var papel;
	switch(t)
		{
		   case 0: 	//caso analista
			  papel = "Analista";
			  return papel;
		   break;
		   case 1:	//caso arquiteto
				papel = "Arquiteto";
				return papel;
		   break;
		   
		   case 2:	//caso gerente
				papel = "Gerente";
				return papel;
		   break;
		   
		   case 3:	//caso marketing
				papel = "Marketing";
				return papel;
		   break;
		   
		   case 4:	//caso programador
				papel = "Programador";
				return papel;
		   break;
		   
		   case 5:	//caso tester
				papel = "Testador";
				return papel;
		   break;

		   default:
				papel = "Nenhum";
				return papel;
			break;

		}
}
function Start () {
    // Make some content for the popup list
    list = new GUIContent[6];
    list[0] = new GUIContent("Analista");
    list[1] = new GUIContent("Arquiteto");
    list[2] = new GUIContent("Gerente");
    list[3] = new GUIContent("Marketing");
    list[4] = new GUIContent("Programador");
	list[5] = new GUIContent("Testador");
    
    // Make a GUIStyle that has a solid white hover/onHover background to indicate highlighted items
    listStyle = new GUIStyle();
    listStyle.normal.textColor = Color.green;
    var tex = new Texture2D(2, 2);
    listStyle.hover.background = tex;
    listStyle.onHover.background = tex;
    listStyle.padding.left = listStyle.padding.right = listStyle.padding.top = listStyle.padding.bottom = 4;
}

function OnGUI () {
    if (Popup.List (Rect(220, 00, 120, 20), showList1, listEntry, GUIContent("1: "+ func1.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func1.SetPapel(novopapel);
    }
	if (Popup.List (Rect(340, 00, 120, 20), showList2, listEntry, GUIContent("2: "+ func2.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func2.SetPapel(novopapel);
    }
	if (Popup.List (Rect(460, 00, 120, 20), showList3, listEntry, GUIContent("3: "+ func3.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func3.SetPapel(novopapel);
    }
	if (Popup.List (Rect(580, 00, 120, 20), showList4, listEntry, GUIContent("4: "+ func4.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func4.SetPapel(novopapel);
    }
	if (Popup.List (Rect(700, 00, 120, 20), showList5, listEntry, GUIContent("5: "+ func5.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func5.SetPapel(novopapel);
    }
	if (Popup.List (Rect(820, 00, 120, 20), showList6, listEntry, GUIContent("6: "+ func6.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func6.SetPapel(novopapel);
    }
	if (Popup.List (Rect(940, 00, 120, 20), showList7, listEntry, GUIContent("7: "+ func7.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func7.SetPapel(novopapel);
    }
	if (Popup.List (Rect(1060, 00, 120, 20), showList8, listEntry, GUIContent("8: "+ func8.GetPapel()), list, listStyle)) {
		novopapel = TakePapel(listEntry);
		func8.SetPapel(novopapel);
    }
}
