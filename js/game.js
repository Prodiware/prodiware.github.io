// A placeholder for our WebSocket server URL.
// YOU MUST REPLACE THIS WITH YOUR ACTUAL DEPLOYED SERVER ADDRESS.
const SERVER_URL = 'ws://localhost:8080';

// A mock server list for demonstration
const mockServers = [
    { id: 'server-1', name: 'Cyclone World - US East', players: 15 },
    { id: 'server-2', name: 'Cyclone World - Europe', players: 42 },
    { id: 'server-3', name: 'Cyclone World - Asia', players: 9 }
];

const serverListElement = document.getElementById('server-list');
const statusMessageElement = document.getElementById('status-message');

function displayServers(servers) {
    serverListElement.innerHTML = ''; // Clear the list
    servers.forEach(server => {
        const listItem = document.createElement('li');
        listItem.className = 'server-item';
        listItem.innerHTML = `
            <div>
                <span class="server-name">${server.name}</span>
                <br>
                <span class="player-count">${server.players} players online</span>
            </div>
            <button class="join-btn" data-server-id="${server.id}">Join</button>
        `;
        serverListElement.appendChild(listItem);
    });

    // Add event listeners to the join buttons
    document.querySelectorAll('.join-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const serverId = event.target.dataset.serverId;
            connectToServer(serverId);
        });
    });
}

function connectToServer(serverId) {
    statusMessageElement.textContent = `Connecting to server ${serverId}...`;
    try {
        const ws = new WebSocket(SERVER_URL);

        ws.onopen = () => {
            console.log('Connected to WebSocket server!');
            statusMessageElement.textContent = `Successfully connected to server!`;
            // At this point, you would send a "join game" message to the server
            // and receive game data to start the actual game loop.
            ws.send(JSON.stringify({ type: 'joinGame', serverId: serverId }));

            // For now, let's just keep the connection open for a bit
            // and then close it for this example.
            setTimeout(() => {
                ws.close();
            }, 5000);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            // Handle incoming game data here (player positions, etc.)
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server.');
            statusMessageElement.textContent = `Disconnected from server.`;
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            statusMessageElement.textContent = `Error connecting to server.`;
        };
    } catch (error) {
        console.error('Failed to create WebSocket:', error);
        statusMessageElement.textContent = `Connection failed: ${error.message}`;
    }
}

// For a real game, you would fetch this list from your backend
// using a regular HTTP request (e.g., fetch('/api/servers')).
// For this example, we'll just display the mock data immediately.
document.addEventListener('DOMContentLoaded', () => {
    displayServers(mockServers);
});
