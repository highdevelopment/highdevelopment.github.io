<?php
// session_destroy(); 
// exit();
    session_start();
    
    ini_set("display_errors", 0);

    // if(isset($_SESSION["iMoney"]))
    // {
        
        // _initSettings();
        // session_destroy();

        _initSettings();
    // }
        
    function _initSettings(){
        $_SESSION["iMoney"] = 10000;          //USER MONEY
        $_SESSION["iSlotCash"] = 200;       //SLOT CASH. IF USER BET IS HIGHER THAN CASH, USER MUST LOOSE.
        $_SESSION["win_occurrence"] = 40;   //WIN OCCURRENCE(FROM 0 TO 100)
        $_SESSION["bonus_occurrence"] = 20;//IF USER MUST WIN, SET THIS VALUE FOR BONUS OCCURRENCE
        
        $_SESSION["bonus_prize"][0] = [5,50,200]; //THIS IS THE LIST OF BONUS PRIZES IF 3 BONUS SYMBOLS ARE IN THE WHEEL.
        $_SESSION["bonus_prize"][1] = [50,200,500]; //THIS IS THE LIST OF BONUS PRIZES IF 4 BONUS SYMBOLS ARE IN THE WHEEL.
        $_SESSION["bonus_prize"][2] = [100,500,1000]; //THIS IS THE LIST OF BONUS PRIZES IF 5 BONUS SYMBOLS ARE IN THE WHEEL.
        $_SESSION["bonus_prize_occur"] = [ 50, 35, 15]; //OCCURRENCE FOR EACH PRIZE IN BONUS_PRIZES. HIGHER IS THE NUMBER, MORE POSSIBILITY OF OUTPUTHAS THE PRIZE.
        $_SESSION["coin_bet"] = [0.05, 0.1,0.15,0.20,0.25,0.3,0.35,0.4,0.45,0.5]; //THIS IS THE LIST OF COIN BETS.

        $_SESSION["wild_symbol"] = 10;
        $_SESSION["bonus_symbol"] = 9;
        
        _initSymbolsOccurence();
        _initPaylines();
        _initSymbolWin();
        
        $_SESSION["bBonus"] = 0;
    }
    

    $NUM_ROWS = 3;
    $NUM_REELS = 5;

    if (!isset($_REQUEST["a"])){
        _dieError("action not set"); // action not set
    }else{
        $user_action = $_REQUEST["a"];
    }

    switch($user_action){
            case "check_login":{
                    //STARTING MONEY
                    _initSettings();
                    _setMinWin();
                    _tryToCheckLogin();
            }break;			
            case "spin":{
                    // _initSettings();
                    // _setMinWin();

                if (!isset($_POST["bet"])){
                        _dieError(3,"bet not set"); //bet not set
                }else{
                        $iCurBet = $_POST["bet"];
                }

                if (!isset($_POST["total_bet"])){
                        _dieError(4,"total bet not set"); // total bet not set
                }else{
                        $iTotBet = $_POST["total_bet"];
                }

                if (!isset($_POST["lines"])){
                        _dieError(5,"lines not set"); // lines not set
                }else{
                        $iNumBettingLines = $_POST["lines"];
                }

                if (!isset($_POST["hold"])){
                        _dieError(6,"hold not set"); // hold not set
                }else{
                        $aHold = $_POST["hold"];
                }
                _onSpin($iNumBettingLines,$iCurBet,$iTotBet,$aHold);
                break;
            }
    }

    function _tryToCheckLogin(){
        //THIS FUNCTION PASS USER MONEY AND BONUS PRIZES
        $aTmp = array();
        for($i=0;$i< count($_SESSION["symbolwin"]);$i++){
            $aTmp[$i] = implode(",",$_SESSION["symbolwin"][$i]);
        }
        
        print "res=true&login=true&money=".$_SESSION["iMoney"]."&bonus_prize1=".implode("#",$_SESSION["bonus_prize"][0])."&bonus_prize2=".implode("#",$_SESSION["bonus_prize"][1])
                                                                ."&bonus_prize3=".implode("#",$_SESSION["bonus_prize"][2])."&paytable=".
                                                                implode("#",$aTmp)."&coin_bet=".implode("#",$_SESSION["coin_bet"]);
    }
    
    function _setMinWin(){
        //FIND MIN WIN
        $_SESSION["min_win"] = $_SESSION["symbolwin"][0][count($_SESSION["symbolwin"][0])-1];
        for($i=0;$i<count($_SESSION["symbolwin"]);$i++){
            $aTmp = $_SESSION["symbolwin"][$i];
            for($j=0;$j<count($aTmp);$j++){
                if($aTmp[$j] !== 0 && $aTmp[$j] < $_SESSION["min_win"]){
                    $_SESSION["min_win"] = $aTmp[$j];
                }
            }
        }
    }

    function _onSpin($iNumBettingLines,$iCurBet,$iTotBet,$aHold){
            
            if( _checkSpinCoherence($iNumBettingLines,$iCurBet,$iTotBet,$aHold) == false){
                    exit();
            }
            
            //DECREASING USER MONEY WITH THE CURRENT BET
            $_SESSION["iMoney"] = $_SESSION["iMoney"] - $iTotBet;
            $_SESSION["iSlotCash"] = $_SESSION["iSlotCash"] + $iTotBet;

            $bBonus = 0;

            $iRandOccur = rand(0,100);
            if($iRandOccur < $_SESSION["win_occurrence"]){
                    //WIN
                    if($_SESSION["bBonus"] == 0){
                            $iRand = rand(0,100);

                            if( $iRand < $_SESSION["bonus_occurrence"]){
                                    //PLAYER GET BONUS
                                    $iRand = rand(1,$_SESSION["bonus_occurrence"]);
                                    if($iRand <= $_SESSION["bonus_occurrence"]){
                                            $bBonus = 1;
                                    }

                            }
                    }

                    do{
                        $iNumBonusSymbol = generateRandomSymbols($aHold,$bBonus);
                        $aRet = checkWin($bBonus);
                        $iTotWin = 0;
                        for($i=0;$i<count($aRet);$i++){
                                $iTotWin = $iTotWin + $aRet[$i]['amount'];
                        }
                        $iTotWin *= $iCurBet;
                    }while(count($aRet) == 0 || $iTotWin > $_SESSION["iSlotCash"]);

                    
                    
                    $_SESSION["iMoney"] = $_SESSION["iMoney"] + $iTotWin; 
                    $_SESSION["iSlotCash"] = $_SESSION["iSlotCash"] - $iTotWin;

                    $iPrizeReceived = -1;
                    if($bBonus == 1){
                            $_SESSION["bBonus"] = 1;

                            $aPrizeLength = array();
                            for($k=0; $k<count($_SESSION["bonus_prize_occur"]); $k++){
                                    $iCount = $_SESSION["bonus_prize_occur"][$k];
                                    for($j=0;$j<$iCount;$j++){
                                            array_push($aPrizeLength, $k);
                                    }
                            }

                            $iRandIndex = rand(0,count($aPrizeLength)-1);
                            $iPrizeReceived = $aPrizeLength[$iRandIndex];
                    }
                    
                    print("res=true&win=true&pattern=".json_encode($_SESSION['aFinalSymbols'])."&win_lines=".json_encode($aRet)."&money=".$_SESSION["iMoney"].
                            "&tot_win=".$iTotWin."&bonus=".$_SESSION["bBonus"]."&bonus_items=".$iNumBonusSymbol."&bonus_prize=".$iPrizeReceived."&cash=".$_SESSION["iSlotCash"] );
                    
                    if($iPrizeReceived !== -1){
                        $_SESSION["iMoney"] = $_SESSION["iMoney"] + $_SESSION["bonus_prize"][$iNumBonusSymbol-3][$iPrizeReceived];
                        $_SESSION["iSlotCash"] = $_SESSION["iSlotCash"] - $_SESSION["bonus_prize"][$iNumBonusSymbol-3][$iPrizeReceived];
                    }
                    
            }else{
                    //LOSE
                    generateLosingPattern($aHold);
                    print("res=true&win=false&pattern=".json_encode($_SESSION['aFinalSymbols'])."&money=".$_SESSION["iMoney"]."&bonus=false&bonus_prize=-1");
            }
    }
    
    function _checkSpinCoherence($iNumBettingLines,$iCurBet,$iTotBet,$aHold){
      
		$bCheckPassed = true;
                
		//CHECK IF NUM LINES IS CORRECT
		if($iNumBettingLines <1 || $iNumBettingLines > count($_SESSION["paylines"])){
			$bCheckPassed = false;
		}
		
		//CHECK CURRENT BET
		if($iCurBet < $_SESSION["coin_bet"][0] || $iCurBet > $_SESSION["coin_bet"][count($_SESSION["coin_bet"])-1]){
			$bCheckPassed = false;
		}
		
		//CHECK IF $iTotBet IS >= OF iMoney OR die("res=false");
		if($iTotBet > $_SESSION['iMoney']){
			_dieError(6,"NOT ENOUGH MONEY: ".$_SESSION['iMoney']);
		}
                
                //IF SLOT CASH IS LOWER THAN MINIMUM WIN, PLAYER MUST LOSE
                if($_SESSION["iSlotCash"] < $_SESSION["min_win"]){
                    $bCheckPassed = false;
                }
		
		//CHECK BET COHERENCE. MUST BE $iTotBet/$iNumBettingLines == $iCurBet
		$iCheck = $iTotBet / $iNumBettingLines;
		if($iCheck != $iCurBet){
			$bCheckPassed = false;
		}
		
		//CHECK HOLD COLUMNS
		$iCont = 0;
		for($i=0;$i<count($aHold);$i++){
			if($aHold[$i] == 'true'){
				$iCont++;
			}
		}
		
		if($iCont > 3){
			_dieError(10,"NUMBER OF HOLD COLUMNS NOT CORRECT!!");
		}

		return $bCheckPassed;
	}
        
        
	
    function _initPaylines(){
        //STORE ALL INFO ABOUT PAYLINE COMBOS
        $_SESSION["paylines"] = array();
        $_SESSION["paylines"][0] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][1] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][2] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][3] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][4] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][5] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>1,'col'=>2),array('row'=>0,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][6] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>1,'col'=>2),array('row'=>2,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][7] = array( array('row'=>1,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][8] = array( array('row'=>1,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][9] = array( array('row'=>1,'col'=>0),array('row'=>0,'col'=>1),array('row'=>1,'col'=>2),array('row'=>0,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][10] = array( array('row'=>1,'col'=>0),array('row'=>2,'col'=>1),array('row'=>1,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][11] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][12] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][13] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][14] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][15] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][16] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][17] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][18] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][19] = array( array('row'=>0,'col'=>0),array('row'=>2,'col'=>1),array('row'=>0,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][20] = array( array('row'=>2,'col'=>0),array('row'=>0,'col'=>1),array('row'=>2,'col'=>2),array('row'=>0,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][21] = array( array('row'=>0,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][22] = array( array('row'=>2,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][23] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>2,'col'=>2),array('row'=>0,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][24] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>0,'col'=>2),array('row'=>2,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][25] = array( array('row'=>0,'col'=>0),array('row'=>2,'col'=>1),array('row'=>1,'col'=>2),array('row'=>0,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][26] = array( array('row'=>2,'col'=>0),array('row'=>0,'col'=>1),array('row'=>1,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][27] = array( array('row'=>1,'col'=>0),array('row'=>0,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][28] = array( array('row'=>0,'col'=>0),array('row'=>2,'col'=>1),array('row'=>1,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][29] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][30] = array( array('row'=>1,'col'=>0),array('row'=>2,'col'=>1),array('row'=>0,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][31] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][32] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][33] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][34] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][35] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][36] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][37] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][38] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][39] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][40] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][41] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>1,'col'=>2),array('row'=>2,'col'=>3),array('row'=>1,'col'=>4));
        $_SESSION["paylines"][42] = array( array('row'=>2,'col'=>0),array('row'=>2,'col'=>1),array('row'=>1,'col'=>2),array('row'=>0,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][43] = array( array('row'=>1,'col'=>0),array('row'=>2,'col'=>1),array('row'=>2,'col'=>2),array('row'=>2,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][44] = array( array('row'=>1,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>0,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][45] = array( array('row'=>0,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][46] = array( array('row'=>2,'col'=>0),array('row'=>1,'col'=>1),array('row'=>1,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][47] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>0,'col'=>4));
        $_SESSION["paylines"][48] = array( array('row'=>1,'col'=>0),array('row'=>1,'col'=>1),array('row'=>2,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
        $_SESSION["paylines"][49] = array( array('row'=>0,'col'=>0),array('row'=>0,'col'=>1),array('row'=>0,'col'=>2),array('row'=>1,'col'=>3),array('row'=>2,'col'=>4));
    };
	
    function _initSymbolsOccurence(){
        //THIS FUNCTION CONTAINS SYMBOL OCCURRENCE 
        //IF YOU WANT TO CHANGE OCCURRENCE, EDIT NUMBER INSIDE FOR LOOP FOR EACH SYMBOL
        //FOR EXAMPLE, IF YOU WANT TO INCREASE CHERRY OCCURRENCE, INCREASE NUMER 5 IN FOR LOOP
        //WILD SYMBOL IS A JOLLY THAT MATCHES WITH EVERY OTHER SYMBOL. INCREASING THIS SYMBOL OCCURRENCE, YOU INCREASE BIG WIN OCCURRENCE.
        
        $_SESSION["rand_symbols"] = array();
        //OCCURENCE FOR SYMBOL 1
        for($i=0;$i<5;$i++){
            array_push($_SESSION["rand_symbols"],1);
        }
        
        //OCCURENCE FOR SYMBOL 2
        for($i=0;$i<4;$i++){
            array_push($_SESSION["rand_symbols"],2);
        }
        
        //OCCURENCE FOR SYMBOL 3
        for($i=0;$i<4;$i++){
            array_push($_SESSION["rand_symbols"],3);
        }
        
        //OCCURENCE FOR SYMBOL 4
        for($i=0;$i<5;$i++){
            array_push($_SESSION["rand_symbols"],4);
        }
        
        //OCCURENCE FOR SYMBOL 5
        for($i=0;$i<4;$i++){
            array_push($_SESSION["rand_symbols"],5);
        }
        
        //OCCURENCE FOR SYMBOL 6
        for($i=0;$i<4;$i++){
            array_push($_SESSION["rand_symbols"],6);
        }
        
        //OCCURENCE FOR SYMBOL 7
        for($i=0;$i<4;$i++){
            array_push($_SESSION["rand_symbols"],7);
        }
        
        //OCCURENCE FOR SYMBOL 8
        for($i=0;$i<1;$i++){
            array_push($_SESSION["rand_symbols"],8);
        }
        
        //OCCURENCE FOR SYMBOL 9
        for($i=0;$i<1;$i++){
            array_push($_SESSION["rand_symbols"],9);
        }
        
        //OCCURENCE FOR SYMBOL 10
        for($i=0;$i<1;$i++){
            array_push($_SESSION["rand_symbols"],10);
        }
    }
	
    //THIS FUNCTION INIT WIN FOR EACH SYMBOL COMBO
    //EXAMPLE: $_SESSION["symbolwin"][0] = array(0,0,90,150,200) MEANS THAT
    //SYMBOL 1 GIVES THE FOLLOWING MULTIPLIER FOR:
    //COMBO 1 : x0
    //COMBO 2 : x0
    //COMBO 3 : x90
    //COMBO 4 : x150
    //COMBO 5 : x200
    function _initSymbolWin(){
        
        $_SESSION["symbolwin"] = array();
        $_SESSION["symbolwin"][0] = array(0,0,90,150,200);
        $_SESSION["symbolwin"][1] = array(0,0,80,110,160);
        $_SESSION["symbolwin"][2] = array(0,0,70,100,150);
        $_SESSION["symbolwin"][3] = array(0,10,50,80,110);
        $_SESSION["symbolwin"][4] = array(0,20,40,60,80);
        $_SESSION["symbolwin"][5] = array(0,10,30,50,70);
        $_SESSION["symbolwin"][6] = array(0,12,20,30,50);
        $_SESSION["symbolwin"][7] = array(0,5,10,20,40);
        $_SESSION["symbolwin"][8] = array(0,0,0,0,0,50);
    };
    
    function generateLosingPattern($aHold){
		global $NUM_ROWS,$NUM_REELS;
                
		$aFirstCol = array();
                for($i=0;$i<$NUM_ROWS;$i++){
			do{
				$iRandIndex = rand(0,(count($_SESSION["rand_symbols"])-2)); 
				$iRandSymbol = $_SESSION["rand_symbols"][$iRandIndex];
				
			}while($iRandSymbol == $_SESSION["wild_symbol"] || $iRandSymbol == $_SESSION["bonus_symbol"]);
			$aFirstCol[$i] = $iRandSymbol; 
                }
		
                if($_SESSION['aFinalSymbols'] !== "undefined"){
                    $aTmpWheel = $_SESSION['aFinalSymbols'];
                }
		
                
                $_aFinalSymbols = array();
                for($i=0;$i<$NUM_ROWS;$i++){
                    $_aFinalSymbols[$i] = array();
                    for($j=0;$j<$NUM_REELS;$j++){
                        if($aHold[$j] == 'false'){
                                if($j == 0){
                                        $_aFinalSymbols[$i][$j] = $aFirstCol[$i];
                                }else{
                                        do{
                                                $iRandIndex = rand(0,count($_SESSION["rand_symbols"])-2); 
                                                $iRandSymbol = $_SESSION["rand_symbols"][$iRandIndex];
                                        }while($aFirstCol[0] === $iRandSymbol || $aFirstCol[1] === $iRandSymbol || $aFirstCol[2] === $iRandSymbol ||
                                                                                        $iRandSymbol == $_SESSION["wild_symbol"] || $iRandSymbol == $_SESSION["bonus_symbol"]);
                                        $_aFinalSymbols[$i][$j] = $iRandSymbol;

                                } 
                        }else{
                                $_aFinalSymbols[$i][$j] = $aTmpWheel[$i][$j];
                        }

                    }
                }
		
		$_SESSION['aFinalSymbols'] = $_aFinalSymbols;
    }
	
	
    function generateRandomSymbols($aHold,$bBonus){
        global $NUM_ROWS,$NUM_REELS;
        
        $aTmpWheel = $_SESSION['aFinalSymbols'];
        
        $_aFinalSymbols = array();
        for($i=0;$i<$NUM_ROWS;$i++){
            $_aFinalSymbols[$i] = array();
            for($j=0;$j<$NUM_REELS;$j++){
                if($aHold[$j] == 'false'){
                    do{
                        $iRandIndex = rand(0,count($_SESSION["rand_symbols"]) - 1); 
                        $iRandSymbol = $_SESSION["rand_symbols"][$iRandIndex];
                        $_aFinalSymbols[$i][$j] = $iRandSymbol;
                    }while($iRandSymbol == $_SESSION["bonus_symbol"] || $iRandSymbol == $_SESSION["wild_symbol"]);
                }else{
                    $_aFinalSymbols[$i][$j] = $aTmpWheel[$i][$j];
                }
            }
        }
        
        $iNumBonusSymbol = 0;
        if($bBonus == 1){
            //DECIDE WHERE BONUS SYMBOL MUST APPEAR.          
            $aCurReel = array(0,1,2,3,4);
            shuffle ( $aCurReel );
            
            $iNumBonusSymbol = rand(3,5);
            for($k=0;$k<$iNumBonusSymbol;$k++){
                $iRandRow = rand(0,2); 
                $_aFinalSymbols[$iRandRow][$aCurReel[$k]] = $_SESSION["bonus_symbol"];
            }
        }
        
        $_SESSION['aFinalSymbols'] = $_aFinalSymbols;
        
        return $iNumBonusSymbol;
    }
	
    function checkWin($bBonus){
        global $iNumBettingLines ,$NUM_ROWS,$NUM_REELS;
        //CHECK IF THERE IS ANY COMBO
        $_aWinningLine = array();
        $_aFinalSymbols = $_SESSION['aFinalSymbols'];
        for($k=0;$k<$iNumBettingLines;$k++){
            $aCombos = $_SESSION["paylines"][$k];

            $aCellList = array();
            $iValue = $_aFinalSymbols[$aCombos[0]['row']][$aCombos[0]['col']];

            $iNumEqualSymbol = 1;
            $iStartIndex = 1;
            array_push($aCellList, array( 'row' => $aCombos[0]['row'], 'col' => $aCombos[0]['col'], 'value' => $_aFinalSymbols[$aCombos[0]['row']][$aCombos[0]['col']] ));

            while($iValue == $_SESSION["wild_symbol"] && $iStartIndex<$NUM_REELS){
                $iNumEqualSymbol++;
                $iValue = $_aFinalSymbols[$aCombos[$iStartIndex]['row']][$aCombos[$iStartIndex]['col']];
				array_push($aCellList,array('row'=>$aCombos[$iStartIndex]['row'],'col'=>$aCombos[$iStartIndex]['col'],
								'value'=>$_aFinalSymbols[$aCombos[$iStartIndex]['row']][$aCombos[$iStartIndex]['col']]));

                $iStartIndex++;
            }
            
            for($t=$iStartIndex;$t<count($aCombos);$t++){
                if($_aFinalSymbols[$aCombos[$t]['row']][$aCombos[$t]['col']] == $iValue || 
                                            $_aFinalSymbols[$aCombos[$t]['row']][$aCombos[$t]['col']] == $_SESSION["wild_symbol"]){
                    $iNumEqualSymbol++;
                    
                    array_push($aCellList,array('row'=>$aCombos[$t]['row'],'col'=>$aCombos[$t]['col'],'value'=>$_aFinalSymbols[$aCombos[$t]['row']][$aCombos[$t]['col']]) );   
                }else{
                    break;
                }
            }
            
            if($_SESSION["symbolwin"][$iValue-1][$iNumEqualSymbol-1] > 0){
                array_push($_aWinningLine,array('line'=>$k+1,'amount'=>$_SESSION["symbolwin"][$iValue-1][$iNumEqualSymbol-1],
                                                            'num_win'=>$iNumEqualSymbol,'value'=>$iValue,'list'=>$aCellList));
            }
        }
        
        if($bBonus === 1){
            $aCellList = array();
            for($i=0;$i<$NUM_ROWS;$i++){
                for($j=0;$j<$NUM_REELS;$j++){
                    if($_aFinalSymbols[$i][$j] == $_SESSION["bonus_symbol"]){
                        array_push($aCellList,array('row'=>$i,'col'=>$j,'value'=>9));
                    }
                }
            }

            array_push($_aWinningLine,array('line'=>0,'amount'=>0,'num_win'=>count($aCellList),'value'=>9,'list'=>$aCellList));
		}
        
        
        return $_aWinningLine;
    }

    function _dieError( $iId,$szReason){
        die("res=false&desc=".$szReason);
    }
    // session_destroy();	
?>