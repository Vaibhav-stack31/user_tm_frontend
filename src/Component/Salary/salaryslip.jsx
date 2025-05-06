'use client';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';

export default function SalarySlipPage() {
    const pdfRef = useRef();

    const handleDownloadPdf = () => {
        try {
            // Skip html2canvas entirely and create PDF directly
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // PDF dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Set fonts
            pdf.setFont("helvetica", "normal");
            
            // Header
            pdf.setFillColor(255, 236, 204); // Light orange approximation for bg-orange-200
            pdf.rect(20, 20, pdfWidth - 40, 8, "F");
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Salary Slip", 22, 25);
            
            // Company info
            pdf.setFontSize(11);
            pdf.text("ISRC", 20, 35);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text("Kurla, Mumbai", 20, 40);
            pdf.text("iscr.orgin.com | 8976104646", 20, 45);
            
            // Month line
            pdf.text("PaySlip for the Month of September 2025", pdfWidth / 2, 55, { align: "center" });
            pdf.line(20, 58, pdfWidth - 20, 58);
            
            // Employee info section
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Employee Pay Summary", 20, 70);
            
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text("Employee Name: Prashant Patil", 20, 78);
            pdf.text("Designation: Co-Founder", 20, 84);
            pdf.text("Date of Joining: 8-May-2020", 20, 90);
            pdf.text("Pay Period: September 2025", 20, 96);
            pdf.text("Pay Date: 30-Sep-2025", 20, 102);
            pdf.text("Account #: 000-0000-4255", 20, 108);
            pdf.text("Location: Ghansoli", 20, 114);
            
            // Net pay box
            pdf.setFillColor(229, 255, 229); // Light green approximation for bg-green-100
            pdf.rect(pdfWidth/2 + 10, 70, pdfWidth/2 - 30, 30, "F");
            pdf.setDrawColor(0, 150, 0); // Green border color
            pdf.rect(pdfWidth/2 + 10, 70, pdfWidth/2 - 30, 30); // Border
            
            pdf.setFontSize(9);
            pdf.text("Employee Net Pay", pdfWidth/2 + (pdfWidth/2 - 30)/2, 77, { align: "center" });
            pdf.setFontSize(14);
            pdf.setTextColor(0, 150, 0); // Green text color
            pdf.setFont("helvetica", "bold");
            pdf.text("Rs. 50,213.95", pdfWidth/2 + (pdfWidth/2 - 30)/2, 87, { align: "center" });
            pdf.setFontSize(9);
            pdf.text("Paid Days: 30", pdfWidth/2 + (pdfWidth/2 - 30)/2, 95, { align: "center" });
            pdf.setTextColor(0, 0, 0); // Reset text color
            
            // Earnings/Deductions header
            pdf.setFillColor(255, 236, 204); // Light orange
            pdf.rect(20, 125, pdfWidth - 40, 8, "F");
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            
            // Headers
            const col1Width = (pdfWidth - 40) / 4;
            pdf.text("EARNINGS", 20 + col1Width/2, 130, { align: "center" });
            pdf.text("AMOUNT", 20 + col1Width + col1Width/2, 130, { align: "center" });
            pdf.text("DEDUCTIONS", 20 + col1Width*2 + col1Width/2, 130, { align: "center" });
            pdf.text("AMOUNT", 20 + col1Width*3 + col1Width/2, 130, { align: "center" });
            
            // Earnings and deductions content
            pdf.setFont("helvetica", "normal");
            let yPos = 140;
            
            // Earnings
            pdf.text("Basic Salary", 20, yPos); pdf.text("Rs. 50,600.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("House Rent Allowance", 20, yPos); pdf.text("Rs. 200.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Conveyance", 20, yPos); pdf.text("Rs. 150.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Medical", 20, yPos); pdf.text("Rs. 150.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Special Allowance", 20, yPos); pdf.text("Rs. 300.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Other", 20, yPos); pdf.text("Rs. 10.00", 20 + col1Width, yPos); yPos += 6;
            
            // Gross salary line
            pdf.line(20, yPos - 2, 20 + col1Width*2 - 10, yPos - 2);
            pdf.setFont("helvetica", "bold");
            pdf.text("Gross Salary", 20, yPos); pdf.text("Rs. 51,410.00", 20 + col1Width, yPos);
            pdf.setFont("helvetica", "normal");
            
            // Deductions
            yPos = 140;
            pdf.text("EPF", 20 + col1Width*2, yPos); pdf.text("Rs. 800.00", 20 + col1Width*3, yPos); yPos += 6;
            pdf.text("Health Insurance", 20 + col1Width*2, yPos); pdf.text("Rs. 356.36", 20 + col1Width*3, yPos); yPos += 6;
            pdf.text("Professional Tax", 20 + col1Width*2, yPos); pdf.text("Rs. 62.55", 20 + col1Width*3, yPos); yPos += 6;
            pdf.text("TDS", 20 + col1Width*2, yPos); pdf.text("Rs. 0.00", 20 + col1Width*3, yPos); yPos += 6;
            
            // Total deductions line
            pdf.line(20 + col1Width*2, yPos + 4, 20 + col1Width*4 - 10, yPos + 4);
            pdf.setFont("helvetica", "bold");
            pdf.text("Total Deductions", 20 + col1Width*2, yPos + 10); 
            pdf.text("Rs. 1,218.55", 20 + col1Width*3, yPos + 10);
            pdf.setFont("helvetica", "normal");
            
            // Net Pay
            yPos = 180;
            pdf.setFont("helvetica", "bold");
            pdf.text("NET PAY", 20, yPos);
            pdf.setTextColor(0, 150, 0); // Green text
            pdf.setFontSize(14);
            pdf.text("Rs. 50,213.95", 20, yPos + 8);
            pdf.setTextColor(0, 0, 0); // Reset color
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "italic");
            pdf.text("Amount in Words: Fifty Thousand Two Hundred and Thirteen Rupees & 95/100", 20, yPos + 15);
            
            // Reimbursements section
            yPos = 200;
            pdf.setFillColor(255, 236, 204); // Light orange
            pdf.rect(20, yPos, pdfWidth - 40, 8, "F");
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            pdf.text("REIMBURSEMENTS", 20 + col1Width/2, yPos + 5, { align: "center" });
            pdf.text("AMOUNT", 20 + col1Width + col1Width/2, yPos + 5, { align: "center" });
            
            yPos += 12;
            pdf.setFont("helvetica", "normal");
            pdf.text("Mobile Bill", 20, yPos); pdf.text("Rs. 50.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Travel", 20, yPos); pdf.text("Rs. 30.00", 20 + col1Width, yPos); yPos += 6;
            pdf.text("Food", 20, yPos); pdf.text("Rs. 20.00", 20 + col1Width, yPos); yPos += 6;
            
            pdf.line(20, yPos + 2, 20 + col1Width*2 - 10, yPos + 2);
            pdf.setFont("helvetica", "bold");
            pdf.text("Total Reimbursements", 20, yPos + 8); pdf.text("Rs. 100.00", 20 + col1Width, yPos + 8);
            
            // Total Net Payable
            yPos = 240;
            pdf.setFillColor(255, 236, 204); // Light orange
            pdf.rect(20, yPos, pdfWidth - 40, 18, "F");
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.setTextColor(200, 80, 0); // Orange text color
            pdf.text("TOTAL NET PAYABLE: Rs. 50,313.95", pdfWidth/2, yPos + 7, { align: "center" });
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "italic");
            pdf.text("(Fifty Thousand Three Hundred and Thirteen Rupees & 95/100)", pdfWidth/2, yPos + 14, { align: "center" });
            
            // Save the PDF
            pdf.save('salary-slip.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please check console for details.');
        }
    };

    // The React component's return remains the same
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white">
            {/* Download Button */}
            <div className="text-right mb-4">
                <button 
                    onClick={handleDownloadPdf}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
            </div>

            {/* PDF Content Starts Here */}
            <div ref={pdfRef} className="max-w-4xl mx-auto p-8 bg-white shadow-lg border rounded-lg mt-10 font-sans text-sm">
                <div className="mb-6">
                    <div className="text-sm font-bold bg-orange-200 p-2">Salary Slip</div>
                    <div className="mt-2">
                        <p className="font-semibold">ISRC</p>
                        <p>Kurla, Mumbai</p>
                        <p>iscr.orgin.com | 8976104646</p>
                    </div>
                </div>

                <div className="flex justify-center items-center border-b pb-4">
                    <p>PaySlip for the Month of September 2025</p>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Employee Pay Summary</h2>
                        <p><strong>Employee Name:</strong> Prashant Patil</p>
                        <p><strong>Designation:</strong> Co-Founder</p>
                        <p><strong>Date of Joining:</strong> 8-May-2020</p>
                        <p><strong>Pay Period:</strong> September 2025</p>
                        <p><strong>Pay Date:</strong> 30-Sep-2025</p>
                        <p><strong>Account #:</strong> 000-0000-4255</p>
                        <p><strong>Location:</strong> Ghansoli</p>
                    </div>

                    <div className="bg-green-100 border border-green-400 text-center rounded-lg px-4 py-2 self-start">
                        <p className="text-xs font-semibold">Employee Net Pay</p>
                        <p className="text-2xl font-bold text-green-600">₹50,213.95</p>
                        <p className="text-sm">Paid Days: 30</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 bg-orange-100 font-semibold text-center">
                    <div>EARNINGS</div>
                    <div>AMOUNT</div>
                    <div>DEDUCTIONS</div>
                    <div>AMOUNT</div>
                </div>

                <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-sm">
                    <div className="space-y-1">
                        <p>Basic Salary</p>
                        <p>House Rent Allowance</p>
                        <p>Conveyance</p>
                        <p>Medical</p>
                        <p>Special Allowance</p>
                        <p>Other</p>
                        <p className="font-semibold border-t pt-2">Gross Salary</p>
                    </div>
                    <div className="space-y-1">
                        <p>₹50,600.00</p>
                        <p>₹200.00</p>
                        <p>₹150.00</p>
                        <p>₹150.00</p>
                        <p>₹300.00</p>
                        <p>₹10.00</p>
                        <p className="font-semibold border-t pt-2">₹51,410.00</p>
                    </div>
                    <div className="space-y-1">
                        <p>EPF</p>
                        <p>Health Insurance</p>
                        <p>Professional Tax</p>
                        <p>TDS</p>
                        <p className="font-semibold border-t pt-2">Total Deductions</p>
                    </div>
                    <div className="space-y-1">
                        <p>₹800.00</p>
                        <p>₹356.36</p>
                        <p>₹62.55</p>
                        <p>₹0.00</p>
                        <p className="font-semibold border-t pt-2">₹1,218.55</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold">NET PAY</h3>
                    <p className="text-xl font-bold text-green-600">₹50,213.95</p>
                    <p className="text-sm italic">Amount in Words: Fifty Thousand Two Hundred and Thirteen Rupees & 95/100</p>
                </div>

                <div className="grid grid-cols-4 bg-orange-100 font-semibold text-center mt-6 mb-2">
                    <div>REIMBURSEMENTS</div>
                    <div>AMOUNT</div>
                    <div></div>
                    <div></div>
                </div>

                <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-sm">
                    <div className="space-y-1">
                        <p>Mobile Bill</p>
                        <p>Travel</p>
                        <p>Food</p>
                        <p className="font-semibold border-t pt-2">Total Reimbursements</p>
                    </div>
                    <div className="space-y-1">
                        <p>₹50.00</p>
                        <p>₹30.00</p>
                        <p>₹20.00</p>
                        <p className="font-semibold border-t pt-2">₹100.00</p>
                    </div>
                </div>

                <div className="bg-orange-100 mt-6 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold text-orange-700">TOTAL NET PAYABLE: ₹50,313.95</p>
                    <p className="text-sm italic">(Fifty Thousand Three Hundred and Thirteen Rupees & 95/100)</p>
                </div>
            </div>
        </div>
    );
}