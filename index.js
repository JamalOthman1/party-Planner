document.addEventListener('DOMContentLoaded', function() {
    fetchParties();

    document.getElementById('add-party-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const partyData = {
            name: document.getElementById('name').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
        };
        addParty(partyData);
    });
});

function fetchParties() {
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes.')
        .then(response => response.json())
        .then(data => {
            const partyList = document.getElementById('party-list');
            partyList.innerHTML = ''; // Clear existing parties
            data.forEach(party => {
                const partyItem = document.createElement('div');
                partyItem.classList.add('party-item');
                partyItem.innerHTML = `
                    <strong>${party.name}</strong> - ${party.date} ${party.time} at ${party.location}
                    <span>${party.description}</span>
                    <span class="delete-button" onclick="deleteParty('${party.id}')">Delete</span>
                `;
                partyList.appendChild(partyItem);
            });
        });
}

function addParty(partyData) {
    
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes.', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(partyData),
    })
    .then(response => response.json())
    .then(data => {
        fetchParties(); // Refresh the list of parties
    });
}

function deleteParty(id) {
    fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes./${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            fetchParties(); // Refresh the list of parties
        }
    });
}
