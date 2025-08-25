"use client";

import React, { useState } from "react";
import { services } from "./services/constants";
import ServiceHeader from "./services/ServiceHeader";
import ServiceNavigation from "./services/ServiceNavigation";
import ServiceContent from "./services/ServiceContent";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>("web");

  return (
    <section
      className="relative bg-black text-white py-24 overflow-hidden"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile layout - Title, intro, and navigation first */}
        <div className="lg:hidden">
          <ServiceHeader />
          <div className="mb-16">
            <ServiceNavigation
              services={services}
              activeService={activeService}
              onServiceSelect={setActiveService}
            />
          </div>
          <ServiceContent services={services} activeService={activeService} />
        </div>

        {/* Desktop layout - Two-column layout */}
        <div className="hidden lg:flex lg:flex-row gap-16">
          {/* Left column - Active Service Content */}
          <div className="lg:w-3/5">
            <ServiceContent services={services} activeService={activeService} />
          </div>

          {/* Right column - Header and Navigation */}
          <div className="lg:w-2/5">
            <ServiceHeader />
            <ServiceNavigation
              services={services}
              activeService={activeService}
              onServiceSelect={setActiveService}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
