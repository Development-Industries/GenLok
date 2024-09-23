document.addEventListener('DOMContentLoaded', function () {
    // Apply saved settings (background and button color) on popup load
    applySavedSettings();

    // Event listeners for generating, copying, saving, and navigation
    document.getElementById('generateBtn').addEventListener('click', generatePassword);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('saveBtn').addEventListener('click', savePassword);
    document.getElementById('viewSavedBtn').addEventListener('click', function () {
        window.location.href = 'saved.html';
    });
    document.getElementById('membershipBtn').addEventListener('click', function () {
        window.location.href = 'membership.html';
    });
    document.getElementById('settingsBtn').addEventListener('click', function () {
        window.location.href = 'settings.html';
    });

    // Apply saved settings (background and button color)
    function applySavedSettings() {
        const savedBackground = localStorage.getItem('background') || 'BG1.png'; // Default to BG1 if none is set
        const savedButtonColor = localStorage.getItem('buttonColor') || '#007bff'; // Default button color

        // Apply the background image to the body
        document.body.style.backgroundImage = `url('${savedBackground}')`;

        // Apply button color to all buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = savedButtonColor;
        });
    }

    // Password categories with dummy words (ensure to expand these lists as needed)
    const categories = {
        "Fantasy": [
            "wizard", "dragon", "quest", "spell", "magic", "unicorn", "goblin", "troll", "witch", "warlock",
            "sorcery", "potion", "crystal", "amulet", "castle", "kingdom", "phoenix", "griffin", "elf", "dwarf",
            "orb", "tower", "mage", "enchant", "cloak", "scroll", "necromancer", "paladin", "rogue", "quiver",
            "myth", "legend", "fable", "mystic", "faerie", "halfling", "scepter", "lore", "beast", "chalice",
            "vortex", "spellbound", "mystical", "fortress", "moat", "golem", "divine", "shaman", "vampire", "ghost"
        ],

        "Gen Z": [
            "yeet", "vibe", "salty", "lit", "fam", "sus", "ghosted", "squad", "bae", "fleek",
            "snack", "clapback", "fire", "savage", "chill", "mood", "woke", "swag", "tea", "shade",
            "finna", "gucci", "drip", "no cap", "bet", "slay", "troll", "yeet", "flex", "finesse",
            "cringe", "stan", "lowkey", "highkey", "skrrt", "bop", "glow up", "hundo p", "extra", "basic",
            "spill the tea", "cancel", "karen", "simp", "gaslight", "woke", "ratioed", "doxx", "smol", "big yikes"
        ],

        "Curse Words": [
            "fluff", "darn", "heck", "blip", "crud", "blooper", "frick", "heckle", "bloop", "fudge",
            "muggle", "noodle", "piffle", "rascal", "balderdash", "gobbledygook", "poppycock", "pishposh", "lollygag", "nincompoop",
            "whippersnapper", "bumfuzzle", "lummox", "clodhopper", "fisticuffs", "skedaddle", "hornswoggle", "hullabaloo", "cattywampus", "snickerdoodle",
            "brouhaha", "canoodle", "doohickey", "kerfuffle", "malarkey", "ninkumpoop", "pandemonium", "shenanigans", "wabbit", "whatchamacallit",
            "ziggurat", "zoinks", "gobsmacked", "jinkies", "kook", "prat", "tarnation", "vex", "yowza", "zounds"
        ],

        "Sci-Fi": [
            "alien", "raygun", "spaceship", "laser", "robot", "android", "cyborg", "nebula", "warp", "phaser",
            "hyperdrive", "vortex", "quantum", "singularity", "black hole", "neutron", "stardust", "galaxy", "cosmos", "asteroid",
            "meteor", "comet", "orbit", "graviton", "ion", "eclipse", "pulsar", "quasar", "starship", "holodeck",
            "forcefield", "cryonics", "teleport", "exoplanet", "moonbase", "alienist", "cloning", "dark matter", "wormhole", "flux capacitor",
            "multiverse", "nano", "particle", "radar", "solar flare", "space time", "tractor beam", "void", "white dwarf", "xenon"
        ],

        "Historical": [
            "knight", "castle", "sword", "duke", "siege", "squire", "armor", "monarch", "trebuchet", "barricade",
            "emperor", "dynasty", "fiefdom", "guild", "heraldry", "joust", "mace", "manor", "peasant", "rebellion",
            "shield", "throneroom", "vassal", "viking", "warrior", "crossbow", "crusade", "empire", "fortress", "gauntlet",
            "greaves", "kingdom", "lance", "maiden", "minstrel", "paladin", "quest", "scroll", "tome", "tournament",
            "alchemy", "basilica", "citadel", "dagger", "excalibur", "flail", "grail", "heretic", "inquisition", "jester"
        ],
        "Modern Slang": [
            "ghost", "receipts", "on fleek", "clout", "thirsty", "savage", "on point", "hundo P", "extra", "shook",
            "lowkey", "highkey", "mood AF", "boujee", "slay", "GOAT", "lit", "turnt", "salty", "snatched",
            "vibe check", "sus", "finna", "woke", "TFW", "IMO", "bruh", "fam", "smol", "big mood",
            "yeet", "stan", "iconic", "cancelled", "snack", "flex", "hype", "throw shade", "OTP", "BFF",
            "CD9", "143", "FOMO", "LMIRL", "PAW", "ship", "squad goals", "TBH", "YOLO", "swag"
        ],
        "Items": [
            "keychain", "umbrella", "pen", "notebook", "lamp", "wallet", "sunglasses", "watch", "backpack", "bracelet",
            "candle", "pillow", "blanket", "chair", "desk", "glasses", "headphones", "laptop", "smartphone", "book",
            "bottle", "camera", "charger", "headset", "keyboard", "mouse", "printer", "router", "speakers", "usb",
            "vase", "clock", "mirror", "towel", "frame", "bag", "belt", "boots", "cap", "coat",
            "dress", "gloves", "jacket", "jeans", "jewelry", "scarf", "shirt", "shoes", "skirt", "sneakers"
        ],
        "Names": [
            "Emma", "Liam", "Noah", "Olivia", "Ava", "Ethan", "Sophia", "Logan", "Lucas", "Mia",
            "Amelia", "Isabella", "Mason", "James", "Alexander", "Ella", "Charlotte", "Benjamin", "Daniel", "Michael",
            "Carter", "Abigail", "Emily", "Harper", "Evelyn", "Madison", "Avery", "Elijah", "Oliver", "Sophie",
            "Scarlett", "Jack", "Aiden", "Jacob", "Matthew", "Lily", "Grace", "Chloe", "Victoria", "Zoe",
            "Jackson", "Nathan", "Samuel", "Henry", "Owen", "Gabriel", "Luke", "Gavin", "David", "Isaac"
        ],
        "Colors": [
            "Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Purple", "Lilac", "Magenta",
            "Pink", "Black", "Gray", "White", "Maroon", "Cyan", "Mint", "Teal", "Navy", "Aqua",
            "Beige", "Peach", "Lime", "Emerald", "Jade", "Amber", "Gold", "Silver", "Bronze", "Copper",
            "Sapphire", "Scarlet", "Crimson", "Burgundy", "Fuchsia", "Cerulean", "Azure", "Lavender", "Ivory", "Saffron",
            "Champagne", "Taupe", "Sienna", "Orchid", "Turquoise", "Sunset", "Charcoal", "Plum", "Salmon", "Mustard"
        ],

        "Animals": [
            "Dog", "Cat", "Elephant", "Tiger", "Lion", "Bear", "Giraffe", "Zebra", "Fox", "Wolf",
            "Panda", "Koala", "Kangaroo", "Monkey", "Sloth", "Deer", "Rabbit", "Horse", "Frog", "Turtle",
            "Hawk", "Eagle", "Owl", "Parrot", "Crow", "Swan", "Peacock", "Duck", "Penguin", "Shark",
            "Whale", "Dolphin", "Octopus", "Starfish", "Seahorse", "Clownfish", "Jellyfish", "Coral", "Crab", "Lobster",
            "Chameleon", "Gecko", "Python", "Alligator", "Crocodile", "Hippopotamus", "Rhino", "Cheetah", "Leopard", "Buffalo"
        ],
        "Literary Genres": [
            "Mystery", "Fantasy", "Horror", "Sci-Fi", "Romance", "Adventure", "Thriller", "Biography", "Memoir", "Poetry",
            "Drama", "Comedy", "Tragedy", "Satire", "Mythology", "Fable", "Folklore", "Historical", "Nonfiction", "Cyberpunk",
            "Steampunk", "Dystopia", "Utopia", "Manga", "Comics", "Graphic Novel", "Young Adult", "Children's", "Detective", "Western",
            "Epic", "Paranormal", "Magical Realism", "Suspense", "Technical", "Journalism", "Academic", "Educational", "Anthology", "Narrative",
            "Erotica", "Cookbook", "Diary", "Guide", "Health", "Spiritual", "Sports", "Travel", "True Crime", "Science"
        ],
        "Musical Instruments": [
            "Piano", "Guitar", "Violin", "Drums", "Flute", "Saxophone", "Clarinet", "Trumpet", "Harp", "Cello",
            "Trombone", "Tuba", "Mandolin", "Banjo", "Organ", "Accordion", "Harmonica", "Oboe", "Bassoon", "Recorder",
            "Synthesizer", "Timpani", "Xylophone", "Conga", "Bongo", "Maracas", "Glockenspiel", "Vibraphone", "Pan Flute", "Piccolo",
            "Ukulele", "Sitar", "Dobro", "Balalaika", "Sarod", "Veena", "Tabla", "Didgeridoo", "Lute", "Bugle",
            "Cornet", "Flugelhorn", "French Horn", "Euphonium", "Snare Drum", "Bass Drum", "Hang Drum", "Djembe", "Cajón", "Castanets"
        ],
        "Architectural Elements": [
            "Column", "Beam", "Arch", "Dome", "Facade", "Gable", "Lintel", "Mullion", "Pilaster", "Spire",
            "Staircase", "Vault", "Truss", "Balustrade", "Cornice", "Frieze", "Pediment", "Pilaster", "Portico", "Quoin",
            "Soffit", "Turret", "Veneer", "Joist", "Girder", "Cantilever", "Buttress", "Cupola", "Lantern", "Mansard",
            "Oriel", "Parapet", "Pinnacle", "Sash", "Shutter", "Sill", "Skylight", "Transom", "Wainscot", "Corniche",
            "Fascia", "Keystone", "Molding", "Niche", "Obelisk", "Plinth", "Revetment", "Squinch", "Stucco", "Terrazzo"
        ],
        "Technological Terms": [
            "Algorithm", "Bandwidth", "Cache", "Data", "Encryption", "Firmware", "Gigabyte", "Hardware", "Interface", "Java",
            "Kernel", "Latency", "Malware", "Network", "Opcode", "Protocol", "Quantum", "Router", "Software", "Token",
            "URL", "Virtual", "Web", "XML", "Zip", "Backend", "Compile", "Debug", "Execute", "Fragmentation",
            "Gateway", "Hyperlink", "Iteration", "Joystick", "Kilobyte", "Login", "Mainframe", "Node", "Object", "Patch",
            "Query", "Resolution", "Stream", "Thread", "User", "Variable", "Widget", "Exabyte", "Firewall", "Graphics"
        ],
        "Botanical Terms": [
            "Acorn", "Bamboo", "Cactus", "Daisy", "Evergreen", "Fern", "Geranium", "Hibiscus", "Ivy", "Jasmine",
            "Kale", "Lavender", "Moss", "Nettle", "Oak", "Palm", "Quince", "Rose", "Sunflower", "Tulip",
            "Umbrella Plant", "Violet", "Willow", "Xerophyte", "Yucca", "Zinnia", "Algae", "Bulb", "Conifer", "Deciduous",
            "Eucalyptus", "Frond", "Ginkgo", "Hydrangea", "Inflorescence", "Juniper", "Kudzu", "Lichen", "Myrtle", "Nectar",
            "Orchid", "Pine", "Rhizome", "Sapling", "Thorn", "Underbrush", "Vine", "Wheat", "Xylem", "Yam"
        ],

        // Add additional categories as required
    };

    // Function to generate a password
    function generatePassword() {
        let length = parseInt(document.getElementById('lengthInput').value, 10);
        length = isNaN(length) ? 8 : length; // Default to 8 if input is invalid
        const categoryKeys = Object.keys(categories);
        const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const words = categories[category];
        let password = "";

        while (password.length < length) {
            password += words[Math.floor(Math.random() * words.length)];
            if (password.length < length) {
                password += Math.floor(Math.random() * 10); // Add a number
                password += '@'; // Special character
            }
        }
        document.getElementById('passwordOutput').value = password.slice(0, length);
    }

    // Function to copy password to clipboard
    function copyToClipboard() {
        const passwordInput = document.getElementById('passwordOutput');
        passwordInput.select();
        document.execCommand('copy');
        alert("Password copied to clipboard!");
    }

    // Function to save password to localStorage
    function savePassword() {
        const password = document.getElementById('passwordOutput').value;
        if (password) {
            const name = prompt('Enter a label for this password:');
            let saved = JSON.parse(localStorage.getItem('savedPasswords')) || [];
            saved.push({ name: name || 'Unnamed', password });
            localStorage.setItem('savedPasswords', JSON.stringify(saved));

            // Dispatch event to notify saved.html page
            const event = new CustomEvent('passwordSaved', { detail: { password } });
            document.dispatchEvent(event);

            alert('Password saved!');
        }
    }
});
