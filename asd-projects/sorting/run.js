// flag to prevent running simultaneous sorts by clicking 
// "start" multiple times
let STARTED = false;

$(document).ready(function(){
    $("#goButton").on("click", function(){
        const input = $(".numberInput");
        if (!STARTED && input.val() >= 25){
            MAX_SQUARES = input.val();
            STARTED = true;
            $("#fullContainer").css("filter", "none");
            $(".popup").css({
                "opacity": 0,
                "z-index": -1,
            });
            startSort();

            if (bubbleSort){
                bubbleSort(bubbleList);
            }
            if (quickSort){
                quickSort(quickList, 0, quickList.length-1);
            }
        }
        else if(!STARTED && input.val() < 25){
            $(".popupText").text("We recommend you select a number higher than 25.");
        }
    })
})
