import React, { useEffect, useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";



const Register = () => {

  useEffect(() => {
    const container = document.getElementById('container');
    const overlayBtn = document.getElementById('overlayBtn');

    if (overlayBtn) {
      const handleOverlayClick = () => {
        container.classList.toggle('right-panel-active');

        overlayBtn.classList.remove('btnScaled');
        window.requestAnimationFrame(() => {
          overlayBtn.classList.add('btnScaled');
        });
      };

      overlayBtn.addEventListener('click', handleOverlayClick);

      return () => {
        overlayBtn.removeEventListener('click', handleOverlayClick);
      };
    }
  }, []);
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
 
    try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const storageRef = ref(storage, displayName);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/")
        } catch (err) {
          setErr(true);
        }
      };

    
 

return(
    <div className ="body">
    <div className="container" id="container">
    <div className="form-container sign-up-container">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
                <a href="https://www.facebook.com/" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="https://www.google.com/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="span">or use your email for registration</span>
            <div className="infield">
                <input className="input" type="text" placeholder="Name" name="displayName"/>
                <label></label>
            </div>
            <div className="infield">
                <input className="input" type="email" placeholder="Email" name="email"/>
                <label></label>
            </div>
            <div className="infield">
                <input className="input" type="password" placeholder="Password" name="password"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$" 
                title="Password must contain at least one digit, one lowercase and one uppercase letter, one special character, and be at least 8 characters long" required/>
                <label></label>
            </div>
            <div className="infield">
                <input style= {{display:"none"}} type="file" id="file"/>
                <label htmlFor="file" style= {{display:"flex", alignItems:"center", gap:"10px", color:"#8da4f1", fontSize:"12px", cursor:"pointer"}}>
                    <img src={Add} alt="" style={{width:"32px"}}></img>
                    <span> Add profile picture</span>
                </label>
            </div>
            <button className="button">Sign Up</button>
            {err && <span>Something went wrong</span>}
        </form>
    </div>
    <div className="form-container sign-in-container">
        <form className="form" onSubmit={loginSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
            <a href="https://www.facebook.com/" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="https://www.google.com/" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="span">or use your account</span>
            <div className="infield">
                <input className="input" type="email" placeholder="Email" name="email"/>
                <label></label>
            </div>
            <div className="infield">
                <input className="input" type="password" placeholder="Password" />
                <label></label>
            </div>
            <a href="https://www.google.com/" className="forgot">Forgot your password?</a>
            <button className="button">Sign In</button>
            {err && <span>Something went wrong</span>}
        </form>
    </div>
    <div className="overlay-container" id="overlayCon">
        <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h2>Have an account?</h2>
                <p className="paragraph">Login here with your registered email ID and password</p>
                <button className="button">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
                <h1>First time user?</h1>
                <p className="paragraph">Register with your email ID and begin your journey here </p>
                <button className="button"> Sign Up</button>
            </div>
        </div>
        <button id="overlayBtn"></button>
    </div>
</div>
</div>


)
}
export default Register;