
public var acceptedProject : Project;
public var style : StyleChoiceWindow;
//private var projeto : Project;
public var log : HistoryLog;

function TakeProject(newProject : Project){
	acceptedProject.SetDeadline(newProject.GetDeadline());
	acceptedProject.SetProjectSize(newProject.GetProjectSize());
	acceptedProject.SetPagamento(newProject.GetPagamento());
	acceptedProject.SetBugValue(newProject.GetBugValue());
	acceptedProject.SetLinguagem(newProject.GetLinguagem());
	acceptedProject.SetStartDay(newProject.GetStartDay());
	//acceptedProject.ResetBugsTypes();
	
	//Create a new project node
	log.NewProjectNode();
	
	//Allow the player to change the play style
	//style.ShowStyleChoiceWindow();
}