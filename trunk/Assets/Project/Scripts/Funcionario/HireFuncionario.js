
private var func : Funcionario;


//--------------------------------------------Add Funcionario Gerado Na Posicao De Outro Funcionario-----------------------------------------------------------
//Esta funcao serve para "copiar" o funcionario contratado para o slot indicado
function ContratarFuncionario(contratado : Funcionario, Func_Slot : Funcionario){
	func = contratado;
	Func_Slot.SetPapel("None");
	Func_Slot.SetMorale(100);
	Func_Slot.SetAtributos(func.GetAtributos());
	Func_Slot.SetWorkingHours(40);
	Func_Slot.SetEspecializacoes(func.GetEspecializacao());
	Func_Slot.SetNome(func.GetNome());
	Func_Slot.GetComponentInChildren(MeshRenderer).enabled = true;
}
