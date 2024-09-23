document.addEventListener('DOMContentLoaded', function () {
    const savedList = document.getElementById('savedList');
    const backToGeneratorBtn = document.getElementById('backToGeneratorBtn');

    // Load saved passwords from localStorage when the page loads
    loadSavedPasswords();

    // Listen for password saved events and add new passwords to the list
    document.addEventListener('passwordSaved', function (event) {
        if (event.detail && event.detail.password) {
            addPasswordToList(event.detail.password);
        }
    });

    // Back to Generator button event listener
    backToGeneratorBtn.addEventListener('click', function () {
        window.location.href = 'popup.html'; // Ensure this path is correct for your extension structure
    });

    // Function to load saved passwords from localStorage and display them
    function loadSavedPasswords() {
        const passwords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        passwords.forEach((passwordData, index) => {
            addPasswordToList(passwordData, index);
        });
    }

    // Function to add a password to the list dynamically
    function addPasswordToList(passwordData, index) {
        const li = document.createElement('li');
        li.className = 'saved-item';

        // Label and password container
        const label = document.createElement('span');
        label.textContent = passwordData.name || `Password ${index + 1}: `;
        label.className = 'password-label';

        const password = document.createElement('span');
        password.textContent = passwordData.password;
        password.className = 'password-text';
        password.addEventListener('click', function () {
            copyToClipboard(passwordData.password);
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            deletePassword(index);
        });

        li.appendChild(label);
        li.appendChild(password);
        li.appendChild(deleteBtn);
        savedList.appendChild(li);
    }

    // Function to copy a password to the clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Password copied to clipboard!');
    }

    // Function to delete a password from localStorage and remove it from the list
    function deletePassword(index) {
        let passwords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        passwords.splice(index, 1); // Remove the password at the specified index
        localStorage.setItem('savedPasswords', JSON.stringify(passwords));
        savedList.innerHTML = ''; // Clear the list
        loadSavedPasswords(); // Reload the list to reflect the deletion
    }
});
