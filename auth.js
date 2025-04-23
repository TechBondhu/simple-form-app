function login(email, password) {
  console.log("লগইন শুরু হচ্ছে...");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("লগইন সফল!", userCredential.user);
      alert("লগইন সফল! ফর্ম পেজে নিয়ে যাওয়া হচ্ছে...");
      window.location.href = "form.html";
    })
    .catch((error) => {
      console.error("লগইনে সমস্যা:", error);
      alert("লগইনে সমস্যা: " + error.message);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("লগআউট সফল!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("লগআউটে সমস্যা:", error);
      alert("লগআউটে সমস্যা: " + error.message);
    });
}

// ফাংশনগুলো গ্লোবাল স্কোপে রাখা
window.login = login;
window.logout = logout;

// অথ স্টেট চেক (ভেরিফিকেশন চেক বন্ধ)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("ইউজার লগইন করা আছে:", user.email);
    // কোনো ভেরিফিকেশন চেক নেই
    if (window.location.pathname.includes("index.html") || window.location.pathname.includes("signup.html") || window.location.pathname.includes("login.html")) {
      window.location.href = "form.html";
    }
  } else {
    console.log("কোনো ইউজার লগইন করা নেই।");
    if (window.location.pathname.includes("form.html")) {
      window.location.href = "index.html";
    }
  }
});
