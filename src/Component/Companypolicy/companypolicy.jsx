'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const policies = [
  {
    title: "Leave Policy",
    desc: "Our company offers a comprehensive leave policy...",
    fullDesc:
      "Our company offers a comprehensive leave policy designed to support the well-being and work-life balance of all employees. Employees are entitled to paid vacation, sick leave, and emergency leaves. We encourage everyone to utilize their time off to recharge and maintain productivity.",
    img: "/policy.png",
  },
  {
    title: "Business Travel Policy",
    desc: "A company’s business travel policy outlines...",
    fullDesc:
      "A company’s business travel policy outlines the rules, procedures, and expectations for employees traveling on behalf of the organization. It includes booking procedures, reimbursement processes, allowable expenses, and safety guidelines.",
    img: "/business.png",
  },
  {
    title: "Health Insurance Policy",
    desc: "The company offers comprehensive health insurance...",
    fullDesc:
      "The company offers comprehensive health insurance that covers hospital stays, surgeries, and medical treatments for employees and their immediate family members. Regular health check-ups and wellness programs are also included.",
    img: "/health.png",
  },
  {
    title: "Work From Home Policy",
    desc: "Employees need to have completed 6 months...",
    fullDesc:
      "Employees need to have completed 6 months of continuous service to be eligible for WFH. WFH is subject to manager approval and availability of necessary equipment. Regular check-ins and performance tracking continue remotely.",
    img: "/home.png",
  },
  {
    title: "Employee Conduct Policy",
    desc: "Employee conduct policies establish the standards...",
    fullDesc:
      "Employee conduct policies establish the standards of behavior expected from all employees within a company. These include punctuality, professionalism, respect, ethical conduct, and adherence to company rules and laws.",
    img: "/employee.png",
  },
  {
    title: "Overtime Policy",
    desc: "Employees are compensated for working beyond...",
    fullDesc:
      "Employees are compensated for working beyond their regular hours in accordance with labor regulations and company guidelines. Overtime work must be pre-approved by managers and is tracked for payroll purposes.",
    img: "/overtime.png",
  },
];

export default function Companypolicy() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-yellow-500 inline-block">
        Company Policy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-[1px_4px_10px_lightgray] p-6 flex flex-col justify-between hover:shadow-[1px_1px_10px_lightgray] transition-transform hover:-translate-y-1"
          >
            <div className="flex items-start">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  {expandedIndex === index ? policy.fullDesc : policy.desc}
                </p>
                <button
  onClick={() => toggleExpand(index)}
  className="text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition-colors cursor-pointer"
  style={{ backgroundColor: '#018ABE' }}
>
  {expandedIndex === index ? "Show less" : "Read more"}
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
          </div>
        ))}
      </div>
    </div>
  );
}
