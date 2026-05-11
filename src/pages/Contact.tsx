import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-cafe-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Section */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cafe-terracotta uppercase tracking-[0.3em] text-sm font-bold"
              >
                GET IN TOUCH
              </motion.span>
              <h1 className="text-6xl font-serif text-cafe-brown leading-tight">
                We'd love to <br/><span className="text-cafe-terracotta italic">hear from you</span>
              </h1>
              <p className="text-lg text-cafe-dark/60 font-light leading-relaxed max-w-md">
                Whether it's a reservation query, feedback on our thali, or just a hello from a fellow artist.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cafe-terracotta group-hover:bg-cafe-terracotta group-hover:text-white transition-all shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-cafe-brown mb-1">Our Location</h4>
                  <p className="text-cafe-dark/60 leading-relaxed max-w-xs">
                    Triveni Kala Sangam, 205, Tansen Marg, Mandi House, New Delhi, Delhi 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cafe-terracotta group-hover:bg-cafe-terracotta group-hover:text-white transition-all shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-cafe-brown mb-1">Call Us</h4>
                  <p className="text-cafe-dark/60">+91 99715 66904</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cafe-terracotta group-hover:bg-cafe-terracotta group-hover:text-white transition-all shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-cafe-brown mb-1">Timings</h4>
                  <p className="text-cafe-dark/60">Mon - Sun: 11:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <button key={i} className="w-10 h-10 border border-cafe-brown/10 rounded-full flex items-center justify-center text-cafe-brown hover:bg-cafe-brown hover:text-white transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-cafe-brown/40">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-cafe-brown/10 py-3 focus:outline-none focus:border-cafe-terracotta transition-all"
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-cafe-brown/40">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-cafe-brown/10 py-3 focus:outline-none focus:border-cafe-terracotta transition-all"
                    placeholder="Enter your email" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-cafe-brown/40">Subject</label>
                <select className="w-full bg-transparent border-b border-cafe-brown/10 py-3 focus:outline-none focus:border-cafe-terracotta transition-all">
                  <option>General Inquiry</option>
                  <option>Corporate Events</option>
                  <option>Catering Services</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-cafe-brown/40">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/30 border border-cafe-brown/5 rounded-2xl p-4 focus:outline-none focus:border-cafe-terracotta transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-cafe-brown text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cafe-terracotta transition-all shadow-lg">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-32 rounded-[50px] overflow-hidden h-[500px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
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
  );
};

export default ContactPage;
