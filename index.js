function initialize(){

    addIconScript(); // Adds Icons (Important)
    addStyleToDOM(); // Adds Style

    let div = elementCreate("div"); // create div
    div.id = "chat-container";
    var chatButton = elementCreate("button");
    shapeButton(chatButton);
    chatButton.onclick = onClickButton;

    div.appendChild(chatButton); // append button to the div
    document.body.appendChild(div); // append the div to body

}


function elementCreate(element){ // Create any element
    let createdElement = document.createElement(element);
    return createdElement;
}


function addIconScript(){
    let script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/assets/icons.js";  // This icon file needs to be "hosted" or have to "buy the CDN from font-awesome pro" or just "place the file in the repo" 
    document.body.appendChild(script);
}

function addStyleToDOM(){ // Global Style

    let style = document.createElement('style');
    style.innerHTML =

        'body{' +
            'background-color:#e3dede;' +
        '}' +

        '.chat-initiate-button {' +
            'width: 108px;' +
            'height: 44px;' +
            'font-size:larger;' +
            'color: white;' +
            'background-color: #ed1566;' +
            'border: none;' +
            'outline: none;' +
            'border-radius: 5rem;' +
            'border-top-right-radius: 0;' +
            'z-index: 2147483000;' +
            'position: fixed;' +
            'bottom: 25px;' +
            'right: 20px;' +
        '}' +

        '#chat-initiate-icon {' +
            'margin-right: 0.5rem;' +
        '}' +

        '#chat-container iframe {' + 
            'width: 100%;' +
            'height: 100%;' +
            'border: none;' +
            'outline: none;' +
        '}';


    // Get the first script tag
    let ref = document.querySelector('script');

    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);

}

function shapeButton(element){ // Add CSS and Content and all.
    element.innerHTML = "Chat"
    element.classList.add("chat-initiate-button");
    let id = elementCreate("id");
    id.classList.add("fas", "fa-comments-alt");
    id.id = "chat-initiate-icon";
    element.prepend(id);
}

function onClickButton(){ // Onclick function
    let div = document.getElementById("chat-container");
    div.innerHTML = "";
    let iframe = `<iframe srcdoc="<!DOCTYPE html>
<html class="" lang="">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Chat</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <script src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/assets/icons.js"></script> <!-- This script is needed, bcz its a cracked font-awesome icons CDN -->
    <script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/assets/style.css" />
</head>

<body>
    <main>
        <div class="chat-box">

            <div class="chat-box-head">
                <div class="saba-icon">
                    <img class="saba-icon-img" src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/assets/stocks/saba.png">
                </div>
                <div class="utility-icon">
                    <i class="fas fa-badge-percent fa-lg" style="color:#ed1566"></i>
                    <i class="fas fa-exclamation-circle fa-lg" style="color:#ed1566"></i>
                    <i class="fal fa-times fa-lg" onclick="closeChat()"></i>
                </div>
            </div>

            <div id="chatbody-id" class="chat-box-body">

                <div class="chat-message">
                    <i class="avatar-robot">
                        <i class="fad fa-user-robot fa-lg" style="color:#ed1566"></i>
                    </i>

                    <p class="chat-message-text">
                        Hii, This is SABA. 
                        <!-- <span>Today 2.30</span> -->
                    </p>
                </div>

                <div class="chat-message">
                    <i class="avatar-robot">
                        <i class="fad fa-user-robot fa-lg" style="color:#ed1566"></i>
                    </i>

                    <p class="chat-message-text">
                        How can i help you ?
                        <!-- <span>Today 2.30</span> -->
                    </p>
                </div>

            </div>

            <div class="chat-box-footer">
                <div class="footer-lang">
                    <img class="flag-icon" src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/assets/stocks/usa.png">
                </div>
                <div class="footer-input">
                    <input id="chat-input" autofocus autocomplete="off"
                        placeholder="E.g. Could you please make up my room..?" onkeydown="sendMessage(event)" />
                </div>
                <div class="footer-send">
                    <i class="fad fa-paper-plane fa-lg" style="color: grey;"></i>
                </div>
            </div>

        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/assets/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/utils/pusher.js" type="module"></script>
</body>

</html>"></iframe>`
    div.innerHTML = iframe;
}

initialize(); // Intializer
