import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, Coffee, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row border-b border-cafe-brown/10">
    {/* Column 1: Narrative */}
    <div className="w-full lg:w-[420px] lg:border-r border-cafe-brown/10 p-8 md:p-12 flex flex-col justify-center gap-12">
      <div className="space-y-6">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-cafe-olive text-xs uppercase tracking-widest font-bold block"
        >
          Est. Delhi Culture
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-serif leading-[0.95] tracking-tight italic text-cafe-brown"
        >
          Where Art <br/>
          <span className="text-cafe-terracotta not-italic">Meets</span> <br/>
          Food
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed opacity-70 max-w-[300px]"
        >
          A beautiful light-filled sanctuary serving traditional North Indian flavors amidst the legacy of Triveni Kala Sangam.
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-6"
      >
        <Link to="/menu" className="w-full bg-cafe-terracotta text-white py-4 text-xs uppercase tracking-[0.2em] font-bold text-center shadow-lg shadow-cafe-terracotta/20 hover:scale-[1.02] transition-transform">
          Explore The Menu
        </Link>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <span>Dine-in</span>
          <span className="w-1 h-1 bg-cafe-brown rounded-full"></span>
          <span>Takeaway</span>
          <span className="w-1 h-1 bg-cafe-brown rounded-full"></span>
          <span>Delivery</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-12 border-t border-cafe-brown/10 flex items-center gap-4"
      >
        <span className="text-3xl font-serif italic text-cafe-brown">4.4</span>
        <div className="text-[10px] uppercase tracking-widest leading-tight">
          Google Reviews<br/>
          <span className="text-cafe-terracotta">★★★★★</span>
        </div>
      </motion.div>
    </div>

    {/* Column 2: Immersive Visual */}
    <div className="flex-grow bg-[#EAE7E2] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-cafe-brown/40 to-transparent z-10"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 flex items-center justify-center p-8 md:p-12 lg:p-16"
      >
        <div className="w-full h-full border border-white/30 rounded-t-[200px] overflow-hidden relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1024" 
            alt="Terrace View" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-12 left-12 text-white z-20 space-y-2">
            <h3 className="text-3xl font-serif italic">Afternoon on the Terrace</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-80">Mandi House, New Delhi</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-20 left-4 md:left-2 lg:-left-6 z-30 glass-card p-6 w-64 hidden md:block"
      >
        <span className="text-cafe-terracotta text-[9px] uppercase tracking-widest font-bold block mb-1">Chef Recommended</span>
        <h4 className="font-serif text-xl italic text-cafe-brown mb-2">Signature Thali</h4>
        <p className="text-[11px] opacity-70 mb-4 leading-relaxed italic">Slow-cooked dal makhani, seasonal greens, and homemade ghee rotis.</p>
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold">₹550</div>
          <Link to="/menu" className="text-cafe-terracotta text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group">
            ORDER <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Column 3: Quick Info & Identity */}
    <div className="w-full lg:w-[320px] lg:border-l border-cafe-brown/10 flex flex-col">
      <div className="p-12 border-b border-cafe-brown/10 flex-grow space-y-12">
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold block">Art Space</label>
          <div className="h-40 bg-white border border-cafe-brown/5 flex items-center justify-center relative overflow-hidden group">
            <img 
               src="https://picsum.photos/seed/art/400/400" 
               className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale transition-opacity group-hover:opacity-40"
               referrerPolicy="no-referrer"
            />
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium opacity-40 z-10 transition-transform group-hover:scale-110">Gallery</span>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold block">Location</label>
            <p className="text-xs leading-relaxed font-medium">
              Triveni Kala Sangam,<br/>
              Tansen Marg, New Delhi
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold block">Hours</label>
            <p className="text-xs font-medium">11:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-cafe-brown text-cafe-cream">
        <Link to="/reserve" className="flex items-center justify-between group">
          <span className="text-[11px] uppercase tracking-widest font-bold">Reserve Table</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-10 border border-cafe-brown/10 space-y-6 bg-white/40"
  >
    <div className="w-10 h-10 border border-cafe-terracotta rounded-full flex items-center justify-center text-cafe-terracotta">
      <Icon size={18} />
    </div>
    <h3 className="text-2xl font-serif italic text-cafe-brown">{title}</h3>
    <p className="text-xs opacity-70 leading-relaxed italic">
      {desc}
    </p>
  </motion.div>
);

