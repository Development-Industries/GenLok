document.getElementById('upgradeBtn').addEventListener('click', function () {
    // Placeholder: Simulate payment process
    localStorage.setItem('membershipStatus', 'Gold');
    alert("Membership upgraded to Gold. Enjoy your benefits!");
    // In a real application, integrate a payment API here
});

// Check membership on load
window.addEventListener('DOMContentLoaded', (event) => {
    const status = localStorage.getItem('membershipStatus') || 'Bronze';
    console.log('Current membership status:', status);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('backToGeneratorBtn').addEventListener('click', function () {
        window.location.href = 'popup.html'; // Adjust according to your file paths
    });
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bronze-btn').addEventListener('click', function () {
        alert('You have selected the Bronze Membership. Enjoy the free version!');
    });

    document.getElementById('silver-btn').addEventListener('click', function () {
        alert('You have selected the Silver Membership. Please proceed to payment for $0.99/month.');
        // Integrate payment system here (Stripe/PayPal)
    });

    document.getElementById('gold-btn').addEventListener('click', function () {
        alert('You have selected the Gold Membership. Please proceed to payment for $4.99/month.');
        // Integrate payment system here (Stripe/PayPal)
    });

    document.getElementById('backToGeneratorBtn').addEventListener('click', function () {
        window.location.href = 'popup.html'; // Redirect back to the generator
    });
});
