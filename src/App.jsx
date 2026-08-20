import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import NavBar from './sections/NavBar';
import Hero from './sections/Hero';
import Portal from './sections/Portal';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Portal />
    </main>
  )
}

export default App
