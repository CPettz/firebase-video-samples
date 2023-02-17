import "./styles.css";
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
  txtEmail,
  lblAuthState,
} from "./ui";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";

const fbConfig = {
  apiKey: "AIzaSyDfgb3G9MMrFvb-KrDfXZlYUTHyujgbOdw",
  authDomain: "top-library-8fd05.firebaseapp.com",
  projectId: "top-library-8fd05",
  storageBucket: "top-library-8fd05.appspot.com",
  messagingSenderId: "609789700914",
  appId: "1:609789700914:web:6fdf4404cfd9fe1c98452b",
};

const firebaseApp = initializeApp(fbConfig);
const auth = getAuth(firebaseApp);

// Connect app to the firebase emulator suite
connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

btnLogin.addEventListener("click", loginEmailPassword);

const createAccount = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

btnSignup.addEventListener("click", createAccount);

const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);

      hideLoginError();
    } else {
      showLoginForm();
      lblAuthState.innerHTML = "You're not loggined in.";
    }
  });
};

monitorAuthState();

const logout = async () => {
  await signOut(auth);
};

btnLogout.addEventListener("click", logout);

// // Login using email/password
// const loginEmailPassword = async () => {
//   const loginEmail = txtEmail.value;
//   const loginPassword = txtPassword.value;

//   // step 1: try doing this w/o error handling, and then add try/catch
//   await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

//   // step 2: add error handling
//   // try {
//   //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
//   // }
//   // catch(error) {
//   //   console.log(`There was an error: ${error}`)
//   //   showLoginError(error)
//   // }
// };

// // Create new account using email/password
// const createAccount = async () => {
//   const email = txtEmail.value;
//   const password = txtPassword.value;

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     console.log(`There was an error: ${error}`);
//     showLoginError(error);
//   }
// };

// // Monitor auth state
// const monitorAuthState = async () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user);
//       showApp();
//       showLoginState(user);

//       hideLoginError();
//       hideLinkError();
//     } else {
//       showLoginForm();
//       lblAuthState.innerHTML = `You're not logged in.`;
//     }
//   });
// };

// // Log out
// const logout = async () => {
//   await signOut(auth);
// };

// btnLogin.addEventListener("click", loginEmailPassword);
// btnSignup.addEventListener("click", createAccount);
// btnLogout.addEventListener("click", logout);

// connectAuthEmulator(auth, "http://localhost:9099");

// monitorAuthState();
