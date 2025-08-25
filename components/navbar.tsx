"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
  { href: "#services", label: "What we do" },
  { href: "#work", label: "Our works" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "/blog", label: "Readings" },
];

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="text-white hover:text-secondary transition-colors text-sm font-medium"
        >
          {label}
        </a>
      ))}
      <Button
        variant="outline"
        className="border-white text-white hover:bg-white hover:text-black"
      >
        Contact
      </Button>
    </nav>
  );
}

function MobileNavButton({ open }: { open: boolean }) {
  return (
    <DisclosureButton
      className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
      aria-label="Open main menu"
    >
      {open ? (
        <XMarkIcon className="h-6 w-6 text-white" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-white" />
      )}
    </DisclosureButton>
  );
}

function MobileNav() {
  return (
    <DisclosurePanel className="md:hidden absolute left-0 right-0 top-full z-50 bg-black/95 backdrop-blur-md border-t border-white/10">
      <div className="flex flex-col gap-4 p-6 max-w-7xl mx-auto">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: linkIndex * 0.05,
            }}
            key={href}
          >
            <Link
              href={href}
              className="text-lg font-medium text-white hover:text-secondary transition-colors block py-2"
            >
              {label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: links.length * 0.05,
          }}
        >
          <Button
            variant="outline"
            className="w-full mt-2 border-white text-white hover:bg-white hover:text-black"
          >
            Contact
          </Button>
        </motion.div>
      </div>
    </DisclosurePanel>
  );
}

export function Navbar() {
  return (
    <Disclosure as="header" className="relative z-50">
      {({ open }) => (
        <>
          <div className="px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/vabank-light.png"
                      alt="vabank Logo"
                      width={200}
                      height={40}
                    />
                  </Link>
                </div>

                <div className="flex items-center">
                  <DesktopNav />
                  <MobileNavButton open={open} />
                </div>
              </div>
            </div>
          </div>
          <MobileNav />
        </>
      )}
    </Disclosure>
  );
}
