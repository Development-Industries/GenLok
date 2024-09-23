document.addEventListener('DOMContentLoaded', function () {
    const backgroundSelect = document.getElementById('backgroundSelect');
    const buttonColorInput = document.getElementById('buttonColor');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const backToGeneratorBtn = document.getElementById('backToGeneratorBtn');

    // Load previously saved settings on page load
    loadSettings();

    saveSettingsBtn.addEventListener('click', function () {
        const selectedBackground = backgroundSelect.value;
        const selectedButtonColor = buttonColorInput.value;

        // Save settings to localStorage
        localStorage.setItem('background', selectedBackground);
        localStorage.setItem('buttonColor', selectedButtonColor);

        alert('Settings saved!');

        // Apply the settings immediately
        applySettings();
    });

    // Back to Generator button functionality
    backToGeneratorBtn.addEventListener('click', function () {
        window.location.href = 'popup.html';
    });

    function loadSettings() {
        const savedBackground = localStorage.getItem('background');
        const savedButtonColor = localStorage.getItem('buttonColor');

        // Set the saved values in the form if available
        if (savedBackground) {
            backgroundSelect.value = savedBackground;
        }
        if (savedButtonColor) {
            buttonColorInput.value = savedButtonColor;
        }

        // Apply the saved settings on page load
        applySettings();
    }

    function applySettings() {
        const background = localStorage.getItem('background') || 'BG1.png';
        const buttonColor = localStorage.getItem('buttonColor') || '#007bff';

        // Apply background image
        document.body.style.backgroundImage = `url('${background}')`;

        // Apply button color across the app
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = buttonColor;
        });
    }
});
