import React, { useContext, useEffect } from 'react'
import Contact from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/AuthContext'
import ContactContext from '../../context/contact/contactContext'

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { getContacts } = contactContext;
  
  useEffect(() =>  {
    authContext.loadUser();
    getContacts();
    //eslint-disable-next-line
  }, []); 

  return (  
    <div className='grid-2'>
      <div>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter/>
        <Contact/>
      </div>
    </div>
  )
}

export default Home
