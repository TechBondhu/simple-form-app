function submitForm(data) {
  console.log("ফর্ম থেকে পাওয়া ডাটা:", data); // ডিবাগ লগ

  const { name, phone, address } = data;

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

  const cleanData = {
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  console.log("Firestore-এ পাঠানোর জন্য ডাটা:", cleanData); // ডিবাগ লগ

  firebase.firestore().collection("forms").add(cleanData)
    .then(() => {
      console.log("ডাটা সফলভাবে সেভ হয়েছে!"); // ডিবাগ লগ
      const successMessage = `ফর্ম সফলভাবে সাবমিট করা হয়েছে!\n\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}`;
      alert(successMessage);

      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
    })
    .catch((error) => {
      console.error("ডাটা সেভ করতে সমস্যা:", error); // ডিবাগ লগ
      alert("ডাটা সেভ করতে সমস্যা: " + error.message);
    });
}
