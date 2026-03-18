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

export const VITRINE_IMAGES = [
  "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c090be5f524?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop"
];