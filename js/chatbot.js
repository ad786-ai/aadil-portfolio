
// Firebase SDK imports (only needed if using modules, skipped in HTML for now)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2xD7vX4fE-K6x9-tTRlgEHyw2ZaZpGHQ",
  authDomain: "chatbot-65d5f.firebaseapp.com",
  projectId: "chatbot-65d5f",
  storageBucket: "chatbot-65d5f.firebasestorage.app",
  messagingSenderId: "858807208025",
  appId: "1:858807208025:web:b1a48477390fcc97d44948",
  measurementId: "G-KPQLBTEN9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let userId = null;

// Sign in anonymously
signInAnonymously(auth).catch(console.error);

// Listen for auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    console.log("Signed in as:", userId);
    startChatListener();
  }
});

// Create Chat UI
const chatButton = document.createElement("button");
chatButton.className = "chat-toggle";
chatButton.innerHTML = "💬 Chat";
document.body.appendChild(chatButton);

const chatBox = document.createElement("div");
chatBox.className = "chat-box";
chatBox.innerHTML = `
  <div class="chat-header">Chat with Support</div>
  <div class="chat-messages" id="chatMessages"></div>
  <input type="text" id="chatInput" placeholder="Type your message..." />
`;
document.body.appendChild(chatBox);

chatButton.addEventListener("click", () => {
  chatBox.classList.toggle("open");
});

// Send message
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (text !== "") {
      addDoc(collection(db, "chatSessions/publicRoom/messages"), {
        text,
        senderId: userId || "anonymous",
        timestamp: serverTimestamp()
      });
      input.value = "";
    }
  }
});

// Append message
function appendMessage(sender, text, time) {
  const msgContainer = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "chat-message";
  div.innerHTML = `<strong>${sender}:</strong> ${text} <br/><small>${time}</small>`;
  msgContainer.appendChild(div);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Listen to messages in real time
function startChatListener() {
  const q = query(
    collection(db, "chatSessions/publicRoom/messages"),
    orderBy("timestamp", "asc")
  );
  onSnapshot(q, (snapshot) => {
    const chat = document.getElementById("chatMessages");
    chat.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      appendMessage(data.senderId, data.text, data.timestamp?.toDate().toLocaleTimeString() || "Just now");
    });
  });
}
