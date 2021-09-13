var dot = 0;
var current_unique_id = "";

setInterval(function typingDots(){
    var dots_container = document.getElementById("dots-container");

    if(dot != 3){
        dots_container.innerHTML = dots_container.innerHTML + ".";
        dot++;
    }
    else{
        dot = 0;
        dots_container.innerHTML = "";
    }
}, 500);

function scrollToBottom() {
    var messages = document.getElementById("response-container");
    messages.scrollTop = messages.scrollHeight;
}

function customMessage(message){
    var custom_message_container = document.getElementById(current_unique_id);

    custom_message_container.innerHTML = message;
}

function sendMessage(){
    if (event.keyCode === 13) {
        event.preventDefault();

        if($("#question").val().trim().length != 0){

            var bot_typing_display = document.getElementById("bot-typing-display");

            //Get user's input
            var user_input = $("#question").val();

            //Generate unique id
            const d = new Date();
            const unique_id =  "bot" + d.getTime();
            current_unique_id = unique_id;


            console.log(user_input)

            //Append user input
            $("#response").append(
                    '<div class="human-message-flex">' +
                        '<div class="human-message">' +
                            '<div class="human-message-display">' +
                                user_input +
                            '</div>' +
                        '</div>' +
                    '</div>'
            );

            //Display bot typing
            bot_typing_display.style.display = "";

            //Scroll to bottom
            scrollToBottom();

            //Clear the input box
            $("#question").val("");

            $.ajax({
                type: "POST",
                url: "/chatbot",
                data: {
                    question: user_input
                },
                success: function(result) {
                    //Remove bot typing
                    bot_typing_display.style.display = "none";

                    $("#response").append(
                        '<div class="bot-message-flex">' +
                            '<div class="bot-message">' +
                                '<div class="bot-message-display" id="' + unique_id +'">' +
                                    result.response +
                                '</div>' +
                            '</div>' +
                        '</div>'
                    );

                    //Scroll to bottom
                    scrollToBottom();
                
                },
                error: function(result) {
                    console.log(result)
                }
            });
        }
        
    }
}

function checkTime(i)
{
    if(i<10)
    {
        i="0"+i;
    }
    
    return i;
}

function todayDate(){
    var today = new Date(); 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = today.getDate() +' '+ months[today.getMonth()] + ' ' + today.getFullYear(); 
    var time = checkTime(today.getHours()) + ':' + checkTime(today.getMinutes()) + ':' + checkTime(today.getSeconds()); 

    return date+', '+time;
}
