import { useState } from "react";
import "../Styles/ContactPage.css";
import emailjs from "@emailjs/browser";
const ContactPage = ()=>{
  const [isSubmitted,setIsSubmitted] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
      try{ emailjs.sendForm(process.env.REACT_APP_SERVICE_ID || '',
                          process.env.REACT_APP_TEMPLATE_ID || '',
                          e.currentTarget, 
                          process.env.REACT_APP_PUBLIC_KEY);
                          setIsSubmitted(true);
        }catch(error){
                          window.alert("Error sending the emaill.");
                        }
        
   }
    return (
      <div className="page-container">

      
        <div className="contact-form-container">
          {
            isSubmitted ? (<>
              <p>Thank you for your message! We'll get back to you soon.</p>
            </>) : (<>
            
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email_from">Email:</label>
              <input type="email" id="email" name="email_from" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={6} required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
            </>)
          }
        </div>
        </div>
      );
}

export default ContactPage;