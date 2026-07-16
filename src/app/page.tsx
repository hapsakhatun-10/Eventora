import MusicBanner from "./components/MusicBanner";
import BannerIcon from "./components/BannerIcon";
import EventMarquee from "./components/EventMarquee";
import HowItWorks from "./components/HowItWorks";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <>
      <MusicBanner />
      <BannerIcon />
      <EventMarquee />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
