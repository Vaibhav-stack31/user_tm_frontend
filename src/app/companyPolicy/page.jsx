import Companypolicy from "@/Component/companypolicy/companypolicy";

import NavBar from "@/Component/Navbar/navbar";
import Sidebar from "@/Component/Usersidebar/usersidebar";
import React from "react";

function page() {
    return (
        <div className="min-h-screen md:flex bg-white">

            {/* Desktop Sidebar Section (visible on md+) */}
            <div className="md:w-1/6 ">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
                {/* Desktop Navbar (hidden on mobile) */}
                <NavBar />

                {/* Page Content */}
                <main className="hidden md:block">
                    <Companypolicy />
                </main>





                {/* Mobile View */}
                <main className="block md:hidden"></main>

            </div>

        </div>
    );
}

export default page;
