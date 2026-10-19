const form = document.getElementById('myForm');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    // ✅ Fixed: ID matches the HTML checkbox id="terms"
    const terms = document.getElementById('terms');
    if (terms && !terms.checked) {
        alert("Veuillez accepter les termes.");
        return;
    }

    // Check if at least one non-empty field exists (ignoring checkbox)
    let hasValue = false;
    for (let [key, value] of data.entries()) {
        if (typeof value === 'string' && value.trim() !== '') {
            hasValue = true;
            break;
        }
    }

    if (!hasValue) {
        alert("Veuillez remplir au moins un champ avant de valider.");
        return;
    }

    // Disable button to prevent double submit
    const btn = form.querySelector('.fbtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours...'; }

    try {
        const response = await fetch('https://formbold.com/s/ozDZ8', {
            method: 'POST',
            body: data
        });

        if (response.ok) {
            window.location.href = 'success.html';
        } else {
            alert("Erreur lors de l'envoi. Code: " + response.status);
            if (btn) { btn.disabled = false; btn.textContent = 'VALIDER'; }
        }

    } catch (error) {
        alert("Erreur lors de l'envoi du formulaire.");
        console.error(error);
        if (btn) { btn.disabled = false; btn.textContent = 'VALIDER'; }
    }
});
