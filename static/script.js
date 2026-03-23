let messages = {}

function sendPrompt() {
    document.getElementById("sendPrompt").disabled = true;
    const prompt = document.getElementById("prompt").value;
    const user = document.getElementById("user").value;

    if (!(user in messages)) messages[user] = [];
    messages[user].push([prompt]);

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user,
            prompt: prompt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("sendPrompt").disabled = false;
        messages[user].at(-1).push(JSON.stringify(data["response"], null, 2));
        renderNewMessage();
    })
    .catch(err => {
        document.getElementById("sendPrompt").disabled = false;
        messages[user].at(-1).push("Error: " + err);
        renderNewMessage();
    });
}

function createMessageElementPair(prompt, response) {
    var promptNode = document.createElement("pre");
    promptNode.innerText = prompt;
    promptNode.classList.add("promptMessage");

    var responseNode = document.createElement("pre");
    responseNode.innerText = response;
    responseNode.classList.add("responseMessage");
    return [promptNode, responseNode];
}

function renderNewMessage() {
    const user = document.getElementById("user").value;
    if (!(user in messages)) {
        messages[user] = [];
        return;
    }
    const newElems = createMessageElementPair(messages[user].at(-1)[0], messages[user].at(-1)[1]);
    document.getElementById("outputDiv").append(...newElems);
    document.getElementById("outputDiv").scrollTop = document.getElementById("outputDiv").scrollHeight;
}

function renderAllMessages() {
    const user = document.getElementById("user").value;
    if (!(user in messages)) messages[user] = [];
    var newChildren = [];
    for (var i = 0; i < messages[user].length; i++) {
        var newElems = createMessageElementPair(messages[user][i][0], messages[user][i][1]);
        newChildren.push(...newElems);
    }
    document.getElementById("outputDiv").replaceChildren(...newChildren);
    document.getElementById("outputDiv").scrollTop = document.getElementById("outputDiv").scrollHeight;
}

function clearMessages() {
    const user = document.getElementById("user").value;
    messages[user] = [];
    renderAllMessages();
}