function signup(email, password) {
  console.log("সাইনআপ শুরু হচ্ছে...");

  // Firebase Auth দিয়ে সাইনআপ
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("সাইনআপ সফল!", userCredential.user);

      // কোনো ভেরিফিকেশন চেক নেই, শুধু সাকসেস মেসেজ
      alert("সাইনআপ সফল! এখন লগইন করুন।");
    })
    .catch((error) => {
      console.error("সাইনআপে সমস্যা:", error);
      alert("সাইনআপে সমস্যা: " + error.message);
    });
}

// ফাংশনটা গ্লোবাল স্কোপে রাখা
window.signup = signup;

// ফর্ম সাবমিট ফাংশন (আগের মতোই রাখছি)
function submitForm(data) {
  console.log("ফর্ম থেকে পাওয়া ডাটা:", data);

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
    submittedAt: firebase.firestore.FieldValue.serverTimestamp() || new Date().toISOString()
  };

  console.log("Firestore-এ পাঠানোর জন্য ডাটা:", cleanData);

  const db = firebase.firestore();
  if (!db) {
    console.error("Firestore ইনিশিয়ালাইজ করা যায়নি!");
    alert("Firestore কানেকশনে সমস্যা।");
    return;
  }

  console.log("ডেটা পাঠানো শুরু হচ্ছে...");
  db.collection("forms").add(cleanData)
    .then(() => {
      console.log("ডাটা সফলভাবে সেভ হয়েছে!");
      const successMessage = `ফর্ম সফলভাবে সাবমিট করা হয়েছে!\n\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}`;
      alert(successMessage);

      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
    })
    .catch((error) => {
      console.error("ডাটা সেভ করতে সমস্যা:", error);
      alert("ডাটা সেভ করতে সমস্যা: " + error.message);
    });
}

window.submitForm = submitForm;
