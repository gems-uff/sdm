
class InfluenceNode
{
	public var next : InfluenceNode;
	public var previous : InfluenceNode;
	public var action : ActionNode;

	function Add(t : InfluenceNode)
	{
		this.next = t;
		t.previous = this;
	}
	/*
	function Copy()
	{
		return new InfluenceNode(action, next, previous);
	}
	
	function InfluenceNode(action : ActionNode, next : InfluenceNode, previous : InfluenceNode)
	{
		this.action = action;
		this.next = next;
		this.previous = previous;
	}
	function InfluenceNode(action : ActionNode)
	{
		this.action = action;
		this.next = null;
		this.previous = null;
	}
	*/
	function InfluenceNode()
	{
		this.action = null;
		this.next = null;
		this.previous = null;
	}
}

class InfluenceList
{
	public var first : InfluenceNode;
	public var last : InfluenceNode;
	
	function Add(t : ActionNode)
	{
		//if empty
		if(t != null)
		{
			var node : InfluenceNode = new InfluenceNode();
			node.action = t;
			if(this.first == null)
			{
				this.first = node;
				this.last = node;
				/*
				if(this.first.action.who == "")
				{
					this.first = node;
					this.last = node;
				}
				
				else
				{
					this.last.Add(node);
					this.last = node;
				}
				*/
			}
			else
			{
			/*
				//Put it after the last one
				this.last.Add(node);
				//Update the last one
				this.last = node;
			*/
				if(this.first.action.who == "")
				{
					this.first = node;
					this.last = node;
				}
				
				else
				{
					this.last.Add(node);
					this.last = node;
					//this.mid = this.first.next;
				}
			}
		}
	}
	
	function RemoveFirst()
	{
		this.first = this.first.next;
		//this.mid = this.mid.next;
		/*
		if(this.first.next != null)
		{
			this.first.next.previous = null;
		}
		*/
	}
	
	function GetFirst()
	{
		if(this.first != null)
			return this.first;
		else
			return null;
	}
	function GetLast()
	{
		if(this.last != null)
			return this.last;
		else
			return null;
	}
	/*
	function ConsumeFirst()
	{
		var tempNode : ActionNode = this.first.action;
		this.first = this.first.next;
		return tempNode;
	}
	*/
	/*
	function Clone()
	{
		var list : InfluenceList = new InfluenceList();
		if(this.NotEmpty())
		{
			Debug.Log("Not Empty");
			var currentNode : InfluenceNode = this.first;
			list.Add(new InfluenceNode(currentNode.action));
			Debug.Log("Current action = " + currentNode.action.who);
			Debug.Log("List = " + list.first.action.who);

			while(currentNode.next != null)
			{
				currentNode = currentNode.next;
				list.Add(new InfluenceNode(currentNode.action));
			}
			
		}
		else
			Debug.Log("Empty");
		return list;
	}
	*/
	
	function InfluenceList()
	{
		this.first = null;
		this.last = null;
	}
	
	function NotEmpty()
	{
		if(this.first == null || this.first.action.who == "")
			return false;
		else
			return true;
	}
	
}