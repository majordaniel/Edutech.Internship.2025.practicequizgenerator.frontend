// import { useState } from "react";
// import { ChevronUp, ChevronDown } from "lucide-react";

// export default function Stepper({ label, min = 1, max = 100, value, onChange }) {
//   const [internalValue, setInternalValue] = useState(value);

//   const updateValue = (newVal) => {
//     if (newVal >= min && newVal <= max) {
//       setInternalValue(newVal);
//       onChange(newVal);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-gray-900 text-sm font-medium mb-2">{label}</label>
//       <div className="flex items-center border border-gray-300 rounded px-3 py-2">
//         <input
//           type="number"
//           value={internalValue}
//           min={min}
//           max={max}
//           onChange={(e) => updateValue(Number(e.target.value))}
//           className="flex-1 outline-none text-sm"
//         />
//         <div className="flex flex-col ml-2">
//           <button
//             type="button"
//             onClick={() => updateValue(internalValue + 1)}
//             className="p-0.5 hover:bg-gray-100 rounded"
//           >
//             <ChevronUp className="w-4 h-4 text-gray-600" />
//           </button>
//           <button
//             type="button"
//             onClick={() => updateValue(internalValue - 1)}
//             className="p-0.5 hover:bg-gray-100 rounded"
//           >
//             <ChevronDown className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
