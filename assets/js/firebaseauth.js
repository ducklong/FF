// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMxUH4UKEGo5Skbf0Eow5Sk1hD15rN8nU",
  authDomain: "ff10-18bc0.firebaseapp.com",
  projectId: "ff10-18bc0",
  storageBucket: "ff10-18bc0.firebasestorage.app",
  messagingSenderId: "422953153428",
  appId: "1:422953153428:web:c95a265403dfeea37a9581",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const fullName = document.getElementById("fName").value;

  const findAgency = document.getElementById("lFind");

  const becomeAgency = document.getElementById("lBecome");
  const merchant = document.getElementById("lMerchant");

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(
    auth,
    email,
    phoneNumber,
    becomeAgency,
    findAgency
  )
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        fullName: fullName,
        findAgency: findAgency.checked,
        becomeAgency: becomeAgency.checked,
        phoneNumber: phoneNumber,
        merchant: merchant.checked,
        createDate: new Date(),
      };
      console.log(userData);
      showMessage("Thanks, We'll contact you ASAP", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(error);
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Please full fill to get contact by Us", "signUpMessage");
      }
    });
});
