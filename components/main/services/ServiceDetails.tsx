import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, ArrowRightIcon } from "lucide-react";
import { Service } from "./constants";

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
        <p className="text-white/80 text-lg leading-relaxed">
          {service.description}
        </p>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-4">Key Features</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2Icon className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        className="text-white px-6 py-3 text-base font-semibold group transition-colors border-b-2 border-secondary hover:bg-transparent"
      >
        {service.cta}
        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
