
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-[#3B4A8C] to-[#4A5FA8] border-t border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-white">
            <p className="text-lg font-medium mb-2">Süti beállítások</p>
            <p className="text-white/80 text-sm">
              Weboldalunk sütiket használ a felhasználói élmény javítása érdekében. 
              A folytatással elfogadod a sütik használatát.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Elutasítás
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-[#7FD8BE] hover:bg-[#6BC7AD] text-white"
            >
              Elfogadás
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
