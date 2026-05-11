import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChefHat, 
  Filter,
  X,
  Save,
  Loader2
} from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const MenuManagement = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'North Indian Snacks',
    imageUrl: '',
    isChefRecommended: false
  });

  const categories = ["North Indian Snacks", "Thalis", "Tea & Coffee", "Desserts", "Beverages"];

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'dishes'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      setDishes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingDish) {
        await updateDoc(doc(db, 'dishes', editingDish.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'dishes'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setEditingDish(null);
      setFormData({ name: '', description: '', price: 0, category: 'North Indian Snacks', imageUrl: '', isChefRecommended: false });
      fetchDishes();
    } catch (error) {
      handleFirestoreError(error, editingDish ? OperationType.UPDATE : OperationType.CREATE, 'dishes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await deleteDoc(doc(db, 'dishes', id));
      fetchDishes();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'dishes');
    }
  };

  const openEdit = (dish: any) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
      imageUrl: dish.imageUrl,
      isChefRecommended: dish.isChefRecommended
    });
    setIsModalOpen(true);
  };

  const filteredDishes = dishes.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif text-cafe-brown">Menu Curation</h1>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">Manage your sensory experiences</p>
          </div>
          <button 
            onClick={() => { setEditingDish(null); setFormData({ name: '', description: '', price: 0, category: 'North Indian Snacks', imageUrl: '', isChefRecommended: false }); setIsModalOpen(true); }}
            className="bg-cafe-brown text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest flex items-center gap-3 hover:bg-cafe-terracotta transition-all shadow-lg"
          >
            <Plus size={18} /> ADD NEW DISH
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-neutral-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-neutral-400">Dish Detail</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-neutral-400">Category</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-neutral-400">Price</th>
                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 relative">
                        <img src={dish.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {dish.isChefRecommended && <div className="absolute top-1 right-1 w-2 h-2 bg-cafe-terracotta rounded-full shadow-glow animate-pulse" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-cafe-brown">{dish.name}</h4>
                        <p className="text-xs text-neutral-400 truncate max-w-[200px]">{dish.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {dish.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="font-bold text-cafe-terracotta">₹{dish.price}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => openEdit(dish)} className="p-3 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-cafe-brown hover:text-white transition-all"><Edit2 size={16} /></button>
                       <button onClick={() => handleDelete(dish.id)} className="p-3 bg-neutral-100 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDishes.length === 0 && (
            <div className="py-20 text-center text-neutral-400 italic text-sm">
              No dishes found.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[40px] p-8 md:p-12 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-neutral-400 hover:text-cafe-brown transition-colors">
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-cafe-brown/10 rounded-2xl text-cafe-brown"><ChefHat size={32} /></div>
                <h2 className="text-3xl font-serif text-cafe-brown">{editingDish ? 'Refine Curation' : 'New Curation'}</h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Dish Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Description</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Price (INR)</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Image URL</label>
                  <input type="url" required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1 focus:ring-cafe-terracotta/20 transition-all" placeholder="https://..." />
                </div>
                <div className="md:col-span-2 flex items-center gap-4 bg-neutral-50 p-6 rounded-3xl">
                  <input type="checkbox" checked={formData.isChefRecommended} onChange={(e) => setFormData({...formData, isChefRecommended: e.target.checked})} className="w-5 h-5 accent-cafe-terracotta" id="recommended" />
                  <label htmlFor="recommended" className="text-sm font-medium text-cafe-brown cursor-pointer">Chef Recommended (Visible on Homepage)</label>
                </div>

                <div className="md:col-span-2 pt-6">
                  <button disabled={loading} type="submit" className="w-full bg-cafe-brown text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cafe-terracotta transition-all flex items-center justify-center gap-3">
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> {editingDish ? 'UPDATE CURATION' : 'SAVE CURATION'}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManagement;
