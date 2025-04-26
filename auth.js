function login(email, password) {
  console.log("লগইন শুরু হচ্ছে...");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("লগইন সফল!", userCredential.user);
      // ইউজারের sender_id ফেচ করা
      firebase.firestore().collection('users')
        .where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const senderId = userData.sender_id;
            // Flask API-তে sender_id পাঠানো
            fetch('http://localhost:3000/set-user-id', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ senderId: senderId })
            })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'success') {
                console.log("sender_id Rasa-তে সেট করা হয়েছে:", senderId);
                alert("লগইন সফল! ফর্ম পেজে নিয়ে যাওয়া হচ্ছে...");
                window.location.href = "form.html";
              } else {
                alert("sender_id সেট করতে সমস্যা: " + data.message);
              }
            })
            .catch(error => {
              console.error("Flask API কল করতে সমস্যা:", error);
              alert("sender_id সেট করতে সমস্যা: " + error.message);
            });
          } else {
            alert("ইউজার ডেটা পাওয়া যায়নি!");
          }
        })
        .catch((error) => {
          console.error("Firestore থেকে ডেটা ফেচ করতে সমস্যা:", error);
          alert("ডেটা ফেচ করতে সমস্যা: " + error.message);
        });
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

// অথ স্টেট চেক
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("ইউজার লগইন করা আছে:", user.email);
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
