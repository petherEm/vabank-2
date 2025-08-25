import React from "react";

interface ServiceHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ServiceHeader({
  title = "WHAT WE DO",
  description = "We deliver cutting-edge solutions that combine technical excellence with strategic business thinking to help your organization thrive in the digital age.",
  className = "",
}: ServiceHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
        {title.includes("WE DO") ? (
          <>
            WHAT <span className="text-secondary">WE DO</span>
          </>
        ) : (
          title
        )}
      </h2>
      <p className="text-xl text-white/70">{description}</p>
    </div>
  );
}
