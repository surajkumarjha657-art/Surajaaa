import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
  X,
  Save,
  Loader2
} from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const GalleryManagement = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    caption: '',
    imageUrl: '',
    type: 'image'
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'gallery'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      setFormData({ caption: '', imageUrl: '', type: 'image' });
      fetchItems();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this moment?")) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      fetchItems();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'gallery');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif text-cafe-brown">Gallery Hub</h1>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">Capture and showcase the cafe's soul</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-cafe-brown text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest flex items-center gap-3 hover:bg-cafe-terracotta transition-all shadow-lg"
          >
            <Plus size={18} /> UPLOAD MOMENT
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-neutral-200 group relative"
            >
              <div className="h-64 relative bg-neutral-100 overflow-hidden">
                <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Video size={24} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h4 className="font-serif text-lg text-cafe-brown truncate">{item.caption || 'Untitled Moment'}</h4>
                <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1">{item.type}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <div className="py-20 text-center text-neutral-300 italic text-sm">
            The visual dialogue is empty. Start by uploading a moment.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-8 md:p-12 w-full max-w-xl relative shadow-2xl"
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-neutral-400 hover:text-cafe-brown transition-colors">
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cafe-brown/10 rounded-2xl text-cafe-brown"><LinkIcon size={24} /></div>
              <h2 className="text-3xl font-serif text-cafe-brown">New Moment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Caption</label>
                <input required value={formData.caption} onChange={(e) => setFormData({...formData, caption: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1" placeholder="e.g. Morning Sun on the Terrace" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Type</label>
                <div className="flex gap-4">
                  {['image', 'video'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({...formData, type: t})}
                      className={`flex-1 py-3 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${
                        formData.type === t ? 'bg-cafe-brown text-white border-cafe-brown' : 'bg-white text-neutral-400 border-neutral-100 hover:bg-neutral-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Asset URL</label>
                <input type="url" required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-neutral-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-1" placeholder="https://..." />
              </div>

              <div className="pt-6">
                <button disabled={loading} type="submit" className="w-full bg-cafe-brown text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cafe-terracotta transition-all flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> UPLOAD TO HUB</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
