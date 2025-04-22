function signup(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-up successful, send email verification
      sendVerificationEmail(userCredential.user);
    })
    .catch((error) => {
      console.error("Sign-up error:", error.message);
      alert("Sign-up failed: " + error.message);
    });
}

function sendVerificationEmail(user) {
  user.sendEmailVerification()
    .then(() => {
      alert("A verification email has been sent to your email address. Please verify your email to continue.");
      // Poll for email verification status
      const interval = setInterval(() => {
        user.reload().then(() => {
          if (user.emailVerified) {
            clearInterval(interval);
            console.log("Email verified:", user.email);
            // Redirect to form page after verification
            window.location.href = "form.html";
          }
        });
      }, 2000); // Check every 2 seconds
    })
    .catch((error) => {
      console.error("Error sending verification email:", error.message);
      alert("Error sending verification email: " + error.message);
    });
}

function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log("Login successful:", user.email);
        // Redirect to form page
        window.location.href = "form.html";
      } else {
        alert("Please verify your email before logging in.");
        firebase.auth().signOut(); // Log out if email is not verified
      }
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("Logout successful");
      // Redirect to index page
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      alert("Logout failed: " + error.message);
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
