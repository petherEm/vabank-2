"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
        {/* Mobile layout - Service buttons with content appearing below active service */}
        <div className="lg:hidden">
          <ServiceHeader />
          <div className="mb-16 space-y-4">
            {services.map((service, index) => {
              const activeIndex = services.findIndex(
                (s) => s.id === activeService
              );
              const isActive = activeService === service.id;
              const showServiceButton = index <= activeIndex || !activeService;

              return (
                <div key={service.id}>
                  {showServiceButton && (
                    <motion.button
                      onClick={() => setActiveService(service.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                        isActive
                          ? "bg-secondary text-white"
                          : "bg-white/15 text-gray-300 hover:bg-gray-700/60 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">{service.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{service.title}</h3>
                        <p className="text-sm opacity-80 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </motion.button>
                  )}

                  {/* Show content and remaining buttons after active service */}
                  {isActive && (
                    <div className="mt-4 mb-8">
                      <ServiceContent
                        services={services}
                        activeService={activeService}
                      />

                      {/* Show remaining service buttons */}
                      {services.slice(index + 1).length > 0 && (
                        <div className="mt-8 space-y-4">
                          {services.slice(index + 1).map((remainingService) => (
                            <motion.button
                              key={remainingService.id}
                              onClick={() =>
                                setActiveService(remainingService.id)
                              }
                              className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left bg-white/15 text-gray-300 hover:bg-gray-700/60 hover:text-white"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex-shrink-0">
                                {remainingService.icon}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">
                                  {remainingService.title}
                                </h3>
                                <p className="text-sm opacity-80 line-clamp-2">
                                  {remainingService.description}
                                </p>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
