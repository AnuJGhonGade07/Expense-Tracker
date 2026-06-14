
import { FaArrowTrendUp,FaArrowTrendDown,FaWallet,FaReceipt,} from "react-icons/fa6";
export default function StatCard({title,value,color,icon}){
    return(
        <div className=" bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>
                    <h2 className={`text-3xl font-bold mt-3 ${color}`}>{value}</h2>
                </div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-xl">{icon}</div>
            </div>
        </div>
    )
}