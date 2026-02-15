"use client";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-hirovo-blue/20 border-t-hirovo-blue rounded-full animate-spin" />
    </div>
  );
}
