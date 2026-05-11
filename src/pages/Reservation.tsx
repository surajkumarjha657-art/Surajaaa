import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Send, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    guests: 2,
    date: '',
    time: '',
    specialRequest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reservations'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
      // WhatsApp Confirmation Link preparation
      const waMessage = `Hi Triveni Terrace Cafe, I'd like to reserve a table for ${formData.guests} people on ${formData.date} at ${formData.time}. Name: ${formData.name}.`;
      const waLink = `https://wa.me/919971566904?text=${encodeURIComponent(waMessage)}`;
      
      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 3000);

    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reservations');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-cafe-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cafe-terracotta uppercase tracking-[0.3em] text-xs font-bold"
          >
            EXPERIENCE THE PEACE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-cafe-brown"
          >
            Reserve Your Spot
          </motion.h1>
          <p className="text-cafe-dark/60 max-w-lg mx-auto italic">
            Join us for an artistic dining experience on our iconic terrace.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Amrita Sher-Gil"
                    className="w-full bg-white/50 border-b border-cafe-brown/20 py-4 px-2 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 99999 99999"
                    className="w-full bg-white/50 border-b border-cafe-brown/20 py-4 px-2 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60 flex items-center gap-2">
                    <Users size={14} /> Guests
                  </label>
                  <select
                    className="w-full bg-white/50 border-b border-cafe-brown/20 py-4 px-2 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60 flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-white/50 border-b border-cafe-brown/20 py-4 px-2 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60 flex items-center gap-2">
                    <Clock size={14} /> Time
                  </label>
                  <select
                    required
                    className="w-full bg-white/50 border-b border-cafe-brown/20 py-4 px-2 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="">Select Time</option>
                    {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-cafe-brown/60">Special Request (Optional)</label>
                  <textarea
                    placeholder="Anniversary celebration, terrace corner, etc."
                    rows={3}
                    className="w-full bg-white/50 border border-cafe-brown/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-cafe-terracotta transition-colors"
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 pt-6">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-cafe-terracotta text-white py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-cafe-brown transition-all disabled:opacity-50 shadow-lg shadow-cafe-terracotta/20"
                  >
                    {isSubmitting ? 'curating your spot...' : (
                      <>CONFIRM RESERVATION <Send size={20} /></>
                    )}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-widest mt-6 opacity-40 font-bold">
                    You will be redirected to WhatsApp for quick confirmation.
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 py-20"
            >
              <div className="w-24 h-24 bg-cafe-olive/20 rounded-full flex items-center justify-center mx-auto text-cafe-olive">
                <CheckCircle2 size={64} />
              </div>
              <h2 className="text-4xl font-serif text-cafe-brown">Resonating Experience Confirmed!</h2>
              <p className="text-cafe-dark/60 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-cafe-dark">{formData.name}</span>. Your request has been received. Redirecting you to WhatsApp for immediate confirmation...
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-cafe-terracotta font-bold uppercase tracking-widest text-xs border-b border-cafe-terracotta"
              >
                Back to form
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReservationPage;
