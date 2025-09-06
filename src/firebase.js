// firebase authenticating configuration
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCksTdXCXw-3N1nkW5qkK3aKcy8vqMkKmg",
  authDomain: "netflix-clone-499c6.firebaseapp.com",
  projectId: "netflix-clone-499c6",
  storageBucket: "netflix-clone-499c6.firebasestorage.app",
  messagingSenderId: "249286826836",
  appId: "1:249286826836:web:7c8e0e095bc411dfc706c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize firebase authentication (from here we should write the codes , the codes before came from the site)
const auth = getAuth(app)

// configure the firestore for our database
const db = getFirestore(app)


// creating the functions

// sign up function
const signup = async (name , email , password)=> {
    try {
        // inside of try we will create the user in res , get the user information which is inside the user property and store it in user , then we will save it in our database
        const res = await createUserWithEmailAndPassword(auth , email , password)
        const user = res.user
        await addDoc(collection(db , 'user') , {
            // here we define the data that will be stored in user collection
            uid : user.uid ,
            name ,
            authProvider : 'local' ,
            email ,
        })
    } catch (error) {
        console.log(error)
        // normally the code will say "auth/invalid-credential" , but we don't want 'auth/' and we also want to replace '-' with space
        // remember that split returns a list and join returns a string
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


// login function
const login = async (email , password)=>{
    try {
        await signInWithEmailAndPassword(auth , email , password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


// logout function
const logout = ()=>{
    signOut(auth)
}

export {auth , db , login , signup , logout}