const Features = () => (
  <section className="py-24 border-b border-cafe-brown/10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3">
      <FeatureCard 
        icon={Star} 
        title="Iconic Heritage" 
        desc="Located within the cultural hub of Triveni Kala Sangam, preserving Delhi's artistic legacy for decades." 
      />
      <div className="border-x border-cafe-brown/10">
        <FeatureCard 
          icon={Utensils} 
          title="Authentic Thalis" 
          desc="Wholesome North Indian thalis that feel like a warm hug on our sun-drenched cafe terrace." 
        />
      </div>
      <FeatureCard 
        icon={Heart} 
        title="Peaceful Sanctuary" 
        desc="A rare escape from the Mandi House bustle. The perfect spot for poets and soul-searchers." 
      />
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Short Story Section */}
      <section className="py-32 border-b border-cafe-brown/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative p-4 border border-cafe-brown/10">
            <div className="aspect-square overflow-hidden border border-white/20">
              <img 
                src="https://picsum.photos/seed/triveni-about/800/800" 
                alt="Artistic Dining" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full border border-cafe-terracotta/20 hidden md:block"></div>
          </div>
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-cafe-olive uppercase tracking-[0.3em] text-[10px] font-bold block">Legacy</span>
              <h2 className="text-5xl md:text-6xl font-serif text-cafe-brown leading-tight italic">
                A Cultural Oasis <br/> in the Heart of Delhi
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-sm text-cafe-dark/70 leading-relaxed italic">
                "Triveni is not just a cafe; it's a conversation. It's where the sound of the tabla from the nearby classrooms blends with the aroma of freshly brewed ginger chai."
              </p>
              <p className="text-xs text-cafe-dark/60 leading-loose font-light">
                Serving artists, students, and families for generations, our terrace cafe is a place to slow down. Whether you're here for our legendary Shammi Kebabs or a simple Kadak Chai, you're part of Delhi's living history.
              </p>
            </div>
            <Link to="/about" className="inline-block text-cafe-terracotta font-bold tracking-[0.2em] uppercase text-[10px] border-b border-cafe-terracotta pb-2 hover:text-cafe-brown hover:border-cafe-brown transition-all">
              Discover Our Ethos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Preview */}
      <section className="py-32 border-b border-cafe-brown/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 space-y-4">
            <span className="text-cafe-olive uppercase tracking-[0.3em] text-[10px] font-bold block">Signature</span>
            <h2 className="text-5xl font-serif text-cafe-brown italic">Chef's Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { name: "Signature Mutton Thali", price: "₹550", img: "https://picsum.photos/seed/thali/800/800" },
              { name: "Triveni Shammi Kebabs", price: "₹380", img: "https://picsum.photos/seed/kebab/800/800" },
              { name: "Terrace Special Cold Coffee", price: "₹220", img: "https://picsum.photos/seed/coffee/800/800" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-10 flex flex-col gap-8 transition-colors hover:bg-white/40 ${i === 1 ? 'border-x border-cafe-brown/10' : ''}`}
              >
                <div className="aspect-square overflow-hidden border border-cafe-brown/5">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 flex-grow">
                  <h3 className="text-2xl font-serif italic text-cafe-brown leading-tight">{item.name}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-cafe-brown/5">
                    <span className="text-cafe-terracotta font-bold text-sm tracking-widest">{item.price}</span>
                    <Link to="/menu" className="w-8 h-8 rounded-full border border-cafe-brown/10 flex items-center justify-center hover:bg-cafe-brown hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aesthetic Call to Action */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif leading-tight italic text-cafe-brown">Ready to experience <br/> the art of dining?</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto font-light leading-relaxed italic">
              Book your table today and find your piece of peace in the middle of Delhi's bustling art district.
            </p>
          </div>
          <Link to="/reserve" className="inline-block border border-cafe-brown px-16 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-cafe-brown hover:text-white transition-all transform hover:-translate-y-1">
            MAKE A RESERVATION
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
