import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu, X, ShoppingBag, ArrowDown, Plus, Minus,
  Flame, MapPin, ChevronRight, ChevronLeft, Trash2, Check, CheckSquare, MessageCircle, ArrowLeft, CreditCard, ShieldCheck, Cookie, Instagram
} from 'lucide-react';
import { TermsModal } from './Componentes/TermsModal';

/* ============================================================
   IMPORTACIÓN DEL LOGO
   ============================================================ */
import foto1Img from './assets/foto1.jpeg';
const LOGO_URL = foto1Img;

/* ============================================================
   CONFIGURACIÓN Y CONSTANTES
   ============================================================ */
const HORARIO_APERTURA = 18; // 6 PM
const HORARIO_CIERRE = 1;    // 1 AM

const SALSAS_DISPONIBLES = [
  'Salsa de Ajo de la Casa',
  'Salsa Tártara Especial',
  'Salsa BBQ Ahumada', 
  'Salsa de Queso Cheddar',
  'Salsa Rosada',
  'Salsa de Piña',
  'Chimichurri Artesanal', 
  'Salsa Búfalo Picante'
];

const ADICIONALES_EXTRA = [
  { name: 'Tocineta extra', price: 4000 },
  { name: 'Queso fundido extra', price: 5000 },
  { name: 'Huevo de codorniz (x5)', price: 3000 },
  { name: 'Chicharrón extra', price: 6000 }
];

const COSTO_DOMICILIO = 5000;
const DIRECCION_LOCAL = "Cl. 1a Sur #389, Buenaventura, Valle del Cauca";
const INSTAGRAM_URL = "https://www.instagram.com/_comelones?igsh=MTd1M3RmcDJuNWk4NQ==";

