import { motion } from 'motion/react';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-cafe-cream">
      {/* Narrative Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cafe-olive text-[11px] uppercase tracking-[0.3em] font-bold block"
            >
              Heritage & Art
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-serif text-cafe-brown leading-tight italic"
            >
              The Story of <br/><span className="text-cafe-terracotta not-italic">Triveni</span>
            </motion.h1>
            <div className="space-y-8 text-sm text-cafe-dark/70 leading-relaxed font-light">
              <p>
                In the heart of Mandi House, within the red-brick walls of Triveni Kala Sangam, lies a space where time feels different. Established alongside the arts institution in 1963, Triveni Terrace Cafe has been a cornerstone of Delhi's intellectual and cultural life.
              </p>
              <div className="relative p-10 border border-cafe-brown/10 bg-white/40">
                 <div className="absolute top-0 left-0 w-2 h-2 bg-cafe-terracotta"></div>
                 <p className="italic text-cafe-brown leading-relaxed">
                  "It was founded with the belief that a space for art must also be a space for community. The cafe was designed as a breather—a place for a dancer to rest after practice, an artist to sketch, or a parliamentarian to discuss ideas away from the noise."
                </p>
              </div>
              <p>
                Our philosophy is simple: honesty. Honesty in our ingredients, our service, and our atmosphere. We serve traditional North Indian snacks and thalis that remind you of home, prepared with the same care and love for generations.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] border border-cafe-brown/10 p-4 md:p-8">
              <div className="w-full h-full rounded-t-full overflow-hidden border border-white/20 relative">
                <img 
                  src="https://picsum.photos/seed/hist1/800/1000" 
                  alt="Heritage" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cafe-terracotta/10 mix-blend-multiply"></div>
              </div>
            </div>
            {/* Absolute Decorative Circle */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-cafe-olive/20 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-cafe-brown py-24 text-cafe-cream px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: Award, label: "DECADE OF LEGACY", val: "60+ Years" },
            { icon: Users, label: "COMMUNITY FIRST", val: "1M+ Visitors" },
            { icon: BookOpen, label: "CULTURAL HUB", val: "Art & Food" },
            { icon: Heart, label: "MADE WITH LOVE", val: "Traditional" }
          ].map((item, i) => (
            <div key={i} className="space-y-6">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto text-cafe-terracotta">
                <item.icon size={18} />
              </div>
              <h4 className="text-3xl font-serif italic text-white">{item.val}</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-serif text-cafe-brown">A Palette for the Soul</h2>
          <p className="text-cafe-dark/60 italic">Designed to breathe, light, and inspire.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          <div className="flex-1 rounded-[50px] overflow-hidden group relative">
            <img 
              src="https://picsum.photos/seed/amb1/1200/800" 
              alt="Terrace View" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
              <div className="text-white">
                <h4 className="text-3xl font-serif mb-2">The Terrace</h4>
                <p className="text-sm opacity-80 max-w-md">Birdsong, seasonal blooms, and the gentle chatter of Delhi's artistic elite.</p>
              </div>
            </div>
          </div>
          <div className="flex-[0.6] rounded-[50px] overflow-hidden group relative">
            <img 
              src="https://picsum.photos/seed/amb2/1200/800" 
              alt="Indoor View" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
              <div className="text-white">
                <h4 className="text-3xl font-serif mb-2">The Studio</h4>
                <p className="text-sm opacity-80 max-w-md">Warm lighting and cozy corners perfect for reading or reflecting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
