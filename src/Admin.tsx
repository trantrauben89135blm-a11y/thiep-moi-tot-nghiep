import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Users, 
  UserCheck, 
  UserX,
  AlertCircle
} from 'lucide-react';

export interface RSVP {
  id: number;
  name: string;
  attending: boolean;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "attending" | "not_attending">("all");

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    setLoading(true);
    setError(null);
    if (!supabase) {
      setError(`Supabase client is not initialized. (URL exists: ${!!import.meta.env.NEXT_PUBLIC_SUPABASE_URL}, Key exists: ${!!import.meta.env.SUPABASE_ANON_KEY})`);
      setLoading(false);
      return;
    }
    
    try {
      const { data, error: fetchError } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }
      
      console.log("Fetched data:", data);
      setRsvps(data || []);
    } catch (err: any) {
      console.error('Error fetching RSVPs:', err);
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRSVPs = rsvps.filter((rsvp) => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (rsvp.message && rsvp.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (filterType === 'attending') matchesFilter = rsvp.attending === true;
    if (filterType === 'not_attending') matchesFilter = rsvp.attending === false;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending).length,
    notAttending: rsvps.filter(r => !r.attending).length,
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#1C1A17]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[#EBE5D9]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1A17] flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[#c0a080]" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-medium leading-tight">Guest Dashboard</h1>
              <p className="text-[11px] text-[#7A6B5D] uppercase tracking-widest font-medium">Lễ Trưởng Thành</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-medium">Admin View</p>
               <p className="text-xs text-[#7A6B5D]">Real-time Updates</p>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && (
           <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl flex items-center gap-3">
             <AlertCircle className="w-5 h-5" />
             <p className="text-sm">{error}</p>
           </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white p-6 rounded-[2rem] border border-[#EBE5D9] shadow-[0_10px_40px_rgba(28,26,23,0.03)]"
           >
             <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-[#7A6B5D] uppercase tracking-widest font-semibold">Total Responses</p>
               <div className="w-10 h-10 rounded-full bg-[#F5F1EB] flex items-center justify-center">
                 <Users className="w-5 h-5 text-[#a07040]" />
               </div>
             </div>
             <p className="text-5xl font-serif">{loading ? '-' : stats.total}</p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white p-6 rounded-[2rem] border border-[#EBE5D9] shadow-[0_10px_40px_rgba(28,26,23,0.03)]"
           >
             <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-[#7A6B5D] uppercase tracking-widest font-semibold">Attending</p>
               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                 <UserCheck className="w-5 h-5 text-green-600" />
               </div>
             </div>
             <p className="text-5xl font-serif">{loading ? '-' : stats.attending}</p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white p-6 rounded-[2rem] border border-[#EBE5D9] shadow-[0_10px_40px_rgba(28,26,23,0.03)]"
           >
             <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-[#7A6B5D] uppercase tracking-widest font-semibold">Not Attending</p>
               <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                 <UserX className="w-5 h-5 text-red-500" />
               </div>
             </div>
             <p className="text-5xl font-serif">{loading ? '-' : stats.notAttending}</p>
           </motion.div>
        </div>

        {/* Filters and List */}
        <div className="bg-white rounded-[2.5rem] border border-[#EBE5D9] shadow-[0_20px_60px_rgba(28,26,23,0.04)] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[#EBE5D9] bg-[#FDFBF7]/50 flex flex-col md:flex-row gap-6 items-center justify-between">
            <h2 className="text-2xl font-serif flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-[#c0a080]" />
              Guest Responses
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <div className="relative group w-full sm:w-64">
                 <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#a89886] group-focus-within:text-[#a07040] transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search names or messages..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-white border border-[#EBE5D9] rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0a080]/30 transition-all font-medium placeholder:font-normal"
                 />
               </div>
               
               <div className="relative">
                 <select 
                   value={filterType}
                   onChange={(e) => setFilterType(e.target.value as any)}
                   className="w-full sm:w-auto bg-white border border-[#EBE5D9] rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#c0a080]/30 transition-all appearance-none font-medium cursor-pointer"
                 >
                   <option value="all">All Guests</option>
                   <option value="attending">Attending</option>
                   <option value="not_attending">Not Attending</option>
                 </select>
                 <Filter className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#a89886] pointer-events-none" />
               </div>
            </div>
          </div>

          <div className="p-0 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EBE5D9] bg-[#FDFBF7]/50 text-xs uppercase tracking-widest text-[#7A6B5D]">
                  <th className="px-6 md:px-8 py-5 font-semibold">Guest</th>
                  <th className="px-6 md:px-8 py-5 font-semibold">Status</th>
                  <th className="px-6 md:px-8 py-5 font-semibold w-1/3">Message</th>
                  <th className="px-6 md:px-8 py-5 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5D9]/50">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-[#a89886]">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-[#c0a080] border-t-transparent rounded-full mx-auto mb-4"></motion.div>
                        <p className="text-sm font-medium tracking-wide">Loading responses...</p>
                      </td>
                    </tr>
                  ) : filteredRSVPs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-[#a89886]">
                        <div className="w-16 h-16 bg-[#F5F1EB] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-6 h-6 text-[#c0a080]/50" />
                        </div>
                        <p className="text-sm font-medium tracking-wide">No responses found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredRSVPs.map((rsvp, idx) => (
                      <motion.tr 
                        key={rsvp.id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-[#FDFBF7]/80 transition-colors group"
                      >
                        <td className="px-6 md:px-8 py-5">
                          <p className="font-medium text-[#1C1A17]">{rsvp.name}</p>
                        </td>
                        <td className="px-6 md:px-8 py-5">
                          {rsvp.attending ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide border border-green-100">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold tracking-wide border border-red-100">
                              <XCircle className="w-3.5 h-3.5" /> No
                            </span>
                          )}
                        </td>
                        <td className="px-6 md:px-8 py-5">
                          <p className="text-sm text-[#7A6B5D] italic">{rsvp.message || <span className="text-[#a89886] font-normal not-italic">-</span>}</p>
                        </td>
                        <td className="px-6 md:px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 text-xs text-[#a89886]">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(rsvp.created_at).toLocaleDateString('vi-VN', { 
                              day: '2-digit', month: '2-digit', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