const PRODUCTS = [
  {
    id: 'salchipapa-tradicional-amarilla',
    name: 'LA CLÁSICA',
    category: 'Clásicos',
    tagline: 'Crujiente, jugosa y con el auténtico toque de la papa amarilla criolla',
    subtitle: 'Papa amarilla 100% artesanal · Salchicha ranchera · Queso mozzarella fundido · Salsa de ajo de la casa',
    price: 22000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-toocineta-chicharron',
    name: 'LA PODEROSA MX',
    category: 'Especiales',
    tagline: 'Doble porción de papa amarilla con toppings explosivos',
    subtitle: 'Papa amarilla criolla · Trocitos de tocino ahumado · Chicharrón crujiente · Baño de cheddar caliente',
    price: 29000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-mixta-desmechada',
    name: 'LA MONSTRUO',
    category: 'Para Compartir',
    tagline: 'La combinación definitiva de carnes jugosas y papa amarilla dorada',
    subtitle: 'Papa amarilla artesanal · Carne desmechada al jugo · Pollo desmenuzado · Maíz tierno · Salsas',
    price: 34000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-bbq-crunch',
    name: 'LA BBQ CRUNCH',
    category: 'Clásicos',
    tagline: 'Un toque ahumado y dulce que te vuela la cabeza',
    subtitle: 'Papa amarilla criolla · Pollo crispy bañado en salsa BBQ artesanal · Cebolla crujiente · Queso fundido',
    price: 27000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-ranchera-surema',
    name: 'LA RANCHERA SUPREMA',
    category: 'Clásicos',
    tagline: 'Doble salchicha premium ahumada con maíz dulce',
    subtitle: 'Papa amarilla · Salchicha suizo-alemana · Maíz tierno salteado en mantequilla · Salsa tártara especial',
    price: 25000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-costena-suero',
    name: 'LA COSTEÑA',
    category: 'Especiales',
    tagline: 'El sabor tradicional con suero costeño y queso costeño rayado',
    subtitle: 'Papa amarilla artesanal · Butifarra artesanal asada · Suero costeño original · Queso costeño',
    price: 26000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-mexicana-nachos',
    name: 'LA MEXICANA',
    category: 'Especiales',
    tagline: 'Con un toque picante y guacamole fresco',
    subtitle: 'Papa amarilla · Carne molida sazonada estilo tex-mex · Totopos crujientes · Guacamole · Jalapeños',
    price: 31000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-cuatro-quesos',
    name: 'LA 4 QUESOS',
    category: 'Especiales',
    tagline: 'Una avalancha de quesos fundidos para los verdaderos amantes del queso',
    subtitle: 'Papa amarilla criolla · Mozzarella · Cheddar · Queso azul · Parmesano gratinado · Tocineta',
    price: 33000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-hawaiana-dulce',
    name: 'LA HAWAIANA',
    category: 'Clásicos',
    tagline: 'La mezcla perfecta entre lo dulce de la piña y lo salado',
    subtitle: 'Papa amarilla · Jamón ahumado en cubos · Piña calada al caramelo · Queso mozzarella fundido',
    price: 24000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-chorizo-argentino',
    name: 'LA ARGENTA',
    category: 'Especiales',
    tagline: 'Acompañada de auténtico chorizo argentino y chimichurri casero',
    subtitle: 'Papa amarilla artesanal · Rodajas de chorizo argentino · Chimichurri fresco · Queso provolone',
    price: 28000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-tRUFADA-parmesano',
    name: 'LA TRUFADA',
    category: 'Especiales',
    tagline: 'Un toque gourmet exclusivo para paladares exigentes',
    subtitle: 'Papa amarilla · Aceite de trufa blanca · Lluvia de queso parmesano estacionado · Perejil fresco',
    price: 32000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-búfalo-picante',
    name: 'LA BÚFALO SPICY',
    category: 'Especiales',
    tagline: 'Para los que disfrutan el picante con mucho carácter',
    subtitle: 'Papa amarilla · Tiritas de pollo apanado en salsa búfalo picante · Aderezo de queso azul',
    price: 27000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-vegetariana-huerta',
    name: 'LA DE LA HUERTA (VEG)',
    category: 'Especiales',
    tagline: 'Cargada de vegetales frescos y salchicha a base de plantas',
    subtitle: 'Papa amarilla artesanal · Salchicha veggie · Champiñones salteados · Maíz tierno · Guacamole',
    price: 26000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-volcanica-chedar',
    name: 'EL VOLCÁN DE CHEDDAR',
    category: 'Para Compartir',
    tagline: 'Bañada en una piscina hirviendo de queso cheddar y tocineta crujiente',
    subtitle: 'Papa amarilla · Baño masivo de cheddar espeso · Trocitos crujientes de tocineta ahumada',
    price: 30000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salchipapa-la-imperial-mariscos',
    name: 'LA IMPERIAL',
    category: 'Para Compartir',
    tagline: 'Una combinación audaz y marina directo a tu mesa',
    subtitle: 'Papa amarilla criolla · Camarones al ajillo salteados · Queso fundido · Salsa rosada especial',
    price: 38000,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
  },
];

const WHATSAPP_NUMBER = '573153651797';

const NAV_LINKS = [
  { label: 'El Menú', href: '#menu' },
  { label: 'Ubicación', href: '#contacto' },
];

export interface AdicionalItem {
  name: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  product: typeof PRODUCTS[0];
  quantity: number;
  salsasSeleccionadas: string[];
  adicionalesSeleccionados: AdicionalItem[];
  nota: string;
}

const customStyles = `
html {
  scroll-behavior: smooth;
}
`;

function StatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const isCurrentlyOpen = hour >= HORARIO_APERTURA || hour < HORARIO_CIERRE;
      setIsOpen(isCurrentlyOpen);
    };
    checkStatus();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#12141d] border border-orange-500/20">
      <div className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      <span className="text-[10px] font-black uppercase tracking-wider text-gray-300">
        {isOpen ? 'Abierto' : 'Cerrado'}
      </span>
    </div>
  );
}

