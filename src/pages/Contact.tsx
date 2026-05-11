import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-40 pb-24 bg-cafe-cream text-cafe-brown">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Info Section */}
          <div className="space-y-16">
            <div className="space-y-8">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cafe-olive text-[11px] uppercase tracking-[0.4em] font-bold block"
              >
                Inquiry
              </motion.span>
              <h1 className="text-7xl font-serif leading-tight italic">
                We'd love to <br/><span className="text-cafe-terracotta not-italic">hear from you</span>
              </h1>
              <p className="text-sm text-cafe-dark/60 font-light leading-relaxed max-w-sm italic">
                Whether it's a reservation query, feedback on our thali, or just a hello from a fellow artist.
              </p>
            </div>

            <div className="space-y-12 border-l border-cafe-brown/10 pl-10">
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-cafe-olive font-bold opacity-60">Our Location</h4>
                <p className="text-xl font-serif leading-relaxed italic">
                  Triveni Kala Sangam, <br/> 205, Tansen Marg, Mandi House, <br/> New Delhi 110001
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-cafe-olive font-bold opacity-60">Call Us</h4>
                <p className="text-xl font-serif italic">+91 99715 66904</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-cafe-olive font-bold opacity-60">Timings</h4>
                <p className="text-sm text-cafe-dark/60 font-medium tracking-wide">Mon - Sun: 11:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex gap-6">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <button key={i} className="w-10 h-10 border border-cafe-brown/10 rounded-full flex items-center justify-center text-cafe-brown hover:bg-cafe-brown hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="border border-cafe-brown/10 p-10 md:p-16 bg-white/40">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    placeholder="Your Name" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    placeholder="hello@artist.com" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Purpose</label>
                <select className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic appearance-none">
                  <option>General Inquiry</option>
                  <option>Corporate Events</option>
                  <option>Catering Services</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/20 border border-cafe-brown/10 p-6 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button className="w-full border border-cafe-brown text-cafe-brown py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-cafe-brown hover:text-white transition-all transform hover:-translate-y-1">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-40 border border-cafe-brown/10 p-2 md:p-3 bg-white">
           <div className="h-[600px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 relative">
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9960252516423!2d77.23071377630739!3d28.614838575674092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd395728a559%3A0xea835a6390977239!2sTriveni%20Terrace%20Cafe!5e0!3m2!1sen!2sin!4v1715424000000!5m2!1sen!2sin" 
              className="w-full h-full border-0"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
