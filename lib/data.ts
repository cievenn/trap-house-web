// Fichier : lib/data.ts

export interface NewsType {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
  status: string;
}

export const NEWS_DATA: NewsType[] = [
  {
    id: 1,
    title: "TRAP HOUSE VOL. 1",
    date: "12 OCTOBRE",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1000&auto=format&fit=crop",
    description: "L'inauguration. Le début de l'élite. Line-up secret, show lumière inédit et ambiance garantie. L'accès est strictement réservé.",
    status: "COMPLET"
  },
  {
    id: 2,
    title: "MIDNIGHT SESSION",
    date: "31 OCTOBRE",
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=1000&auto=format&fit=crop",
    description: "Une édition spéciale Halloween. Basses profondes, fumée épaisse, néons abyssaux. Soyez prêts pour la purge.",
    status: "EN COURS"
  },
  {
    id: 3,
    title: "WINTER ELITE",
    date: "15 DÉCEMBRE",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    description: "Clôture de l'année en beauté. La quintessence du monde de la nuit, réunie dans un lieu tenu secret jusqu'à la dernière minute.",
    status: "À VENIR"
  },
];

export interface VitrineCardType {
  src: string;
  supertitle: string;
  volume: string;
  status: string;
  description: string;
}

export const VITRINE_DATA: VitrineCardType[] = [
  {
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 01",
    status: "Classified",
    description: "L'apogée de l'énergie underground. Une nuit classée secret défense où les règles ont été réécrites dans l'obscurité.",
  },
  {
    src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 02",
    status: "Classified",
    description: "La deuxième édition. Basses abyssales, lumières stroboscopiques et un line-up gardé secret jusqu'au dernier instant.",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 03",
    status: "Classified",
    description: "Une soirée à huis clos. L'accès, un privilège. L'expérience, une cicatrice sonore que vous porteriez à vie.",
  },
  {
    src: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 04",
    status: "Classified",
    description: "Le collectif au complet pour une nuit hors normes. Smoke machines, fog & art brutaliste dans un warehouse confidentiel.",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 05",
    status: "Classified",
    description: "Quand le son devient matière. Five heures de set ininterrompu, cinq cents initiés, zéro compromis sur l'intensité.",
  },
  {
    src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
    supertitle: "Archive",
    volume: "VOL. 06",
    status: "Classified",
    description: "L'édition la plus sombre. Un lieu abandonné, une acoustique parfaite. La légende est née cette nuit-là.",
  },
];