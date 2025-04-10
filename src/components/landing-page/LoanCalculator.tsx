"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { DownloadPDF } from "@/components/DownloadPDF";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [years, setYears] = useState<number>(2);
  const [months, setMonths] = useState<number>(3);
  const [interestRate, setInterestRate] = useState<number>(1);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number>(0);
  const pdfRef = useRef<HTMLDivElement>(null); // ✅ Properly initialized ref

  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formatDuration = (value: number, unit: string) =>
    value === 0 ? `0 ${unit}` : `${value} ${unit}${value === 1 ? "" : "s"}`;

  const calculateLoan = () => {
    const principal = loanAmount; // No down payment deduction
    const totalMonths = years * 12 + months;
    const monthlyInterestRate = interestRate / 100 / 12;
  
    let monthlyPay = 0;
    let totalAmount = 0;
  
    if (monthlyInterestRate > 0) {
      // Loan amortization formula
      monthlyPay =
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  
      totalAmount = monthlyPay * totalMonths; // Total amount with interest
    } else {
      monthlyPay = principal / totalMonths;
      totalAmount = principal; // No interest applied
    }
  
    setMonthlyPayment(parseFloat(monthlyPay.toFixed(2)));
    setTotalLoanAmount(parseFloat(totalAmount.toFixed(2)));
  };
  
  
  

  return (
    <Card className="max-w-4xl mx-auto p-2 mb-10 mt-10 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      {/* Title with Vector Image */}
      <div className="flex items-center space-x-3">
        <Image src="/loan.png" alt="Loan Icon" width={50} height={50} />
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
          Loan Calculator
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Calculate your loan payments effortlessly and plan your finances with
        confidence.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-1 mt-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Loan Amount
          </label>
          <Input
            value={loanAmount.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
              if (!isNaN(Number(rawValue))) {
                setLoanAmount(Number(rawValue)); // Store numeric value
              }
            }}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Select Years
          </label>
          <Select onValueChange={(value) => setYears(Number(value))}>
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
              <SelectValue>{formatDuration(years, "Year")}</SelectValue>
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white">
              {[...Array(31).keys()].map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {formatDuration(y, "Year")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Select Months
          </label>
          <Select onValueChange={(value) => setMonths(Number(value))}>
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
              <SelectValue>{formatDuration(months, "Month")}</SelectValue>
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white">
              {[...Array(12).keys()].map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {formatDuration(m, "Month")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Interest Rate (%)
          </label>
          <Input
            value={interestRate.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
              if (!isNaN(Number(rawValue))) {
                setInterestRate(Number(rawValue)); // Store numeric value
              }
            }}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        onClick={calculateLoan}
      >
        Calculate Loan
      </Button>

      {/* Loan Details */}
      <div ref={pdfRef}>
        <Card className="mt-4 bg-gray-100 dark:bg-gray-800 dark:border-gray-600">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Loan Details
            </h3>
            <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 mt-2">
              <p>Selected Years:</p>{" "}
              <p className="font-semibold">{formatDuration(years, "Year")}</p>
              <p>Selected Months:</p>{" "}
              <p className="font-semibold">{formatDuration(months, "Month")}</p>
              <p>Loan Amount:</p>{" "}
              <p className="font-semibold">₱ {formatNumber(loanAmount)}</p>
              <p>Interest Rate:</p>{" "}
              <p className="font-semibold">{interestRate}%</p>
              <p>Total Loan Amount (w/ interest):</p>{" "}
              <p className="font-semibold">₱ {formatNumber(totalLoanAmount)}</p>
              <p>Monthly Payment:</p>{" "}
              <p className="font-semibold text-green-700 dark:text-green-400">
                ₱ {formatNumber(monthlyPayment)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        * Please note that the results provided by this calculator are estimates
        and may vary. The final loan amount, interest rates, and monthly
        payments will be determined by the bank upon approval.
      </p>

      {/* Download as PDF Button */}
      <DownloadPDF
        targetRef={pdfRef}
        loanDetails={{
          years,
          months,
          loanAmount,
          interestRate,
          totalLoanAmount,
          monthlyPayment,
        }}
      />
    </Card>
  );
}
