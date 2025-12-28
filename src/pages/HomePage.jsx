
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AnimatedGridSection from '@/components/AnimatedGridSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import WhySection from '@/components/WhySection';
import FirstStepsSection from '@/components/FirstStepsSection';
import VideosSlider from '@/components/VideosSlider';
import MonthlyThemeCarousel from '@/components/MonthlyThemeCarousel';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Egészségablak - Online tanfolyam platform</title>
        <meta name="description" content="Egészségügyi kisokos - Közel 70 videóból álló tanfolyami anyag, amelyet szakértőktől tanulhatsz." />
      </Helmet>
      
      {/* Updated background: removed bg-fixed to make it scroll with content */}
      <div 
        className="min-h-screen bg-[#343D8E] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/assets/kezdo-gfx-bg.jpg)' 
        }}
      >
        <Header />
        <main>
          <HeroSection />
          <AnimatedGridSection />
          <PartnersCarousel />
          <WhySection />
          <FirstStepsSection />
          <VideosSlider />
          <MonthlyThemeCarousel />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
