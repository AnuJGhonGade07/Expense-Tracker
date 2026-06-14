import Sidebar from "../components/Sidebar"


export default function DashboardLayout({children}){
    return(
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1 p-6 bg-slate-100">
                {children}
            </div>
        </div>
    )
}