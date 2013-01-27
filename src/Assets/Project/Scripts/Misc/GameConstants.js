
//Working
public var JUNIOR_SALARY : float = 1.0;
public var PLENO_SALARY : float = 1.3;
public var SENIOR_SALARY : float = 1.5;
public var JUNIOR_MODIFICATOR : float = 1.0;
public var PLENO_MODIFICATOR : float = 1.2;
public var SENIOR_MODIFICATOR : float = 1.4;
public var MINPAYMENT : int = 2000;
public var PENALIDADE : float = 0.3;
public var BONUS : float = 0.25;
//Roles Constant modifiers
public var ANALYST_BEGINNING : float = 5;
public var ANALYST : float = 1.0;
public var ARCHITECT : float = 1.0;
public var MANAGER : float = 1.0;	// +40%
public var MARKETING : float = 1.0;
public var TESTER : float = 0.7;
public var PROGRAMMER : float = 1.0;
public var PROGRAMMER_REPAIR : float = 1.0;
public var PROG_LINES_DAY_MOD : float = 3.0;
public var PROG_BUG_MOD : float = 0.02;

//Morale
public var RECOVERYPENALY : float = 1.0; 
public var RECOVERYBONUS : float = 1.25;
public var TIREDMORALE : float = 20.0;
public var BADMORALE : float = 5.0;
public var DEMITCHANCE : float = 1.0;
public var MORALE_MOD : int = 6.0;

//Project
public var SIMPLE : int = 1500;		//50 * 3
public var REGULAR : int = 2100;	//70 * 3
public var COMPLEX : int = 4000;	//100 * 4
public var LOW : int = 1500;
public var NORMAL : int = 3000;
public var HIGH : int = 4500;

//Prototype
public var ARCHITECT_FACTOR : float = 0.001; 	//Multiplicador do bonus dos prototipos pelo arquiteto, no caso usa 10% do valor do arquiteto
public var SIMPLE_FACTOR : int = 1;			//Multiplicador do bonus dos prototipos pelo tipo de prototipo
public var REGULAR_FACTOR : int = 2;
public var COMPLEX_FACTOR : int = 3;

public var SIMPLE_PRICE : int = 6000;		//Custo para fazer cada prototipo
public var REGULAR_PRICE : int = 12000;
public var COMPLEX_PRICE : int = 24000;