

//Lists
var projectList : ProjectList;
var employeetList : EmployeeList;
var actionList : ActiontList;
//Nodes
var projectNode : ProjectNode;
var employeeNode : EmployeeNode;
var employeeNode2 : EmployeeNode;
var actionNode : ActionNode;
//Public
public var project : Project;
public var emp01 : Funcionario;
public var emp02 : Funcionario;

var employee01;
var employee02;

/*
public var employee03 : Funcionario;
public var employee04 : Funcionario;
public var employee05 : Funcionario;
public var employee06 : Funcionario;
public var employee07 : Funcionario;
public var employee08 : Funcionario;
*/
/*
public var node : MyNode;
public var list : MyLinkedList;
*/

function doLinkedListTest () {

	employee01 = emp01.Copy();
	employee02 = emp02.Copy();
	
	actionList = new ActiontList();
	actionNode = new ActionNode();
	
	employeeNode = new EmployeeNode();
	employeeNode2 = new EmployeeNode();
	
	employeeList = new EmployeeList();
	employeeList2 = new EmployeeList();
	/*
	employeeList3 = new EmployeetList();
	employeeList4 = new EmployeetList();
	employeeList5 = new EmployeetList();
	employeeList6 = new EmployeetList();
	employeeList7 = new EmployeetList();
	employeeList8 = new EmployeetList();
	*/
	projectList = new ProjectList();
	projectNode = new ProjectNode();
	
	//	
	projectNode.NewNode();
	employeeNode.NewNode();
	employeeNode2.NewNode();
	actionNode.NewNode();
	
	//Make action node
	actionNode.who = employee01;
	//Debug.Log("Action name: " + actionNode.who.GetNome());
	actionList.Add(actionNode);
	//Debug.Log("ActionList name: " + actionList.first.who.GetNome());
	
	//make employee node
	employeeNode.actionList = actionList;
	//Debug.Log("EmployeeNodeList name: " + employeeNode.actionList.first.who.GetNome());
	employeeNode.employee = employee01;//.Copy();
	employeeNode2.employee = employee02;//.Copy();
	
	employeeList.Add(employeeNode);
	employeeList2.Add(employeeNode2);
	
	//Debug.Log("EmployeeList name: " + employeeList.first.actionList.first.who.GetNome());
	//make project node
	projectNode.slot01 = employeeList;
	projectNode.slot02 = employeeList2;
	projectNode.project = project;
	
	projectList.Add(projectNode);
	
	var auxp = projectList.first;
	var auxproject : String = auxp.project.GetNome();
	var auxe = auxp.slot01.first.employee;
	var auxe2 = auxp.slot02.last.employee;
	var auxemployee : String = auxe.GetNome();
	var auxemployee2 : String = auxe2.GetNome();
	var auxa = auxp.slot01.first.actionList.first.who;
	var auxaction : String = auxa.GetNome();
	
	Debug.Log("Project name: " + auxproject);
	Debug.Log("Employee01 Fname: " + auxemployee);
	Debug.Log("Employee02 Lname: " + auxemployee2);
	Debug.Log("WhoAction: " + auxaction);
}

var doing : boolean = false;

function StartDoing()
{
	doing = true;
}
function Update () {

	if(doing)
	{
		var auxp = projectList.first;
		var auxproject : String = auxp.project.GetNome();
		var auxe = auxp.slot01.first.employee;
		var auxe2 = auxp.slot02.last.employee;
		var auxemployee : String = auxe.GetNome();
		var auxemployee2 : String = auxe2.GetNome();
		var auxa = auxp.slot01.first.actionList.first.who;
		var auxaction : String = auxa.GetNome();
		Debug.Log("Employee01 Fname: " + auxemployee);
		Debug.Log("Employee02 Lname: " + auxemployee2);
	}
	
}