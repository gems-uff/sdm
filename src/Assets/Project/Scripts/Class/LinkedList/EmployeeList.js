#pragma strict

class EmployeeList extends EmployeeNode
{
	public var first : EmployeeNode;
	public var last : EmployeeNode;
	
	function Add(t : EmployeeNode)
	{
		//if empty
		if(this.first == null)
		{
			this.first = t;
			this.last = t;
		}
		else
		{
			//Put it after the last one
			this.last.Add(t);
			//Update the last one
			this.last = t;
		}
	}
	
	function RemoveLast()
	{
		this.last.before = null;
		this.last = this.last.before;
	}
}

class EmployeeNode
{
	//Employee data
	public var employee : Funcionario;
	public var actionList : ActionList;
	
	//Employee List
	public var next : EmployeeNode;
	public var before : EmployeeNode;
	
	function Add(t : EmployeeNode)
	{
		this.next = t;
		t.before = this;
	}
	
	function NewNode()
	{
		this.employee = new Funcionario();
		this.actionList = new ActionList();
		this.next = new EmployeeNode();
		this.before = new EmployeeNode();
	}
}