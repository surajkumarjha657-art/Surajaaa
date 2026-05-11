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
    <div className="min-h-screen pt-40 pb-24 px-6 bg-cafe-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cafe-olive text-[11px] uppercase tracking-[0.4em] font-bold block"
          >
            Reservation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-cafe-brown italic"
          >
            Reserve <span className="text-cafe-terracotta not-italic">Your Spot</span>
          </motion.h1>
          <p className="text-sm text-cafe-dark/60 max-w-sm mx-auto italic leading-relaxed font-light">
            Join us for an artistic dining experience on our iconic terrace.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border border-cafe-brown/10 p-10 md:p-16 bg-white/40"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Amrita Sher-Gil"
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 99999 99999"
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Guests</label>
                  <select
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic appearance-none"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Date</label>
                  <input
                    required
                    type="date"
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Time</label>
                  <select
                    required
                    className="w-full bg-transparent border-b border-cafe-brown/20 py-2 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic appearance-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="">Select Time</option>
                    {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cafe-brown/40">Special Request</label>
                  <textarea
                    placeholder="Anniversary celebration, terrace corner, etc."
                    rows={3}
                    className="w-full bg-white/20 border border-cafe-brown/10 p-6 focus:outline-none focus:border-cafe-terracotta transition-all text-sm font-serif italic"
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 pt-10">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full border border-cafe-brown text-cafe-brown py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-cafe-brown hover:text-white transition-all transform hover:-translate-y-1 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Curating Your Spot...' : 'Confirm Reservation'}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-[0.4em] mt-8 opacity-40 font-bold">
                    WhatsApp Confirmation Required
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-12 py-24 border border-cafe-olive/10 bg-white/40"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 border border-cafe-olive/20 rounded-full flex items-center justify-center mx-auto text-cafe-olive">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-5xl font-serif text-cafe-brown italic">Experience Confirmed</h2>
                <p className="text-sm text-cafe-dark/60 max-w-sm mx-auto leading-relaxed italic font-light">
                  Thank you, <span className="font-bold text-cafe-dark uppercase antialiased">{formData.name}</span>. Your request has been received. Redirecting to WhatsApp...
                </p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-cafe-terracotta border-b border-cafe-terracotta pb-2"
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
