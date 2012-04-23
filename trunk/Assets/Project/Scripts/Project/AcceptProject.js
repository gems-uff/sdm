
public var acceptedProject : Project;
public var style : StyleChoiceWindow;
private var projeto : Project;

function TakeProject(newProject : Project){
	acceptedProject.SetDeadline(newProject.GetDeadline());
	acceptedProject.SetProjectSize(newProject.GetProjectSize());
	acceptedProject.SetPagamento(newProject.GetPagamento());
	acceptedProject.SetBugValue(newProject.GetBugValue());
	acceptedProject.SetLinguagem(newProject.GetLinguagem());
	acceptedProject.SetStartDay(newProject.GetStartDay());
	//acceptedProject.ResetBugsTypes();
	style.ShowStyleChoiceWindow();
}