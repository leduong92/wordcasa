// 'use client';
// import { useState } from 'react';

// export function AccordionItem({ title, options }: { title: string; options?: string[] }) {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="mb-3">
//             {/* Header */}
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="flex justify-between items-center w-full py-1 text-gray-800 font-medium hover:text-black"
//             >
//                 <span>{title}</span>
//                 <span className="text-xl leading-none">{open ? '−' : '+'}</span>
//             </button>

//             {/* Options */}
//             <div
//                 className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                     open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
//                 }`}
//             >
//                 {options && (
//                     <div className="mt-2 pl-2 space-y-2 text-sm text-gray-600">
//                         {options.map((opt) => (
//                             <label key={opt} className="flex items-center gap-2">
//                                 <input
//                                     type="checkbox"
//                                     className="w-4 h-4 border-gray-400 rounded"
//                                 />
//                                 {opt}
//                             </label>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
