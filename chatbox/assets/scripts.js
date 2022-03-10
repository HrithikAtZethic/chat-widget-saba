const config = {
  appKey: "4b2c0457861dd98fc950",
  appCluster: "ap1",
};

let global = {
  channel: null,
  conversation_id: localStorage.getItem("chat_widget_data")
    ? JSON.parse(localStorage.getItem("chat_widget_data")).conversation_id
    : null,
  user_id: localStorage.getItem("chat_widget_data")
    ? JSON.parse(localStorage.getItem("chat_widget_data")).guest.id
    : null,
  previousIntent: localStorage.getItem("previousIntent")
    ? localStorage.getItem("previousIntent")
    : '',
  lastMessageId: localStorage.getItem("lastMessageId")
    ? localStorage.getItem("lastMessageId")
    : '',
  timestamp: localStorage.getItem("chat_widget_data")
    ? JSON.parse(localStorage.getItem("chat_widget_data")).timestamp
    : null,
};

async function initialize() {
  scrolltoBottom();

  await pusherInitialize();

  global.channel.bind("bot", async (data) => {
    if(data.payload.status === 'sent'){
      let message = await getMessages(1,1);
      let parsedMsg = parseMessage(message);
      appendChat(false, { value: parsedMsg.p.fulfillmentText })  
    }
  });
}

async function pusherInitialize() {
  let response = await handleRequest(
    "https://demo.dashboard.chatbothotels.com/api/v1/conversation/init",
    "POST",
    { conversation_id: global.conversation_id}
  );

  if(!global.conversation_id){
    localStorage.setItem("chat_widget_data", JSON.stringify(response));
  }

  if (response) {

    global.conversation_id = response.conversation_id;
    global.user_id = response.guest.id;

    if(response.timestamp){
      global.timestamp = response.timestamp;
    }

    const pusher = new Pusher(config.appKey, {
      cluster: config.appCluster,
      authEndpoint:
        "https://demo.dashboard.chatbothotels.com/api/v1/bot/auth/private-channel",
      auth: {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    });

    getMessages(1,50);

    global.channel = pusher.subscribe(
      `private-demo.bot.${global.conversation_id}`
    );
  }
}

function getMessages(page, perPage) {
  let response = handleRequest(
    `https://demo.dashboard.chatbothotels.com/api/v1/conversation/${global.conversation_id}?params[page]=${page}&params[perPage]=${perPage}&params[sorting]=desc&lastMessageId=${global.lastMessageId}&timestamp=${global.timestamp}`,
    'GET'
  );
  return response;
}

function scrolltoBottom() {
  let chatWrapper = document.querySelector("#chatbody-id");
  chatWrapper.scrollTop = chatWrapper.scrollHeight;
}

async function sendMessage(event) {
  if (event.keyCode === 13) {
    let chatInput = document.getElementById("chat-input");
    if (chatInput.value === "" || chatInput === null) {
      return;
    } else {
      let response = await manipulateData(chatInput.value);
      if (response) {
        appendChat(true, chatInput);
        localStorage.setItem("previousIntent", response.p.intent);
        global.previousIntent = response.p.intent;
        localStorage.setItem("lastMessageId", response.p.lastMessageId);
        global.previousIntent = response.p.lastMessageId;
      }
    }
  }
}

function manipulateData(text) {
  let data = {
    session: `c-${global.conversation_id}-u-${global.user_id}-d-demo`,
    previousIntent: global.previousIntent,
    handoverEnabled: false,
    queryInput: {
      text: {
        text: text,
        languageCode: "en",
      },
    },
    payload: {},
  };
  try {
    let response = handleRequest(
      "https://demo.chatbothotels.com/api/fulfillment/request",
      "POST",
      data
    );
    return response;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

function parseMessage(data){
  console.log(data);
  let messages = data.conversation.data;
  let msgObj = {};
  messages.forEach((message) => {
    msgObj.u =  message.sender.type,
    msgObj.p = Object.assign({}, JSON.parse(message.body)),
    localStorage.getItem("lastMessageId", message.id);
  });
  return msgObj;
}

function appendChat(isInitiator, chatInput) {
  //Create the elements
  let innerChild = `
        <i class="avatar-robot">
            <i class="fad fa-user-robot fa-lg" style="color:#ed1566"></i>
        </i>
        
        <p class="chat-message-text">
            ${chatInput.value}
            <!-- <span>Today 2.30</span> -->
        </p>
    `;
  //Append the element to the node and then to the body
  let outerDiv = document.createElement("div");
  if (isInitiator) {
    outerDiv.classList.add("chat-message", "initiator");
  } else {
    outerDiv.classList.add("chat-message");
  }
  outerDiv.innerHTML = innerChild;
  document.getElementById("chatbody-id").appendChild(outerDiv);

  //clear input field
  chatInput.value = "";

  // Auto Scroll to bottom
  scrolltoBottom();
}

function closeChat() {
  let div = parent.document.getElementById("chat-container");
  div.innerHTML = "";
  let button = `
    <button class="chat-initiate-button" onclick="onClickButton()"><i id="chat-initiate-icon"class="fas fa-comments-alt"></i></i>Chat</button>
    `;
  div.innerHTML = button;
}

async function handleRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
    });
    return await response.json();
  } catch (error) {
    console.warn("Something went wrong.", error);
    return false;
  }
}

initialize();