function Navbar({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#06070a] border-b border-orange-500/20 shadow-lg' : 'bg-[#06070a]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-500/40 bg-black">
            <img src={LOGO_URL} alt="Logo Comelones" className="h-full w-full object-cover object-center scale-[1.7]" />
          </div>
          <div>
            <span className="font-black text-xl tracking-widest text-orange-500">COMELONES</span>
            <span className="block text-[8px] tracking-[0.25em] uppercase text-orange-400 font-medium">Salchipapas Artesanales</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-orange-400 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <StatusIndicator />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenCart} 
            className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2 text-xs font-black text-black shadow-md cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> 
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-black text-orange-400 border border-orange-500">
                {cartCount}
              </span>
            )}
          </button>
          
          <button onClick={() => setOpen((v) => !v)} className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-[#12141d] text-orange-400 cursor-pointer" aria-label="Menú">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-orange-500/20 bg-[#06070a] px-5 py-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-800">
            <span className="text-xs text-gray-400 uppercase font-bold">Estado:</span>
            <StatusIndicator />
          </div>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-orange-400">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); onOpenCart(); }} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 py-3 text-xs font-black text-black cursor-pointer">
            <ShoppingBag className="h-4 w-4" /> Ver Carrito ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeFeatured = PRODUCTS[currentIndex];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION_LOCAL)}`;

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center bg-[#06070a] pt-12 pb-20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.1]">
            Salchipapas <br />
            <span className="text-orange-500">
              Brutales y Exclusivas
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Arma tu pedido eligiendo entre más de 15 opciones únicas. Personaliza tus salsas favoritas y añade ingredientes extra al gusto.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-2xl bg-[#12141d] border border-orange-500/20 text-left hover:border-orange-500/60 transition-all group cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-400">Ubicación física (Ver mapa)</span>
                <span className="text-xs text-gray-200 font-medium leading-snug">{DIRECCION_LOCAL}</span>
              </div>
            </a>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#12141d] border border-orange-500/20 text-left">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-400">Métodos de pago</span>
                <span className="text-xs text-gray-200 font-medium leading-snug">Nequi · Bancolombia · Pago al recibir</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button onClick={onOpenMenu} className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 px-7 py-3.5 text-sm font-black text-black shadow-lg cursor-pointer">
              <Flame className="h-4 w-4 fill-black" /> Ver Menú y Pedir
            </button>
            <a href="#menu" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-gray-800 bg-[#12141d] px-6 py-3.5 text-xs font-bold text-gray-300 hover:text-orange-400">
              Explorar Catálogo <ArrowDown className="h-3.5 w-3.5 text-orange-500" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-[#12141d] shadow-2xl aspect-square flex flex-col justify-between">
            <div className="absolute inset-0">
              <img 
                key={activeFeatured.id} 
                src={activeFeatured.image} 
                alt={activeFeatured.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-black/30" />
            </div>

            <div className="relative z-10 p-4 flex items-center justify-between">
              <span className="bg-black/80 border border-orange-500/30 text-orange-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Destacado {currentIndex + 1}/4
              </span>
              <div className="flex gap-1.5">
                <button onClick={() => setCurrentIndex((prev) => (prev - 1 + 4) % 4)} className="h-7 w-7 rounded-full bg-black/80 border border-gray-800 flex items-center justify-center text-gray-300 cursor-pointer">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setCurrentIndex((prev) => (prev + 1) % 4)} className="h-7 w-7 rounded-full bg-black/80 border border-gray-800 flex items-center justify-center text-gray-300 cursor-pointer">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="relative z-10 p-5 space-y-1 bg-gradient-to-t from-[#090a0f] to-transparent">
              <div className="flex items-center justify-between">
                <p className="text-lg font-black text-white uppercase tracking-wide">{activeFeatured.name}</p>
                <span className="text-amber-400 font-black text-sm">${activeFeatured.price.toLocaleString('es-CO')}</span>
              </div>
              <p className="text-[11px] text-gray-400 line-clamp-1">{activeFeatured.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ onOpenCustomize }: { onOpenCustomize: (product: typeof PRODUCTS[0]) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Clásicos', 'Especiales', 'Para Compartir'];

  const filteredProducts = selectedCategory === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="menu" className="bg-[#06070a] py-24 sm:py-32 text-white relative border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Nuestro Menú</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Escoge tu comelón</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Selecciona una variedad y personaliza tus salsas al instante.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-black shadow-md'
                  : 'bg-[#12141d] text-gray-400 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#0d0f17] p-5 shadow-lg"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl aspect-square bg-black mb-4 border border-gray-800">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">{prod.category}</p>
                <h3 className="text-xl font-black text-white mt-0.5 uppercase">{prod.name}</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{prod.tagline}</p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Precio</span>
                  <span className="text-xl font-black text-white">${prod.price.toLocaleString('es-CO')} <span className="text-[10px] text-orange-400">{prod.currency}</span></span>
                </div>
                <button 
                  onClick={() => onOpenCustomize(prod)} 
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2.5 text-xs font-black text-black shadow-md active:scale-95 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Pedir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBanner({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <section id="contacto" className="bg-[#06070a] py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 p-8 sm:p-12 text-center text-black shadow-xl">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="bg-black text-orange-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">Servicio a Domicilio</span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
              ¿Antojo nocturno? Pídelo ya
            </h2>
            <p className="font-medium text-black/80 text-xs sm:text-sm">
              Selecciona tus salsas favoritas y haz tu pedido directamente por WhatsApp de forma rápida.
            </p>
            <div className="pt-2">
              <button onClick={onOpenMenu} className="inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3 text-xs font-black text-white shadow-lg active:scale-95 cursor-pointer">
                <ShoppingBag className="h-4 w-4 text-orange-400" /> Ver Menú y Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-[#040507] text-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-500/30 bg-black">
            <img src={LOGO_URL} alt="Logo Comelones" className="h-full w-full object-cover object-center scale-[1.7]" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider text-orange-500">COMELONES</span>
            <p className="text-[10px] text-gray-500">Salchipapas con papa amarilla auténtica.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-400 transition-colors bg-[#12141d] px-4 py-2 rounded-xl border border-orange-500/20"
          >
            <Instagram className="h-4 w-4 text-orange-400" />
            <span>Síguenos en Instagram</span>
          </a>
        </div>
        
        <p className="text-[10px] text-gray-600">© {new Date().getFullYear()} COMELONES. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function CustomizeModal({ 
  product, 
  onClose, 
  onAddCustomizedToCart 
}: { 
  product: typeof PRODUCTS[0] | null; 
  onClose: () => void; 
  onAddCustomizedToCart: (product: typeof PRODUCTS[0], salsas: string[], adicionales: AdicionalItem[], nota: string, cantidad: number) => void;
}) {
  const [salsasSeleccionadas, setSalsasSeleccionadas] = useState<string[]>(['Salsa de Ajo de la Casa']);
  const [adiciones, setAdiciones] = useState<AdicionalItem[]>([]);
  const [nota, setNota] = useState('');
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (product) {
      setSalsasSeleccionadas(['Salsa de Ajo de la Casa']);
      setAdiciones([]);
      setNota('');
      setCantidad(1);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const toggleSalsa = (salsa: string) => {
    setSalsasSeleccionadas((prev) => 
      prev.includes(salsa) ? prev.filter((s) => s !== salsa) : [...prev, salsa]
    );
  };

  const handleToggleAllSalsas = () => {
    if (salsasSeleccionadas.length === SALSAS_DISPONIBLES.length) {
      setSalsasSeleccionadas([]);
    } else {
      setSalsasSeleccionadas([...SALSAS_DISPONIBLES]);
    }
  };

  const toggleAdicion = (ad: AdicionalItem) => {
    setAdiciones((prev) => {
      const exists = prev.some(item => item.name === ad.name);
      if (exists) {
        return prev.filter(item => item.name !== ad.name);
      } else {
        return [...prev, ad];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomizedToCart(product, salsasSeleccionadas, adiciones, nota, cantidad);
    onClose();
  };

  const areAllSelected = salsasSeleccionadas.length === SALSAS_DISPONIBLES.length;
  const totalAdicionales = adiciones.reduce((acc, item) => acc + item.price, 0);
  const precioUnitarioTotal = product.price + totalAdicionales;
  const precioTotalFinal = precioUnitarioTotal * cantidad;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90" role="dialog">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-orange-500/30 bg-[#12141d] text-white shadow-2xl p-6 sm:p-7">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-gray-400 hover:bg-orange-500 hover:text-black cursor-pointer">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3.5 border-b border-gray-800 pb-4 mb-5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-black border border-orange-500/20">
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Personaliza tu plato</span>
            <p className="font-black text-lg uppercase text-white">{product.name}</p>
            <p className="text-xs text-amber-400 font-bold mt-0.5">${product.price.toLocaleString('es-CO')} {product.currency}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                Elige tus Salsas <span className="text-orange-400 text-[9px]">(múltiples)</span>
              </label>
              
              <button
                type="button"
                onClick={handleToggleAllSalsas}
                className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 cursor-pointer"
              >
                <CheckSquare className="h-3 w-3" />
                {areAllSelected ? 'Quitar todas' : 'Todas'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SALSAS_DISPONIBLES.map((salsa) => {
                const isSelected = salsasSeleccionadas.includes(salsa);
                return (
                  <button
                    key={salsa}
                    type="button"
                    onClick={() => toggleSalsa(salsa)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium cursor-pointer ${
                      isSelected 
                        ? 'border-orange-500 bg-orange-500/15 text-white' 
                        : 'border-gray-800 bg-black/40 text-gray-400'
                    }`}
                  >
                    <span className="truncate pr-2">{salsa}</span>
                    <div className={`h-4 w-4 shrink-0 rounded flex items-center justify-center border ${isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'border-gray-700 bg-black'}`}>
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 block">
              Adiciones Extra <span className="text-orange-400 text-[9px]">(opcional)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADICIONALES_EXTRA.map((ad) => {
                const isSelected = adiciones.some(a => a.name === ad.name);
                return (
                  <button
                    key={ad.name}
                    type="button"
                    onClick={() => toggleAdicion(ad)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium cursor-pointer ${
                      isSelected 
                        ? 'border-orange-500 bg-orange-500/15 text-white' 
                        : 'border-gray-800 bg-black/40 text-gray-400'
                    }`}
                  >
                    <span className="truncate pr-2">{ad.name}</span>
                    <span className="font-bold text-orange-400 shrink-0">+${ad.price.toLocaleString('es-CO')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Notas o instrucciones <span className="text-gray-500 lowercase">(opcional)</span>
            </label>
            <input 
              type="text" 
              placeholder="Ej. Salsas aparte, sin cebolla..." 
              value={nota} 
              onChange={(e) => setNota(e.target.value)} 
              className="w-full rounded-xl border border-gray-700 bg-black px-3.5 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none" 
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">Cantidad</span>
            <div className="flex items-center gap-3 bg-black border border-gray-700 rounded-xl px-2.5 py-1">
              <button type="button" onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="h-6 w-6 flex items-center justify-center rounded-lg bg-gray-800 text-white cursor-pointer"><Minus className="h-3 w-3" /></button>
              <span className="font-bold text-xs w-5 text-center">{cantidad}</span>
              <button type="button" onClick={() => setCantidad(cantidad + 1)} className="h-6 w-6 flex items-center justify-center rounded-lg bg-gray-800 text-white cursor-pointer"><Plus className="h-3 w-3" /></button>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 py-3.5 text-xs font-black text-black shadow-md active:scale-95 cursor-pointer">
            <ShoppingBag className="h-4 w-4" /> Agregar al Carrito · ${precioTotalFinal.toLocaleString('es-CO')}
          </button>
        </form>
      </div>
    </div>
  );
}

function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[]; 
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [detalles, setDetalles] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { 
      document.removeEventListener('keydown', onKey); 
      document.body.style.overflow = ''; 
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotalProductos = cart.reduce((acc, item) => {
    const adicionalesTotal = item.adicionalesSeleccionados.reduce((sum, ad) => sum + ad.price, 0);
    return acc + ((item.product.price + adicionalesTotal) * item.quantity);
  }, 0);

  const totalGeneral = subtotalProductos + (cart.length > 0 ? COSTO_DOMICILIO : 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let itemsText = cart.map(item => {
      const adicionalesTotal = item.adicionalesSeleccionados.reduce((sum, ad) => sum + ad.price, 0);
      const precioItemTotal = (item.product.price + adicionalesTotal) * item.quantity;

      let salsasStr = item.salsasSeleccionadas.length > 0 ? `\n    └ Salsas: ${item.salsasSeleccionadas.join(', ')}` : '';
      let adicStr = item.adicionalesSeleccionados.length > 0 ? `\n    └ Adiciones: ${item.adicionalesSeleccionados.map(a => `${a.name} (+$${a.price.toLocaleString('es-CO')})`).join(', ')}` : '';
      let notaStr = item.nota ? `\n    └ Nota: ${item.nota}` : '';

      return `🔥 *${item.quantity}x* *${item.product.name}* - $${precioItemTotal.toLocaleString('es-CO')} COP${salsasStr}${adicStr}${notaStr}`;
    }).join('\n\n');

    const mensaje = encodeURIComponent(
      `¡Hola, Comelones! 👋 Quiero hacer este pedido:\n\n` +
      `${itemsText}\n\n` +
      `🛵 *Domicilio:* $${COSTO_DOMICILIO.toLocaleString('es-CO')} COP\n` +
      `💰 *Total a pagar (incluye domicilio): $${totalGeneral.toLocaleString('es-CO')} COP*\n\n` +
      `📍 *Datos de Entrega:*\n` +
      `• Nombre: ${nombre}\n` +
      `• Teléfono: ${telefono}\n` +
      `• Dirección: ${direccion}\n` +
      `${detalles ? `• Indicaciones: ${detalles}\n` : ''}\n` +
      `💳 *Métodos de pago aceptados:* Nequi, Bancolombia o Pago al recibir\n\n` +
      `¿Me confirman el pedido por favor?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-end" role="dialog">
      <div className="fixed inset-0 bg-black/90" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-[#12141d] border-l border-orange-500/20 text-white shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-orange-400" />
            <h3 className="font-black text-lg uppercase tracking-wider">Tu Carrito</h3>
          </div>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-gray-400 hover:bg-orange-500 hover:text-black cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 py-5 space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="h-12 w-12 text-gray-700 mx-auto" />
              <p className="text-gray-400 text-sm font-bold">Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-md cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Seguir Comprando
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const adicionalesTotal = item.adicionalesSeleccionados.reduce((sum, ad) => sum + ad.price, 0);
                const precioTotalItem = (item.product.price + adicionalesTotal) * item.quantity;

                return (
                  <div key={item.cartId} className="flex flex-col gap-2 bg-black border border-gray-800 p-3 rounded-xl">
                    <div className="flex items-center justify-between gap-3">
                      <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-xs uppercase truncate text-white">{item.product.name}</p>
                        <p className="text-xs text-orange-400 font-bold">${precioTotalItem.toLocaleString('es-CO')}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-black border border-gray-800 rounded-lg px-2 py-0.5">
                        <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="h-5 w-5 flex items-center justify-center text-gray-400 cursor-pointer"><Minus className="h-3 w-3" /></button>
                        <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="h-5 w-5 flex items-center justify-center text-gray-400 cursor-pointer"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => onRemoveItem(item.cartId)} className="text-gray-500 hover:text-red-400 p-1 cursor-pointer" title="Eliminar">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {(item.salsasSeleccionadas.length > 0 || item.adicionalesSeleccionados.length > 0 || item.nota) && (
                      <div className="text-[10px] text-gray-400 bg-orange-500/5 border border-orange-500/10 px-2 py-1.5 rounded-md space-y-0.5">
                        {item.salsasSeleccionadas.length > 0 && (
                          <p><span className="font-bold text-orange-400">Salsas:</span> {item.salsasSeleccionadas.join(', ')}</p>
                        )}
                        {item.adicionalesSeleccionados.length > 0 && (
                          <p><span className="font-bold text-orange-400">Adiciones:</span> {item.adicionalesSeleccionados.map(a => a.name).join(', ')}</p>
                        )}
                        {item.nota && (
                          <p className="italic text-gray-300">Nota: {item.nota}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2">
                <button 
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 py-2.5 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Seguir Comprando
                </button>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <form onSubmit={handleSendWhatsApp} className="space-y-3.5 pt-4 border-t border-gray-800">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-gray-400">
                <span>Subtotal productos:</span>
                <span>${subtotalProductos.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Costo Domicilio:</span>
                <span>${COSTO_DOMICILIO.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-black pt-1 border-t border-gray-800">
                <span>Total a Pagar:</span>
                <span className="text-amber-400">${totalGeneral.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-gray-800 text-[11px] space-y-1 text-gray-300">
              <div className="flex items-center gap-1.5 font-bold text-orange-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Métodos aceptados:
              </div>
              <p className="text-gray-400">Transferencia <strong>Nequi</strong>, <strong>Bancolombia</strong> o <strong>Pago contra entrega</strong>.</p>
            </div>

            <div className="space-y-2 pt-1">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Nombre Completo</label>
                <input type="text" required placeholder="Ej. Carlos Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Teléfono</label>
                  <input type="tel" required placeholder="3101234567" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Dirección</label>
                  <input type="text" required placeholder="Calle 100 # 15" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Indicaciones / Torre <span className="lowercase text-gray-500">(opcional)</span></label>
                <input type="text" placeholder="Ej. Apto 302..." value={detalles} onChange={(e) => setDetalles(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-black text-white active:scale-95 shadow-md cursor-pointer">
              <MessageCircle className="h-4 w-4" /> Enviar Pedido a WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function CookieConsentBanner({ onOpenTerms }: { onOpenTerms: () => void }) {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('comelones_cookie_consent');
    if (!hasAccepted) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('comelones_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[120] p-4 bg-black/95 border-t border-orange-500/35 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 shrink-0 hidden sm:block">
            <Cookie className="h-5 w-5" />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
            Utilizamos cookies y tecnologías de almacenamiento local para mejorar tu experiencia de navegación, recordar los productos de tu carrito y gestionar tus pedidos de manera segura. Al continuar navegando, aceptas nuestra política de tratamiento de datos y los{' '}
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenTerms();
              }}
              className="text-orange-400 font-bold underline hover:text-orange-300 bg-transparent border-none p-0 inline cursor-pointer"
            >
              términos y condiciones
            </button>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-2.5 text-xs font-black text-black shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productToCustomize, setProductToCustomize] = useState<typeof PRODUCTS[0] | null>(null);
  
  // Estado para el Modal de Términos y Tratamiento de Datos
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = customStyles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleAddCustomizedToCart = (product: typeof PRODUCTS[0], salsas: string[], adicionales: AdicionalItem[], nota: string, quantity: number) => {
    const cartId = `${product.id}-${Date.now()}`;
    setCart((prev) => [
      ...prev,
      {
        cartId,
        product,
        quantity,
        salsasSeleccionadas: salsas,
        adicionalesSeleccionados: adicionales,
        nota
      }
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenMenu = useCallback(() => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#06070a] text-white selection:bg-orange-500 selection:text-black">
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero onOpenMenu={handleOpenMenu} />
        <MenuSection onOpenCustomize={(prod) => setProductToCustomize(prod)} />
        <ContactBanner onOpenMenu={handleOpenMenu} />
      </main>
      <Footer />

      {/* Banner de cookies conectado para abrir los Términos y Ley de Datos */}
      <CookieConsentBanner onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Modal de Términos, Condiciones y Tratamiento de Datos */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      <CustomizeModal 
        product={productToCustomize} 
        onClose={() => setProductToCustomize(null)} 
        onAddCustomizedToCart={handleAddCustomizedToCart} 
      />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />
    </div>
  );
}