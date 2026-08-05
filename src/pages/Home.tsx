import { type JSX } from 'react/jsx-runtime'
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import Trending_products from '../components/Trending_products';
import Footer from '../components/Footer';
import { header } from 'framer-motion/client';
const Home = (): JSX.Element => {
  const fetchProfile = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:3000/fetch-user', {
        headers:{
          authorization: `Bearer ${token}`,
        }
      })
      console.log(res.data.user);

    } catch (err) {
      console.log(err);
    }

  }
  useEffect(()=>{
    fetchProfile();
  },[])
  return (
    <>
      <Navbar />
      <Herosection />
      <Trending_products />
      <Footer />
    </>
  )
}

export default Home