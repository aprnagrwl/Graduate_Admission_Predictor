document.getElementById('admissionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // UI feedback
    document.getElementById('btnText').style.display = 'none';
    document.getElementById('loader').style.display = 'inline-block';
    document.getElementById('result').textContent = "";

    const gre = document.getElementById('gre').value;
    const toefl = document.getElementById('toefl').value;
    const university_rating = document.getElementById('university_rating').value;
    const sop = document.getElementById('sop').value;
    const lor = document.getElementById('lor').value;
    const cgpa = document.getElementById('cgpa').value;
    const research = document.getElementById('research').value;

    const data = {
        gre: Number(gre),
        toefl: Number(toefl),
        university_rating: Number(university_rating),
        sop: Number(sop),
        lor: Number(lor),
        cgpa: Number(cgpa),
        research: Number(research)
    };

    try {
        // Change the URL below to your actual backend endpoint!
        const response = await fetch('https://d5c9-34-16-133-147.ngrok-free.app/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('result').textContent =
                `Chance of Admission: ${(result.probability * 100).toFixed(2)}%`;
        } else {
            document.getElementById('result').textContent = "Error: " + (result.error || "Could not get prediction.");
            document.getElementById('result').style.color = "#dc2626";
        }
    } catch (err) {
        document.getElementById('result').textContent = "Network error. Please try again.";
        document.getElementById('result').style.color = "#dc2626";
    } finally {
        document.getElementById('btnText').style.display = 'inline';
        document.getElementById('loader').style.display = 'none';
    }
});