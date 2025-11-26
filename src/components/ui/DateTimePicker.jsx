import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DateTimePicker({ value, onChange, disabled, required, className }) {
  const [dateError, setDateError] = useState("");

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const maxDate = now.toISOString().slice(0, 16);

  const setNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const isoString = now.toISOString().slice(0, 16);
    onChange(isoString);
    setDateError("");
  };

  useEffect(() => {
    if (!value) {
      setNow();
    }
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    onChange(selectedDate);

    if (selectedDate > maxDate) {
      setDateError("วันที่ไม่ถูกต้อง");
    } else {
      setDateError("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="datetime-local"
          value={value}
          onChange={handleDateChange}
          required={required}
          max={maxDate}
          disabled={disabled}
          className={`flex-1 bg-white border-slate-200 focus:border-slate-400 rounded-xl h-12 ${
            dateError ? "border-red-500 focus:border-red-500" : ""
          } ${className}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={setNow}
          disabled={disabled}
          className="h-12 rounded-xl border-slate-200"
        >
          ตอนนี้
        </Button>
      </div>
      {dateError && (
        <p className="text-sm text-red-500 mt-1">{dateError}</p>
      )}
    </div>
  );
}
