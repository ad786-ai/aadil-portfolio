// Create the chat toggle button
const chatButton = document.createElement("button");
chatButton.className = "chat-toggle";
chatButton.innerHTML = "💬 Chat with us";
document.body.appendChild(chatButton);

// Create the chat UI box
const chatBox = document.createElement("div");
chatBox.className = "chat-box";
chatBox.innerHTML = `
  <div class="chat-header">Support Chat</div>
  <div class="chat-messages" id="chatMessages"></div>
  <input type="text" id="chatInput" placeholder="Type a message..." />
`;
document.body.appendChild(chatBox);

// Toggle chat visibility
chatButton.addEventListener("click", () => {
  chatBox.classList.toggle("open");
});

// Handle sending messages
const chatInput = document.getElementById("chatInput");
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const userMessage = chatInput.value.trim();
    appendMessage("You", userMessage);
    chatInput.value = "";

    fetch("https://aadil-livechat.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    })
      .then((res) => res.json())
      .then((data) => {
        appendMessage("Support", data.reply || "Sorry, no response.");
      })
      .catch(() => {
        appendMessage("Support", "Server error. Please try again later.");
      });
  }
});

// Add messages to chat window
function appendMessage(sender, message) {
  const msgBox = document.getElementById("chatMessages");
  const msg = document.createElement("div");
  msg.className = "chat-msg";
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
}
