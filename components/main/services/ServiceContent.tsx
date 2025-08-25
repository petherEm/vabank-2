import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Service, containerVariants } from "./constants";
import ServiceVisualization from "./ServiceVisualization";
import ServiceDetails from "./ServiceDetails";

interface ServiceContentProps {
  services: Service[];
  activeService: string | null;
}

export default function ServiceContent({
  services,
  activeService,
}: ServiceContentProps) {
  return (
    <AnimatePresence mode="wait">
      {services.map(
        (service) =>
          activeService === service.id && (
            <motion.div
              key={service.id}
              //@ts-expect-error
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <ServiceVisualization serviceId={service.id} />
              <ServiceDetails service={service} />
            </motion.div>
          )
      )}
    </AnimatePresence>
  );
}
