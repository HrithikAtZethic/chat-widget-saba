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
    let iframe = `<iframe src="https://cdn.jsdelivr.net/gh/HrithikAtZethic/chat-widget-saba/chatbox/chatbox.html"></iframe>`
    div.innerHTML = iframe;
}

initialize(); // Intializer
