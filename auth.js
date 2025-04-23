// auth.js

// সাইন আপ ফাংশন
function signUp(email, password) {
  console.log("সাইন আপ শুরু হয়েছে:", email); // ডিবাগ লগ

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("ইউজার সফলভাবে তৈরি হয়েছে:", user.email); // ডিবাগ লগ

      // ইমেইল ভেরিফিকেশন পাঠানো
      user.sendEmailVerification()
        .then(() => {
          console.log("ইমেইল ভেরিফিকেশন পাঠানো হয়েছে:", user.email); // ডিবাগ লগ
          alert("সাইন আপ সফল! দয়া করে আপনার ইমেইল ভেরিফাই করুন।");
          firebase.auth().signOut(); // সাইন আপের পর স্বয়ংক্রিয়ভাবে লগআউট
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("ইমেইল ভেরিফিকেশন পাঠাতে সমস্যা:", error); // ডিবাগ লগ
          alert("ইমেইল ভেরিফিকেশন পাঠাতে সমস্যা: " + error.message);
        });
    })
    .catch((error) => {
      console.error("সাইন আপ করতে সমস্যা:", error); // ডিবাগ লগ
      let errorMessage = "সাইন আপ করতে সমস্যা: ";
      if (error.code === "auth/email-already-in-use") {
        errorMessage += "এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে। দয়া করে অন্য ইমেইল ব্যবহার করুন।";
      } else if (error.code === "auth/weak-password") {
        errorMessage += "পাসওয়ার্ডটি খুব দুর্বল। দয়া করে আরও শক্তিশালী পাসওয়ার্ড দিন (কমপক্ষে ৬ অক্ষর)।";
      } else {
        errorMessage += error.message;
      }
      alert(errorMessage);
    });
}

// লগইন ফাংশন
function login(email, password) {
  console.log("লগইন শুরু হয়েছে:", email); // ডিবাগ লগ

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("ইউজার সফলভাবে লগইন করেছে:", user.email); // ডিবাগ লগ

      if (user.emailVerified) {
        console.log("ইমেইল ভেরিফাই করা আছে, ফর্ম পেজে যাচ্ছে..."); // ডিবাগ লগ
        window.location.href = "form.html";
      } else {
        console.log("ইমেইল ভেরিফাই করা নেই, লগআউট করা হচ্ছে..."); // ডিবাগ লগ
        alert("দয়া করে আপনার ইমেইল ভেরিফাই করুন।");
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      console.error("লগইন করতে সমস্যা:", error); // ডিবাগ লগ
      let errorMessage = "লগইন করতে সমস্যা: ";
      if (error.code === "auth/user-not-found") {
        errorMessage += "এই ইমেইল দিয়ে কোনো ইউজার পাওয়া যায়নি। দয়া করে সঠিক ইমেইল দিন।";
      } else if (error.code === "auth/wrong-password") {
        errorMessage += "পাসওয়ার্ড ভুল। দয়া করে সঠিক পাসওয়ার্ড দিন।";
      } else {
        errorMessage += error.message;
      }
      alert(errorMessage);
    });
}

// লগআউট ফাংশন
function logout() {
  console.log("লগআউট শুরু হয়েছে..."); // ডিবাগ লগ

  firebase.auth().signOut()
    .then(() => {
      console.log("ইউজার সফলভাবে লগআউট করেছে।"); // ডিবাগ লগ
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("লগআউট করতে সমস্যা:", error); // ডিবাগ লগ
      alert("লগআউট করতে সমস্যা: " + error.message);
    });
}

// ইউজার স্টেট চেক ফাংশন (প্রতিটি পেজে ব্যবহার করা হবে)
function checkUserState(redirectIfNotLoggedIn, redirectIfLoggedIn) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("ইউজার লগইন করা আছে:", user.email); // ডিবাগ লগ
      if (user.emailVerified) {
        console.log("ইমেইল ভেরিফাই করা আছে।"); // ডিবাগ লগ
        if (redirectIfLoggedIn) {
          window.location.href = redirectIfLoggedIn;
        }
      } else {
        console.log("ইমেইল ভেরিফাই করা নেই।"); // ডিবাগ লগ
        if (redirectIfNotLoggedIn) {
          alert("দয়া করে আপনার ইমেইল ভেরিফাই করুন।");
          firebase.auth().signOut();
          window.location.href = redirectIfNotLoggedIn;
        }
      }
    } else {
      console.log("ইউজার লগইন করা নেই।"); // ডিবাগ লগ
      if (redirectIfNotLoggedIn) {
        window.location.href = redirectIfNotLoggedIn;
      }
    }
  }, (error) => {
    console.error("ইউজার স্টেট চেক করতে সমস্যা:", error); // ডিবাগ লগ
    alert("ইউজার স্টেট চেক করতে সমস্যা: " + error.message);
  });
}

function resetPassword(email) {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("A password reset email has been sent to your email address.");
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.message);
      alert("Error sending password reset email: " + error.message);
    });
}
