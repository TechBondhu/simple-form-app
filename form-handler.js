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

  // If validation passes, show success message
  alert("Form submitted successfully!\n\nName: " + name + "\nPhone: " + phone + "\nAddress: " + address);

  // Optionally, clear the form (you can uncomment this if needed)
  // document.getElementById("name").value = "";
  // document.getElementById("phone").value = "";
  // document.getElementById("address").value = "";

  // Future implementation: Save to Firebase Firestore
  // Example (commented out):
  /*
  firebase.firestore().collection("applications").add({
    name: name,
    phone: phone,
    address: address,
    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Form submitted and saved successfully!");
  })
  .catch((error) => {
    console.error("Error saving form data:", error);
    alert("Error submitting form: " + error.message);
  });
  */
}
