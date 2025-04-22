function signup(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-up successful, user is automatically logged in
      console.log("Sign-up successful:", userCredential.user.email);
      // Redirect to form page
      window.location.href = "form.html";
    })
    .catch((error) => {
      console.error("Sign-up error:", error.message);
      alert("Sign-up failed: " + error.message);
    });
}

function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful
      console.log("Login successful:", userCredential.user.email);
      // Redirect to form page
      window.location.href = "form.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(() => {
      // Logout successful
      console.log("Logout successful");
      // Redirect to index page
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      alert("Logout failed: " + error.message);
    });
}
