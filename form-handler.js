function submitForm(data) {
  // ডাটা আলাদা করা
  const { name, phone, address } = data;

  // ডাটা ঠিক আছে কি না চেক করা
  if (!name || name.trim() === "") {
    alert("নাম খালি রাখা যাবে না। দয়া করে একটি নাম দিন।");
    return;
  }

  const phoneRegex = /^\d{10,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    alert("দয়া করে একটি বৈধ ফোন নম্বর দিন (১০-১৫ সংখ্যা)।");
    return;
  }

  if (!address || address.trim() === "") {
    alert("ঠিকানা খালি রাখা যাবে না। দয়া করে একটি ঠিকানা দিন।");
    return;
  }

  // ডাটা ঠিক করা
  const cleanData = {
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Firestore-এ ডাটা পাঠানো
  firebase.firestore().collection("forms").add(cleanData)
    .then(() => {
      const successMessage = `ফর্ম সফলভাবে সাবমিট করা হয়েছে!\n\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}`;
      alert(successMessage);

      // ফর্ম ক্লিয়ার করা
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
    })
    .catch((error) => {
      alert("ডাটা সেভ করতে সমস্যা: " + error.message);
    });
}
