

class ProjectStats
{
	public var name : String;					//Project Name
	public var description : String;			//Project Text info
	public var deadline : int;  				//in days
	public var linguagemProgramacao : String;	//Linguagem: Escolher apenas uma linguagem
	public var pagamento : int;					//How much each month
	public var requirements : float;			//Description size: Simple, Regular, Complex, Insane
	public var sincronismo : float;			//Description Quality: Not, default, high, highest
	public var codeQuality : float;				//Current Code Quality
	public var percentageDone : float; 			//GetFractionDone()
	//Bugs Found
	public var bugUnitaryFound : int;
	public var bugIntegrationFound : int;
	public var bugSystemFound : int;
	public var bugAcceptionFound : int;
	//Bugs corrected
	public var bugUnitaryRepaired : int;
	public var bugIntegrationRepaired : int;
	public var bugSystemRepaired : int;
	public var bugAcceptionRepaired : int;
	
	public var date : int;
	
	//For the linked List
	public var next : ProjectStats;
	public var previous : ProjectStats;
	
	function Add(t : ProjectStats)
	{
		this.next = t;
		t.previous = this;
	}

}

class ProjectStatsList
{
	public var first : ProjectStats;
	public var last : ProjectStats;
	
	function Add(t : ProjectStats)
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
	
	function ProjectStatsList()
	{
		this.first = null;
		this.last = null;
	}
}