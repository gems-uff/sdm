#pragma strict


class MyLinkedList extends MyNode
{
	public var first : MyNode;
	public var last : MyNode;

	function Add(t : MyNode)
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
}

class MyNode
{
	public var data;
	//For the linked List
	public var next : MyNode;
	public var before : MyNode;

	function Add(t : MyNode)
	{
		this.next = t;
		t.before = this;
	}
}
