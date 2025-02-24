"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [years, setYears] = useState<number>(2);
  const [months, setMonths] = useState<number>(3);
  const [interestRate, setInterestRate] = useState<number>(1);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number>(0);

  const formatNumber = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatDuration = (value: number, unit: string) => `${value} ${unit}${value === 1 ? "" : "s"}`;

  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const totalMonths = years * 12 + months;
    const monthlyInterestRate = interestRate / 100 / 12;

    let monthlyPay = 0;
    let totalAmount = principal;

    if (monthlyInterestRate > 0) {
      monthlyPay = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
      totalAmount = monthlyPay * totalMonths;
    } else {
      monthlyPay = principal / totalMonths;
    }

    setMonthlyPayment(parseFloat(monthlyPay.toFixed(2)));
    setTotalLoanAmount(parseFloat(totalAmount.toFixed(2)));
  };

  return (
    <div className="max-w-4xl mx-auto p-2 mb-10 bg-white shadow-md">
      {/* Title with Vector Image */}
      <div className="flex items-center space-x-3">
        <Image src="/loan.png" alt="Loan Icon" width={50} height={50} />
        <h2 className="text-3xl font-bold text-green-700">Loan Calculator</h2>
      </div>
      <p className="text-gray-600">Calculate your loan payments effortlessly and plan your finances with confidence.</p>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-1 mt-4">
        <div>
          <label className="text-sm text-gray-700">Loan Amount</label>
          <Input value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-sm text-gray-700">Down Payment</label>
          <Input value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-sm text-gray-700">Select Years</label>
          <Select onValueChange={(value) => setYears(Number(value))}>
            <SelectTrigger>
              <SelectValue>{formatDuration(years, "Year")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[...Array(30).keys()].map((y) => (
                <SelectItem key={y} value={String(y + 1)}>
                  {formatDuration(y + 1, "Year")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Select Months</label>
          <Select onValueChange={(value) => setMonths(Number(value))}>
            <SelectTrigger>
              <SelectValue>{formatDuration(months, "Month")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[...Array(12).keys()].map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {formatDuration(m, "Month")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Interest Rate (%)</label>
          <Input value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
        </div>
      </div>

      {/* Calculate Button with Auto-Hover Animation */}
      <Button
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
        onClick={calculateLoan}
      >
        Calculate Loan
      </Button>

      {/* Loan Details */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Loan Details</h3>
          <div className="grid grid-cols-2 gap-2 text-gray-700 mt-2">
            <p>Selected Years:</p> <p className="font-semibold">{formatDuration(years, "Year")}</p>
            <p>Selected Months:</p> <p className="font-semibold">{formatDuration(months, "Month")}</p>
            <p>Loan Amount:</p> <p className="font-semibold">₱ {formatNumber(loanAmount)}</p>
            <p>Interest Rate:</p> <p className="font-semibold">{interestRate}%</p>
            <p>Total Loan Amount (w/ interest):</p> <p className="font-semibold">₱ {formatNumber(totalLoanAmount)}</p>
            <p>Monthly Payment:</p> <p className="font-semibold text-green-700">₱ {formatNumber(monthlyPayment)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <p className="text-sm text-gray-500 mt-4">
        * Please note that the results provided by this calculator are estimates and may vary. The final loan amount, interest rates, and monthly payments will be determined by the bank upon approval.
      </p>

      {/* Download as PDF Button */}
      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
        Download Table as PDF
      </Button>
    </div>
  );
}
