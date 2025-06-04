const repo = "Or300/NORTH";
const token = "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"; // <-- Replace with your token here
const apiUrl = `https://api.github.com/repos/Or300/NORTH/issues`;

async function fetchMessages() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error fetching messages: ${response.status}`);

    const issues = await response.json();

    const container = document.getElementById("messages");
    container.innerHTML = "";

    if (issues.length === 0) {
      container.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    for (const issue of issues) {
      container.innerHTML += `
        <div class="message">
          <strong>${issue.title}</strong> wrote:<br/>
          ${issue.body.replace(/\n/g, "<br/>")}
        </div>
      `;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("messages").innerText = "Failed to load messages.";
  }
}

async function postMessage() {
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim() || "Anonymous";
  const message = messageInput.value.trim();

  if (!message) {
    alert("Please write a message!");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: name,
        body: message
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      alert(`Failed to post message: ${errData.message || response.statusText}`);
      return;
    }

    nameInput.value = "";
    messageInput.value = "";

    fetchMessages();
  } catch (error) {
    alert("An error occurred while posting the message.");
    console.error(error);
  }
}

// Initial load
fetchMessages();
