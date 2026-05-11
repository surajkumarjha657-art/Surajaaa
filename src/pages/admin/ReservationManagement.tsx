import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock,
  MessageSquare,
  Calendar,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../../lib/firebase';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
      fetchReservations();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'reservations');
    }
  };

  const filteredReservations = reservations.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.phoneNumber.includes(searchQuery));

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif text-cafe-brown">Reservations Hub</h1>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">Manage guest journeys & table flow</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-neutral-200">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReservations.map((res) => (
            <motion.div 
              layout
              key={res.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] shadow-sm border border-neutral-200 p-8 space-y-6 relative overflow-hidden"
            >
              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-0 w-full h-2 ${
                res.status === 'accepted' ? 'bg-cafe-olive' : res.status === 'rejected' ? 'bg-red-400' : 'bg-orange-400'
              }`} />

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif text-cafe-brown">{res.name}</h3>
                  <div className="flex items-center gap-2 text-cafe-terracotta font-bold text-xs">
                    <Users size={12} /> {res.guests} GUESTS
                  </div>
                </div>
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  res.status === 'accepted' ? 'bg-cafe-olive/10 text-cafe-olive' : res.status === 'rejected' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-600'
                }`}>
                  {res.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-neutral-50">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest flex items-center gap-1"><Calendar size={10} /> Date</span>
                  <p className="text-sm font-semibold">{res.date}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest flex items-center gap-1"><Clock size={10} /> Time</span>
                  <p className="text-sm font-semibold">{res.time}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-neutral-600">
                  <Phone size={14} className="text-cafe-terracotta" />
                  <span className="text-sm">{res.phoneNumber}</span>
                  <a href={`tel:${res.phoneNumber}`} className="ml-auto p-2 bg-neutral-50 rounded-xl hover:bg-cafe-terracotta hover:text-white transition-all"><ArrowUpRight size={14} /></a>
                </div>
                {res.specialRequest && (
                  <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl italic text-xs text-neutral-500">
                    <MessageSquare size={14} className="mt-0.5" />
                    <p>{res.specialRequest}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => updateStatus(res.id, 'accepted')}
                  disabled={res.status === 'accepted'}
                  className="flex items-center justify-center gap-2 py-3 bg-cafe-olive/10 text-cafe-olive rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-cafe-olive hover:text-white transition-all disabled:opacity-50"
                >
                  <CheckCircle2 size={16} /> Accept
                </button>
                <button 
                  onClick={() => updateStatus(res.id, 'rejected')}
                   disabled={res.status === 'rejected'}
                  className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </motion.div>
          ))}
          {filteredReservations.length === 0 && (
            <div className="col-span-full py-20 text-center text-neutral-400 italic text-sm">
              No reservations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
