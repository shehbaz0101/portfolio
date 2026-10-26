import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Glance } from '@/components/sections/Glance';
import { Experience } from '@/components/sections/Experience';
import { Footer } from '@/components/Footer';
export default function Home() {
  return <><Nav/><main id="main" tabIndex={-1}><Hero/><Glance/><Experience/></main><Footer/></>;
}
