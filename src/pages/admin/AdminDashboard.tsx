import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  UtensilsCrossed, 
  BookOpenCheck, 
  Image as ImageIcon, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Users,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    reservations: 0,
    dishes: 0,
    galleryItems: 0,
  });
  const [recentReservations, setRecentReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSnap = await getDocs(query(collection(db, 'reservations'), orderBy('createdAt', 'desc'), limit(5)));
        const dishSnap = await getDocs(collection(db, 'dishes'));
        const gallerySnap = await getDocs(collection(db, 'gallery'));

        setStats({
          reservations: resSnap.size,
          dishes: dishSnap.size,
          galleryItems: gallerySnap.size
        });

        setRecentReservations(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const NavItem = ({ icon: Icon, label, path, active = false }: any) => (
    <Link 
      to={path} 
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
        active 
          ? 'bg-cafe-terracotta text-white shadow-lg' 
          : 'text-cafe-dark/60 hover:bg-white hover:text-cafe-brown'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm tracking-wide">{label}</span>
      {active && <ChevronRight size={16} className="ml-auto" />}
    </Link>
  );

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-72 p-6 space-y-8">
        <div className="px-4 py-6 bg-white rounded-3xl shadow-sm border border-neutral-200">
           <div className="flex items-center gap-4">
             <img src={user?.photoURL || ''} className="w-12 h-12 rounded-full border-2 border-cafe-terracotta p-0.5" />
             <div className="overflow-hidden">
               <h4 className="font-serif truncate text-cafe-brown">{user?.displayName}</h4>
               <p className="text-[10px] uppercase font-bold tracking-widest text-cafe-dark/40">Super Admin</p>
             </div>
           </div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={BarChart3} label="Insights" path="/admin/dashboard" active />
          <NavItem icon={UtensilsCrossed} label="Curate Menu" path="/admin/menu" />
          <NavItem icon={BookOpenCheck} label="Reservations" path="/admin/reservations" />
          <NavItem icon={ImageIcon} label="Gallery Hub" path="/admin/gallery" />
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm uppercase tracking-widest">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Curations', val: stats.dishes, icon: UtensilsCrossed, trend: '+12%' },
            { label: 'Bookings Received', val: stats.reservations, icon: Calendar, trend: '+5%' },
            { label: 'Moments Captured', val: stats.galleryItems, icon: TrendingUp, trend: '+20%' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-neutral-200 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-neutral-50 rounded-2xl text-cafe-terracotta">
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-cafe-olive">{stat.trend}</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">{stat.label}</p>
                <h3 className="text-4xl font-serif text-cafe-brown mt-1">{stat.val}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reservations */}
          <div className="bg-white rounded-[40px] shadow-sm border border-neutral-200 p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif text-cafe-brown">Recent Reservations</h3>
              <Link to="/admin/reservations" className="text-xs font-bold text-cafe-terracotta uppercase tracking-widest underline">View All</Link>
            </div>
            <div className="space-y-4">
              {recentReservations.length > 0 ? recentReservations.map((res) => (
                <div key={res.id} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-100">
                  <div className="w-12 h-12 bg-cafe-cream rounded-2xl flex items-center justify-center text-cafe-brown/40">
                    <Users size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm">{res.name}</h5>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{res.date} • {res.time} • {res.guests} Guests</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    res.status === 'accepted' ? 'bg-cafe-olive/10 text-cafe-olive' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {res.status}
                  </span>
                </div>
              )) : (
                <p className="text-center py-10 text-neutral-400 italic text-sm">No recent bookings found.</p>
              )}
            </div>
          </div>

          {/* Quick Actions / Activity */}
          <div className="bg-cafe-brown rounded-[40px] shadow-sm p-8 text-cafe-cream space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <h3 className="text-2xl font-serif relative z-10">Curation Actions</h3>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl transition-all text-left space-y-3">
                <div className="w-10 h-10 bg-cafe-terracotta rounded-xl flex items-center justify-center"><UtensilsCrossed size={18} /></div>
                <h5 className="font-medium text-sm">Add New Dish</h5>
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl transition-all text-left space-y-3">
                <div className="w-10 h-10 bg-cafe-olive rounded-xl flex items-center justify-center"><ImageIcon size={18} /></div>
                <h5 className="font-medium text-sm">Upload to Gallery</h5>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
