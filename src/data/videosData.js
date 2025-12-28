import { Brain, Stethoscope, Bus as Ambulance, BookPlus, Signpost, Pill, UserCheck, BrainCircuit, HeartPulse } from 'lucide-react';

export const categories = [
  { 
    id: 'egeszsegugyi-kisokos', 
    name: 'Egészségügyi kisokos', 
    icon: BookPlus, 
    theme: 'lilac-on-gray',
    description: 'Alapvető tudnivalók'
  },
  { 
    id: 'ellatasi-szintek', 
    name: 'Ellátási szintek, betegutak', 
    icon: Signpost, 
    theme: 'mint',
    description: 'Válassz jól!'
  },
  { 
    id: 'egeszsegmegorzes', 
    name: 'Egészségmegőrzés', 
    icon: HeartPulse, 
    theme: 'green',
    description: 'Megelőzés és életmód'
  },
  { 
    id: 'gyogyszertar', 
    name: 'Gyógyszertár', 
    icon: Pill, 
    theme: 'lilac-on-gray',
    description: 'Gyógyszerismeret'
  },
  { 
    id: 'alapellatas', 
    name: 'Alapellátás', 
    icon: UserCheck, 
    theme: 'gray',
    description: 'Háziorvos és védőnő'
  },
  { 
    id: 'surgossegi-tudnivalok', 
    name: 'Sürgősségi tudnivalók', 
    icon: Ambulance, 
    theme: 'mint',
    description: 'Mikor és hogyan cselekedjünk'
  },
  { 
    id: 'mutetek', 
    name: 'Műtétek', 
    icon: Stethoscope, 
    theme: 'deep-blue',
    description: 'Felkészülés és felépülés'
  },
  { 
    id: 'fuggosegekrol', 
    name: 'Függőségekről', 
    icon: Brain, 
    theme: 'red',
    description: 'Segítség és információk'
  },
  { 
    id: 'mentalis-zavarok', 
    name: 'Mentális zavarok', 
    icon: BrainCircuit, 
    theme: 'deep-blue',
    description: 'Lelki egyensúly'
  },
];

export const videosData = [
  {
    id: 'video-1',
    title: 'Hogyan előzzük meg a bajt?',
    speaker: 'Jelena Lánger',
    category: 'Egészségmegőrzés',
    tag: 'Megelőzés',
    description: 'A videó leírása kerül ide. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum a nulla id varius.',
    thumbnail: '/assets/video/video-1-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-1-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '12:34',
    resources: [
      { type: 'web', label: 'Szakértőnk weboldala' },
      { type: 'web', label: 'A kedvenc menüm' },
      { type: 'web', label: 'Mentes étrend' },
      { type: 'pdf', label: '4-5 db mintaétrend pdf' }
    ]
  },
  {
    id: 'video-2',
    title: 'Hogyan hívj mentőt',
    speaker: 'König Róbert',
    category: 'Sürgősségi tudnivalók',
    tag: 'Sürgősségi tudnivalók',
    description: 'Tudj meg mindent a mentőhívás helyes módjáról és a sürgősségi ellátásról.',
    thumbnail: '/assets/video/video-2-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-2-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:45'
  },
  {
    id: 'video-3',
    title: 'Mozogj rendszeresen!',
    speaker: 'Jelena Lánger',
    category: 'Egészségmegőrzés',
    tag: 'Mozgás',
    description: 'A rendszeres mozgás fontossága és hatásai az egészségre.',
    thumbnail: '/assets/video/video-3-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-3-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '15:20'
  },
  {
    id: 'video-4',
    title: 'Táplálkozási alapok',
    speaker: 'König Róbert',
    category: 'Egészségmegőrzés',
    tag: 'Táplálkozás',
    description: 'Ismerd meg az egészséges táplálkozás alapelveit.',
    thumbnail: '/assets/video/video-4-thmb.jpg',
    portraitUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-4-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '18:30'
  },
  {
    id: 'video-5',
    title: 'Alapellátás kisokos',
    speaker: 'Jelena Lánger',
    category: 'Alapellátás',
    description: 'További információk az alapellátásról.',
    thumbnail: '/assets/video/video-5-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-5-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '10:15'
  },
  {
    id: 'video-6',
    title: 'Alvás és pihenés',
    speaker: 'König Róbert',
    category: 'Egészségmegőrzés',
    description: 'Az alvás szerepe az egészségmegőrzésben.',
    thumbnail: '/assets/video/video-6-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/6622ce00cf720bad218afc370d96f9d8.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '14:50'
  },
  {
    id: 'video-7',
    title: 'Kinek a mentőt hívjuk?',
    speaker: 'König Róbert',
    category: 'Sürgősségi tudnivalók',
    description: 'Mikor és hogyan hívjunk mentőt helyesen.',
    thumbnail: '/assets/video/video-7-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-6-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '9:30'
  },
  {
    id: 'video-8',
    title: 'Megelőzés fontossága',
    speaker: 'Jelena Lánger',
    category: 'Egészségmegőrzés',
    description: 'Miért olyan fontos a megelőzés.',
    thumbnail: '/assets/video/video-8-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/23e729705247aa280f66e8de9b511c98.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '11:45'
  },
  {
    id: 'video-9',
    title: 'Stressz kezelés',
    speaker: 'König Róbert',
    category: 'Mentális zavarok',
    description: 'Hogyan kezeljük hatékonyan a stresszt.',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-1-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '16:20'
  },
  {
    id: 'video-10',
    title: 'Gyógyszerek használata',
    speaker: 'Jelena Lánger',
    category: 'Gyógyszertár',
    description: 'Fontos tudnivalók a gyógyszerek használatáról.',
    thumbnail: '/assets/video/video-9-thmb.jpg',
    portraitUrl: '/assets/video/video-1-bg.jpg?q=100&w=2574&auto=format&fit=crop',
    overlayUrl: '/assets/video/video-3-overlay.png',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '13:10'
  }
];
