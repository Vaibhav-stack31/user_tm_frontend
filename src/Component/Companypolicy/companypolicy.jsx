import React from 'react';
import Image from 'next/image';

const policies = [
    {
        title: "Leave Policy",
        desc: "Our company offers a comprehensive leave policy designed to support the well-being and work-life balance of all employees.",
        img: "/policy.png",
    },
    {
        title: "Business Travel Policy",
        desc: "A company’s business travel policy outlines the rules, procedures, and expectations for employees traveling on behalf of the organization.",
        img: "/business.png",
    },
    {
        title: "Health Insurance Policy",
        desc: "The company offers comprehensive health insurance, surgeries, and medical treatments for employees and their immediate family members.",
        img: "/health.png",
    },
    {
        title: "Work From Home Policy",
        desc: "Employees need to have completed 6 months of continuous service to be eligible for WFH.",
        img: "/home.png",
    },
    {
        title: "Employee Conduct Policy",
        desc: "Employee conduct policies establish the standards of behavior expected from all employees within a company.",
        img: "/employee.png",
    },
    {
        title: "Overtime Policy",
        desc: "Employees are compensated for working beyond their regular hours in accordance with labor regulations and company guidelines.",
        img: "/overtime.png",
    },
];

export default function Companypolicy() {
    return (
        <div className="px-6 py-4">
            <h2 className="text-3xl font-bold mb-8 border-b-4 border-yellow-500 inline-block">
                Company Policy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {policies.map((policy, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-2xl p-6 flex justify-between items-center hover:shadow-lg transition-transform hover:-translate-y-1"
                    >
                        <div className="flex-1 pr-4">
                            <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                            <p className="text-gray-700 text-sm mb-4">{policy.desc}</p>
                            <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                                Read more
                            </button>
                        </div>
                        <div className="min-w-[100px] ml-4 flex justify-center items-center">
                            <Image
                                src={policy.img}
                                alt={policy.title}
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
