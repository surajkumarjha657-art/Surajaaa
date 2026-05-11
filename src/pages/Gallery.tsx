import { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Video, Maximize2 } from 'lucide-react';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    { id: 1, type: 'Image', src: 'https://picsum.photos/seed/gal1/800/1000', caption: 'Terrace at Twilight' },
    { id: 2, type: 'Image', src: 'https://picsum.photos/seed/gal2/1000/800', caption: 'Signature Coffee' },
    { id: 3, type: 'Image', src: 'https://picsum.photos/seed/gal3/800/800', caption: 'Art Class View' },
    { id: 4, type: 'Image', src: 'https://picsum.photos/seed/gal4/1000/1000', caption: 'Peaceful Courtyard' },
    { id: 5, type: 'Image', src: 'https://picsum.photos/seed/gal5/800/1200', caption: 'Evening Vibe' },
    { id: 6, type: 'Image', src: 'https://picsum.photos/seed/gal6/1200/800', caption: 'Art Display' },
    { id: 7, type: 'Video', src: 'https://picsum.photos/seed/gal7/1000/1000', caption: 'Cafe Walkthrough' },
    { id: 8, type: 'Image', src: 'https://picsum.photos/seed/gal8/800/800', caption: 'Traditional Thali' },
  ];

  const filteredItems = galleryItems.filter(item => activeFilter === 'All' || item.type === activeFilter);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-cafe-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cafe-olive text-[11px] uppercase tracking-[0.3em] font-bold block"
          >
            Atmosphere
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-cafe-brown italic"
          >
            Visual <span className="text-cafe-terracotta not-italic">Dialogue</span>
          </motion.h1>
          
          <div className="flex justify-center gap-10 mt-12 border-b border-cafe-brown/10 pb-4">
            {['All', 'Image', 'Video'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-4 ${
                  activeFilter === filter ? 'text-cafe-terracotta' : 'text-cafe-brown/40 hover:text-cafe-brown'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div 
                    layoutId="galleryUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cafe-terracotta" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative group cursor-pointer overflow-hidden border border-cafe-brown/10 p-2 md:p-3 bg-white hover:border-cafe-terracotta/30 transition-colors"
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="aspect-auto overflow-hidden relative">
                <img 
                  src={item.src} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cafe-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-cafe-brown">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center px-2">
                <h4 className="text-lg font-serif italic text-cafe-brown">{item.caption}</h4>
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">{item.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox placeholder */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" 
            referrerPolicy="no-referrer"
          />
          <button className="absolute top-10 right-10 text-white p-4 hover:rotate-90 transition-transform">
            <Maximize2 size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
