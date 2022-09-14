new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [] 
  },
  methods: {
    // startGameFunc() : this function initialize the Game
    startGameFunc: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      // reset the value of turns array to empty
      this.turns = [] ;
    },
    // attackFunc() : this function is executed when click on "attack" button
    attackFunc: function () {
      // You damage the Monster :  "damage" will be random value between [ 3 : 10 ] then I will use "random" , "floor" function
      var damageVar = this.calculateDamage(3, 10) ;
      this.monsterHealth -= damageVar ;
      // You Hits Monster 
      this.turns.push({
        isPlayer: true ,
        text: "Player hits Monster for " + damageVar 
      });
      // check if we should continue in function execution or not
      if (this.checkWin() == true) {
        // attackFunc مرة اخري لان اللعبة انتهت فهتخرج من الدالة damage يعني في حالة انك كسبت فبالتالي مش محتاج انك تعمل
        return;
      }
      // The Monster damage You  :  "damage" will be random value between [ 5 : 12 ] then I will use "random" , "floor" function
      this.monsterAttack();
    },
    // calculateDamage function
    calculateDamage: function (minAttack, maxAttack) {
      //  "damage" will be random value between [ 5 : 12 ] or [ 3 , 10 ] then I will use "random" , "floor" function
      return Math.max(Math.floor(Math.random() * maxAttack) + 1, minAttack);
    },
    // calculateDamage function
    checkWin: function () {
      // +++++++++++ check if "You"  "Win" +++++++++++
      if (this.monsterHealth <= 0) {
        if (confirm("You Won ! New Game ?") == true) {
          // will restart game with reset all values [ gameIsRunning , playerHealth ,  monsterHealth ]
          this.startGameFunc();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      // check if "You" "Lost"
      else if (this.playerHealth <= 0) {
        if (confirm("You Lost ! New Game ?") == true) {
          // will restart game with reset all values [ gameIsRunning , playerHealth ,  monsterHealth ]
          this.startGameFunc();
        } else {
          this.gameIsRunning = false;
        }
        return false;
      }
    },
    // specialAttack() : this function is executed when click on "specialAttack" button
    specialAttack: function () {
      // هتظل كما هي You في حالة  damage هتكون اكبر ولكن التاثير بتاع ال monster علي ال damage في هذه الدالة هيكون تاثير ال
      // You damage the Monster :  "damage" will be random value between [ 3 : 10 ] then I will use "random" , "floor" function
      var damageMonstVar = this.calculateDamage(10, 20);
      this.monsterHealth -= damageMonstVar
       // You Hits Monster 
       this.turns.push({
        isPlayer: true ,
        text: "Player hits Monster Hard for " + damageMonstVar
     });

      // check if we should continue in function execution or not
      if (this.checkWin() == true) {
        // attackFunc مرة اخري لان اللعبة انتهت فهتخرج من الدالة damage يعني في حالة انك كسبت فبالتالي مش محتاج انك تعمل
        return;
      }
      this.monsterAttack(); 
    },
    monsterAttack: function () {
        // The Monster damage You  :  "damage" will be random value between [ 5 : 12 ] then I will use "random" , "floor" function
        var damageVar = this.calculateDamage(5, 12);
        this.playerHealth -= damageVar ;
        // You Hits Monster 
        this.turns.push({
            // because the Monster hit or damage the Player or "You" then isPlayer = false
            isPlayer: false ,
            text: "Monster hits Player for " + damageVar 
        });
        // check if "You" won or lose
        this.checkWin();
    },
    // healFunc() : this function is executed when click on "healFunc" button
    healFunc: function () {
        //  بتاع الشخص فهزوده في حالة اني اقل من او يساوي 90 في المائة وهيزداد بمقدار 10 في المائة health في حالة اني عايز ازود ال 
        if( this.playerHealth <= 90 )
        {
            this.playerHealth += 10 ;
        }
        //  اكبر من 90 فكده هيكون اكبر من 100 فهخليه 100 health وكان ال health في حالة اني عايز ازود ال
        else{
            this.playerHealth = 100 ;
        }
        // Player heals 
        this.turns.push({
            isPlayer: true ,
            text: "Player Heals for 10 "
        });
        // عليك attack مستمر في عمل  monster بتاعك فال health اثناء ما انته بتزود ال
        this.monsterAttack(); 
    },
    // giveUpFunc() : this function is executed when click on "giveUpFunc" button
    giveUpFunc: function () {
        //في حالة الاستسلام هيتم انهاء اللعبة 
        this.gameIsRunning = false ;
    },
  },
});
