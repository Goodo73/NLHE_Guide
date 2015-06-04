$(document).ready(function() {
    $(".desc").hide();
    $(".step").hide();
    $("h2").click(function() {
        var cssDisplay = $(this).next().css("display");
        if (cssDisplay === "block") {
            $(this).next().slideUp()
        } else {
            $(this).next().slideDown();
            $(this).next().siblings("section").slideUp()
        }
    });
    $("h3").click(function() {
        var cssDisplay = $(this).next().css("display");
        if (cssDisplay === "block") {
            $(this).next().slideUp()
        } else {
            $(this).next().slideDown();
            $(this).next().siblings("section").slideUp()
        }
    });
    var currentStep = 0;
    var demoHasRun = false;
    var potChip = '<div class="chip">100</div>';
    var instructions = [{
        text: "The sequence of play in a hand of NLHE is quite simple. This demo allows you to step your way through each part, forward and back, using the NEXT and PREV buttons. As you go, you'll see a description of what happens in the current step. By clicking the DEMO button, you'll also be able to see what happens on the table at that step."
    }, {
        text: "The player designated as the dealer is given the Dealer button. The two players sitting in the Small Blind and Big Blind positions put out their mandatory bets (ie. the blinds)."
    }, {
        text: "Each player now receives their two hole cards. These are dealt clockwise, one at a time, starting with the player in the Small Blind."
    }, {
        text: "Players look at their cards and decide what action they want to take. In turn, beginning with the player to the left of the Big Blind, each player performs one of the following: fold (at which point they're out of the hand), call (ie. match the size of the current bet) or increase the size of the bet with a raise. If any player makes a raise, other players may increase the bet further with a re-raise."
    }, {
        text: "The wagered chips are gathered together to form the pot. The first three community cards, called the flop, are dealt face-up in the middle of the table."
    }, {
        text: "Beginning with the player to the left of the Dealer, the remaining players perform one of the following actions: fold, make an initial bet, call, raise or re-raise. As long as no initial bet has been made, players may also check. That is, the player doesn't make a bet, but they remain in the hand."
    }, {
        text: "The newly wagered chips are added to the pot. The fourth community card, called the turn, is dealt face-up in the middle of the table."
    }, {
        text: "Beginning with the player to the left of the Dealer, the remaining players perform one of the following actions: fold, check, bet, call, raise or re-raise."
    }, {
        text: "The newly wagered chips are added to the pot. The fifth community card, called the river, is dealt face-up in the middle of the table."
    }, {
        text: "Beginning with the player to the left of the Dealer, the remaining players perform one of the following actions: fold, check, bet, call, raise or re-raise."
    }, {
        text: "The newly wagered chips are added to the pot. The players remaining in the hand turn their hole cards face up for comparison."
    }, {
        text: "The player with the best five-card hand is determined, and they are awarded the pot."
    }, {
        text: "The button moves one position to the left, and that player becomes the dealer. Similarly, the player who was in the Big Blind becomes the Small Blind, and the player to their immediate left becomes the Big Blind. They put out their bets, the cards are re-shuffled, and the next hand is ready to play."
    }];
    hideAllTableElements();
    $(".prev").toggleClass("dimmed");
    $(".demo").toggleClass("dimmed");
    $(".info").text(instructions[currentStep].text);
    $(".next").click(function() {
        if (demoHasRun === true) {
            demoHasRun = false;
            $(".demo").toggleClass("dimmed")
        } else if (currentStep === 0) {
            $(".prev").toggleClass("dimmed");
            $(".demo").toggleClass("dimmed")
        } else {
            modifyTable(currentStep, "fwd")
        }
        currentStep = currentStep + 1;
        $(".info").text(instructions[currentStep].text);
        if (currentStep === 12) {
            $(".next").toggleClass("dimmed")
        }
    });
    $(".prev").click(function() {
        if (demoHasRun === true) {
            demoHasRun = false;
            $(".demo").toggleClass("dimmed");
            modifyTable(currentStep, "rev")
        }
        if (currentStep === 12) {
            $(".next").toggleClass("dimmed")
        }
        currentStep = currentStep - 1;
        if (currentStep === 0) {
            $(".prev").toggleClass("dimmed");
            $(".demo").toggleClass("dimmed")
        } else {
            modifyTable(currentStep, "rev")
        }
        $(".info").text(instructions[currentStep].text)
    });
    $(".demo").click(function() {
        modifyTable(currentStep, "fwd");
        demoHasRun = true;
        $(".demo").toggleClass("dimmed")
    });

    function modifyTable(step, dir) {
        if (dir === "fwd") {
            switch (step) {
                case 1:
                    $("#dealer").show();
                    showBlinds();
                    break;
                case 2:
                    holeFaceDown();
                    showHole(dir);
                    break;
                case 3:
                    showPreFlopBets();
                    break;
                case 4:
                    hideAllBets();
                    $("#pot").show();
                    increasePot();
                    showFlop();
                    break;
                case 5:
                    showAllBets(dir);
                    break;
                case 6:
                    hideAllBets();
                    increasePot();
                    setTimeout(function() {
                        $(".turn").show()
                    }, 500);
                    break;
                case 7:
                    showAllBets(dir);
                    break;
                case 8:
                    hideAllBets();
                    increasePot();
                    setTimeout(function() {
                        $(".river").show()
                    }, 500);
                    break;
                case 9:
                    showAllBets(dir);
                    break;
                case 10:
                    hideAllBets();
                    holeFaceUp();
                    increasePot();
                    break;
                case 11:
                    $(".box4").addClass("win");
                    setTimeout(function() {
                        $("#pot").addClass("potWin")
                    }, 500);
                    break;
                case 12:
                    hideAllTableElements();
                    $("#dealer").addClass("moved");
                    $("#dealer").show();
                    $(".box4").removeClass("win");
                    setTimeout(function() {
                        $(".bet3 .chip").eq(0).show()
                    }, 400);
                    setTimeout(function() {
                        $(".bet4").show()
                    }, 800);
                    break;
                default:
                    alert("Unexpected step value (fwd)!")
            }
        } else {
            switch (step) {
                case 1:
                    $("#dealer").hide();
                    $(".bet2 .chip").eq(0).hide();
                    $(".bet3").children().hide();
                    break;
                case 2:
                    hideHole();
                    break;
                case 3:
                    $(".bet1").hide();
                    $(".bet2 .chip").eq(1).hide();
                    $(".bet4").hide();
                    break;
                case 4:
                    showAllBets(dir);
                    $(".flop").children().hide();
                    reducePot();
                    break;
                case 5:
                    hideAllBets();
                    break;
                case 6:
                    showAllBets(dir);
                    $(".turn").hide();
                    reducePot();
                    break;
                case 7:
                    hideAllBets();
                    break;
                case 8:
                    showAllBets(dir);
                    $(".river").hide();
                    reducePot();
                    break;
                case 9:
                    hideAllBets();
                    break;
                case 10:
                    showAllBets(dir);
                    holeFaceDown();
                    reducePot();
                    break;
                case 11:
                    $(".box4").removeClass("win");
                    $("#pot").removeClass("potWin");
                    break;
                case 12:
                    $(".bet3 .chip").eq(0).hide();
                    $(".bet4").hide();
                    $(".flop").children().show();
                    $(".turn").show();
                    $(".river").show();
                    showHole(dir);
                    $("#dealer").hide();
                    $("#dealer").removeClass("moved");
                    $("#dealer").show();
                    $("#pot").show();
                    $(".box4").addClass("win");
                    break;
                default:
                    alert("Unexpected step value (rev)!")
            }
        }
    }

    function hideAllTableElements() {
        hideAllBets();
        hideHole();
        $(".flop").children().hide();
        $(".turn").hide();
        $(".river").hide();
        $("#dealer").hide();
        $("#pot").hide()
    }

    function increasePot() {
        for (var i = 0; i < 4; i++) {
            $("#pot").append(potChip)
        }
    }

    function reducePot() {
        for (var i = 0; i < 4; i++) {
            $("#pot .chip").eq(-1).remove()
        }
    }

    function showBlinds() {
        setTimeout(function() {
            $(".bet2 .chip").eq(0).show()
        }, 400);
        setTimeout(function() {
            $(".bet3").children().show()
        }, 800)
    }

    function showPreFlopBets() {
        $(".bet4").show();
        setTimeout(function() {
            $(".bet1").show()
        }, 400);
        setTimeout(function() {
            $(".bet2 .chip").eq(1).show()
        }, 800)
    }

    function showFlop() {
        setTimeout(function() {
            $(".flop .card").eq(0).show()
        }, 400);
        setTimeout(function() {
            $(".flop .card").eq(1).show()
        }, 800);
        setTimeout(function() {
            $(".flop .card").eq(2).show()
        }, 1200)
    }

    function hideAllBets() {
        $(".bet1").hide();
        $(".bet2").children().hide();
        $(".bet3").children().hide();
        $(".bet4").hide()
    }

    function showAllBets(dir) {
        if (dir === "rev") {
            $(".bet2").children().show();
            $(".bet3").children().show();
            $(".bet4").show();
            $(".bet1").show()
        } else {
            $(".bet2").children().show();
            setTimeout(function() {
                $(".bet3").children().show()
            }, 400);
            setTimeout(function() {
                $(".bet4").show()
            }, 800);
            setTimeout(function() {
                $(".bet1").show()
            }, 1200)
        }
    }

    function hideHole() {
        $(".hole1").children().hide();
        $(".hole2").children().hide();
        $(".hole3").children().hide();
        $(".hole4").children().hide()
    }

    function showHole(dir) {
        if (dir === "rev") {
            $(".hole1").children().show();
            $(".hole2").children().show();
            $(".hole3").children().show();
            $(".hole4").children().show()
        } else {
            $(".hole2 .card").eq(0).show();
            setTimeout(function() {
                $(".hole3 .card").eq(0).show()
            }, 300);
            setTimeout(function() {
                $(".hole4 .card").eq(0).show()
            }, 600);
            setTimeout(function() {
                $(".hole1 .card").eq(0).show()
            }, 900);
            setTimeout(function() {
                $(".hole2 .card").eq(1).show()
            }, 1200);
            setTimeout(function() {
                $(".hole3 .card").eq(1).show()
            }, 1500);
            setTimeout(function() {
                $(".hole4 .card").eq(1).show()
            }, 1800);
            setTimeout(function() {
                $(".hole1 .card").eq(1).show()
            }, 2100)
        }
    }

    function holeFaceDown() {
        $(".hole1").children().addClass("demoBack");
        $(".hole2").children().addClass("demoBack");
        $(".hole3").children().addClass("demoBack");
        $(".hole4").children().addClass("demoBack")
    }

    function holeFaceUp() {
        $(".hole2").children().removeClass("demoBack");
        $(".hole2 .card").eq(0).text("J");
        $(".hole2 .card").eq(1).text("Q");
        setTimeout(function() {
            $(".hole3").children().removeClass("demoBack");
            $(".hole3 .card").eq(0).text("A");
            $(".hole3 .card").eq(1).text("K")
        }, 400);
        setTimeout(function() {
            $(".hole4").children().removeClass("demoBack");
            $(".hole4 .card").eq(0).text("K");
            $(".hole4 .card").eq(1).text("K")
        }, 800);
        setTimeout(function() {
            $(".hole1").children().removeClass("demoBack");
            $(".hole1 .card").eq(0).text("4");
            $(".hole1 .card").eq(1).text("4")
        }, 1200)
    }
});
