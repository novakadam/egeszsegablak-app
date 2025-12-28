
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Rólunk - Egészségablak</title>
        <meta name="description" content="Tudj meg többet az Egészségablak platformról és küldetésünkről." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-[#3B4A8C] via-[#4A5FA8] to-[#3B4A8C]">
        <Header />
        
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-8 text-center">Rólunk</h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-white/90 space-y-6">
              <p className="text-lg leading-relaxed">
                Az Egészségablak platform célja, hogy mindenki számára elérhető, szakértői tudást nyújtson az egészségmegőrzés területén.
              </p>
              
              <p className="text-lg leading-relaxed">
                Közel 70 videóból álló tanfolyami anyagunk szakértőktől származik, és átfogó képet ad a modern egészségügyi gyakorlatokról.
              </p>
              
              <p className="text-lg leading-relaxed">
                Hiszünk abban, hogy a megelőzés kulcsa a tudás, és ezt szeretnénk elérhetővé tenni mindenki számára.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
