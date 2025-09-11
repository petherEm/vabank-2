import React from "react";
import { motion } from "framer-motion";
import { Service } from "./constants";

interface ServiceNavigationProps {
  services: Service[];
  activeService: string | null;
  onServiceSelect: (serviceId: string) => void;
}

export default function ServiceNavigation({
  services,
  activeService,
  onServiceSelect,
}: ServiceNavigationProps) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <motion.button
          key={service.id}
          onClick={() => onServiceSelect(service.id)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
            activeService === service.id
              ? "bg-secondary text-white"
              : "bg-white/10 text-white/70 hover:bg-white/10"
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
      ))}
    </div>
  );
}
