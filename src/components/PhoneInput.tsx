"use client";

import { useCallback } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function PhoneInput({ value, onChange, required }: PhoneInputProps) {
  const formatPhone = useCallback((input: string): string => {
    const digits = input.replace(/\D/g, "");
    
    if (digits.length <= 2) {
      return digits.length > 0 ? `(${digits}` : "";
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      required={required}
      maxLength={15}
      placeholder="(11) 99999-9999"
      className="w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#FFD700] transition-colors"
    />
  );
}
