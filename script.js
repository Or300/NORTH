// CONFIGURATION
const repo = "Or300/NORTH"; // Change to your repo
const token = "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";   // WARNING: DO NOT expose this in public
const api = `https://api.github.com/repos/${repo}/issues`;

async function fetchMessages() {
  const res = await fetch(api);
  const data = await res.json();
  const msgDiv = document.getElementById("messages");
  msgDiv.innerHTML = "";

  data.forEach(issue => {
    msgDiv.innerHTML += `
      <div class="message">
        <strong>${issue.title}</strong>
        <p>${issue.body}</p>
      </div>
    `;
  });
}

async function postMessage() {
  const name = document.getElementById("name").value.trim() || "Anonymous";
  const msg = document.getElementById("content").value.trim();
  if (!msg) return alert("Message cannot be empty.");

  await fetch(api, {
    method: "POST",
    headers: {
      "Authorization": "token " + token,
      "Accept": "application/vnd.github.v3+json"
    },
    body: JSON.stringify({
      title: name,
      body: msg
    })
  });

  document.getElementById("content").value = "";
  fetchMessages();
}

fetchMessages();
