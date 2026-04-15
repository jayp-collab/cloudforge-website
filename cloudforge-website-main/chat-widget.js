// Chatbot functionality
(function() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes cv-float {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-4px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);
    const chatLauncher = document.createElement("button");
    chatLauncher.id = "cv-chat-launcher";
    chatLauncher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 22 22" 
      fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <line x1="9" y1="10" x2="15" y2="10"/>
      <line x1="12" y1="7" x2="12" y2="13"/>
    </svg>
  `;
    chatLauncher.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background-color: #f59e0b;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: cv-float 3s ease-in-out infinite;`;
        document.body.appendChild(chatLauncher);

    const chatWindow = document.createElement("div");
    chatWindow.id = "cv-chat-window";
    chatWindow.style.cssText = `
        display: flex;
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 320px;
        height: 450px;
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        z-index: 9998;
        flex-direction: column;
        overflow: hidden;
        font-family: sans-serif;`;

    const chatHeader = document.createElement("div");
    chatHeader.style.cssText = `
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    padding: 16px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    border-radius: 16px 16px 0 0;
    position: relative;
    `;

    chatHeader.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;padding-bottom:12px;">
            <div style="width:38px;height:38px;border-radius:50%;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      display:flex;align-items:center;justify-content:center;
      box-shadow: 0 0 12px rgba(245,158,11,0.4);">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    </div>
    <div>
      <div style="color:white;font-weight:bold;font-size:14px;">VeroHelper</div>
      <div style="color:#10b981;font-size:12px;">● Online</div>
    </div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 50"
    style="display:block;margin-bottom:-1px;margin-left:-20px;width:calc(100% + 40px);">
    <path d="M0,0 C60,50 140,50 200,20 C240,0 280,45 320,10 L320,50 L0,50 Z" fill="#ffffff"/>
  </svg>
`;



    chatWindow.appendChild(chatHeader);

    const messagesArea = document.createElement("div");
    messagesArea.id = "cv-messages";
    messagesArea.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    `;

    messagesArea.innerHTML = `
      <div style="background-color:#f1f5f9;color:#1e293b;padding:10px 14px;
      border-radius:0px 12px 12px 12px;font-size:13px;max-width:85%;line-height:1.5;">
      Hi! I'm VeroHelper 👋 Ask me anything about CloudVero's services and pricing.
    </div>
  `;

    chatWindow.appendChild(messagesArea);

    const inputArea = document.createElement("div");
    inputArea.style.cssText = `
    padding: 12px 16px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    gap: 8px;
    background-color: #ffffff;
    `;

    inputArea.innerHTML = `
      <input id="cv-input" type="text" placeholder="Ask a question..."
      style="flex:1;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:24px;
      padding:8px 16px;color:#1e293b;font-size:13px;outline:none;" />
    <button id="cv-send"
      style="background: linear-gradient(135deg, #f59e0b, #d97706);border:none;
      border-radius:50%;width:36px;height:36px;color:white;cursor:pointer;
      font-size:16px;display:flex;align-items:center;justify-content:center;
      box-shadow: 0 2px 8px rgba(245,158,11,0.4);flex-shrink:0;">➤</button>
  `;

    chatWindow.appendChild(inputArea);

    document.body.appendChild(chatWindow);


    // Toggle chat window open/close
    chatLauncher.addEventListener("click", function() {
      const isHidden = chatWindow.style.display === "none";
      chatWindow.style.display = isHidden ? "flex" : "none";
    });

    // Allow Send message on button click
    document.getElementById("cv-send").addEventListener("click", sendMessage);

    // Alternatively allow send message on Enter key
    document.getElementById("cv-input").addEventListener("keydown", function(e) {
      if (e.key === "Enter") sendMessage();
    });

    async function sendMessage() {
      const input = document.getElementById("cv-input");
      const message = input.value.trim();
      if (!message) return;

      // Display the user message
      const userBubble = document.createElement("div");
      userBubble.style.cssText = `
      background-color:#f59e0b;color:white;padding:10px 14px;
      border-radius:12px 0px 12px 12px;font-size:13px;
      max-width:85%;line-height:1.5;align-self:flex-end;`;
      userBubble.textContent = message;
      messagesArea.appendChild(userBubble);

      input.value = "";

      // Display typing indicator
      const typing = document.createElement("div");
      typing.style.cssText = `
      background-color:#f1f5f9;color:#94a3b8;padding:10px 14px;
      border-radius:0px 12px 12px 12px;font-size:13px;max-width:85%;`;
      typing.textContent = "VeroHelper is typing...";
      messagesArea.appendChild(typing);
      messagesArea.scrollTop = messagesArea.scrollHeight;

      // Call the Netlify function
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        body: JSON.stringify({ message })
      });

      // Prepare for incoming response
      const data = await response.json();
      messagesArea.removeChild(typing);

      // Display VeroHelper's response
      const botBubble = document.createElement("div");
      botBubble.style.cssText = `
      background-color:#f1f5f9;color:#1e293b;padding:10px 14px;border-radius:0px 12px 12px 12px;font-size:13px;max-width:85%;line-height:1.5;`;
      botBubble.textContent = data.reply || data.error;
      
      messagesArea.appendChild(botBubble);
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    chatWindow.style.display = "none";

})();