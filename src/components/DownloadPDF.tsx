"use client";

import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadPDFProps {
  targetRef: RefObject<HTMLDivElement>;
  loanDetails: {
    years: number;
    months: number;
    loanAmount: number;
    interestRate: number;
    totalLoanAmount: number;
    monthlyPayment: number;
  };
}

export function DownloadPDF({ targetRef, loanDetails }: DownloadPDFProps) {
  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Load and add logo
    const logo = "/logo.png";
    pdf.addImage(logo, "JPEG", 80, 10, 50, 20);

    // Company Name
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Ayala Land", 105, 35, { align: "center" });

    // Company Details
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text("Unit 202, Campos Rueda Building, 101 Urban Ave, Makati, 1206 Metro Manila", 105, 42, { align: "center" });
    pdf.text("Phone: (+63)9175-4809-99 | Email: info@ayalaland.com", 105, 48, { align: "center" });

    // Title: Loan Calculation Results
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Loan Calculation Results", 105, 60, { align: "center" });

    // Loan Details Table
    autoTable(pdf, {
      startY: 70,
      head: [["LOAN DETAILS", "VALUE"]],
      body: [
        ["Years", `${loanDetails.years} Year(s)`],
        ["Months", `${loanDetails.months} Month(s)`],
        ["Loan Amount", `PHP ${formatNumber(loanDetails.loanAmount)}`],
        ["Interest Rate", `${loanDetails.interestRate.toFixed(2)}%`],
        ["Total Loan Amount (w/ interest)", `PHP ${formatNumber(loanDetails.totalLoanAmount)}`],
        ["Monthly Payment", `PHP ${formatNumber(loanDetails.monthlyPayment)}`],
        ["Total Amount", `PHP ${formatNumber(loanDetails.totalLoanAmount)}`],
      ],
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fillColor: [0, 102, 51], textColor: 255, fontSize: 11, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 70 },
    });

    pdf.save("loan_calculation.pdf");
  };

  return (
    <Button
      onClick={downloadPDF}
      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
    >
      Download Table as PDF
    </Button>
  );
}
