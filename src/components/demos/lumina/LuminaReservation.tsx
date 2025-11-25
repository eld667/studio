
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  format,
  startOfMonth,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isBefore,
  isToday,
  isEqual,
  add,
  sub
} from 'date-fns';

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function useOutsideClick(ref: React.RefObject<any>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export function LuminaReservation() {
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('19:00');
  
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isTimeOpen, setTimeOpen] = useState(false);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  useOutsideClick(calendarRef, () => setCalendarOpen(false));
  useOutsideClick(timeRef, () => setTimeOpen(false));

  const handleGuestChange = (amount: number) => {
    setGuestCount(prev => Math.max(1, Math.min(12, prev + amount)));
  };

  const firstDayOfMonth = startOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth)
  });

  const startingDayIndex = getDay(firstDayOfMonth);
  const today = new Date();

  const handleDateSelect = (day: Date) => {
    if (!isBefore(day, today) || isToday(day)) {
      setSelectedDate(day);
      setCalendarOpen(false);
    }
  };
  
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 17 + i * 0.5;
    const h = Math.floor(hour);
    const m = (hour - h) * 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  });

  return (
    <div className="font-body bg-stone-900/50 border border-amber-500/10 rounded-lg p-6 space-y-4">

      {/* Guest Stepper */}
      <div className="flex items-center justify-between border border-amber-500/20 rounded-md p-3">
        <button onClick={() => handleGuestChange(-1)} className="p-1 rounded-full text-amber-500 hover:bg-amber-500/10 disabled:opacity-50" disabled={guestCount <= 1}>
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg text-white">{guestCount} Guest{guestCount > 1 ? 's' : ''}</span>
        <button onClick={() => handleGuestChange(1)} className="p-1 rounded-full text-amber-500 hover:bg-amber-500/10 disabled:opacity-50" disabled={guestCount >= 12}>
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Custom Date Picker */}
        <div className="relative" ref={calendarRef}>
          <button onClick={() => setCalendarOpen(!isCalendarOpen)} className="w-full flex items-center justify-between border border-amber-500/20 rounded-md p-3 text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500/80" />
              <span className="font-serif">{format(selectedDate, 'MMM dd, yyyy')}</span>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-transform", isCalendarOpen && "rotate-180")} />
          </button>
          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 z-20 mt-1 w-full bg-stone-900 border border-amber-500/20 rounded-lg p-4 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setCurrentMonth(sub(currentMonth, { months: 1 }))}><ChevronUp className="w-5 h-5 rotate-[-90deg]"/></button>
                  <span className="font-serif text-center">{format(currentMonth, 'MMMM yyyy')}</span>
                  <button onClick={() => setCurrentMonth(add(currentMonth, { months: 1 }))}><ChevronUp className="w-5 h-5 rotate-90" /></button>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-stone-400">
                  {weekdays.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}
                  {daysInMonth.map(day => {
                    const isPast = isBefore(day, today) && !isToday(day);
                    const isSelected = isEqual(day, selectedDate);
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => handleDateSelect(day)}
                        disabled={isPast}
                        className={cn(
                          "p-1 aspect-square flex items-center justify-center rounded-full text-sm",
                          "transition-colors",
                          isPast ? "text-stone-600 cursor-not-allowed" : "hover:bg-amber-500/10",
                          isSelected && "bg-amber-500 text-stone-950 font-bold",
                          !isSelected && !isPast && isToday(day) && "border border-amber-500/50"
                        )}
                      >
                        {format(day, 'd')}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Time Picker */}
        <div className="relative" ref={timeRef}>
          <button onClick={() => setTimeOpen(!isTimeOpen)} className="w-full flex items-center justify-between border border-amber-500/20 rounded-md p-3 text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500/80" />
              <span className="font-serif">{selectedTime}</span>
            </div>
            <ChevronDown className={cn("w-5 h-5 transition-transform", isTimeOpen && "rotate-180")} />
          </button>
          <AnimatePresence>
            {isTimeOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 z-20 mt-1 w-full bg-stone-900 border border-amber-500/20 rounded-lg shadow-2xl overflow-hidden"
              >
                <div className="max-h-48 overflow-y-auto p-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => { setSelectedTime(time); setTimeOpen(false); }}
                      className={cn(
                        "w-full text-left p-2 rounded-md hover:bg-amber-500/10 font-serif",
                        selectedTime === time && "bg-amber-500/10 text-amber-400"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Message Textarea */}
      <div>
        <textarea
          placeholder="Special Occasion / Allergies"
          className="w-full bg-transparent border-b border-amber-500/30 p-2 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          rows={2}
        />
      </div>

      {/* CTA */}
      <button className="w-full bg-amber-500 text-stone-950 font-bold font-body tracking-wider py-3 rounded-md hover:bg-amber-400 transition-colors">
        Confirm Reservation
      </button>

    </div>
  );
}
