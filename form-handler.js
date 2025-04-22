function submitForm(data) {
  const { name, phone, address } = data;

  // Basic validation
  if (!name || name.trim() === "") {
    alert("Name cannot be empty.");
    return;
  }

  const phoneRegex = /^\d{10,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    alert("Please enter a valid phone number (10-15 digits).");
    return;
  }

  if (!address || address.trim() === "") {
    alert("Address cannot be empty.");
    return;
  }

  // Save to Firebase Firestore
  firebase.firestore.collection("applications").add({
    name: name,
    phone: phone,
    address: address,
    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    // Show success message with form data
    const successMessage = `Form submitted and saved successfully!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    alert(successMessage);

    // Clear the form after successful submission
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
  })
  .catch((error) => {
    console.error("Error saving form data:", error);
    alert("Error submitting form: " + error.message);
  });
}
