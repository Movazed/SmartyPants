"use client";
import acmeLogo from "@/assets/logo_smarty.png";
import quantumLogo from "@/assets/logo_smarty.png";
import echoLogo from "@/assets/logo_smarty.png";
import celestialLogo from "@/assets/logo_smarty.png";
import pulseLogo from "@/assets/logo_smarty.png";
import apexLogo from "@/assets/logo_smarty.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image
              src={acmeLogo}
              alt="Acme Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />
            <Image
              src={quantumLogo}
              alt="Quantum Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />
            <Image
              src={echoLogo}
              alt="Echo Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />
            <Image
              src={celestialLogo}
              alt="Celestial Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />
            <Image
              src={pulseLogo}
              alt="Pulse Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />
            <Image
              src={apexLogo}
              alt="Apex Logo"
              className="logo-ticker-image"
              width={200} // Increased width
              height={200} // Increased height
            />

            {/* Second set of logos for animation */}
            <Image
              src={acmeLogo}
              alt="Acme Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
            <Image
              src={quantumLogo}
              alt="Quantum Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
            <Image
              src={echoLogo}
              alt="Echo Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
            <Image
              src={celestialLogo}
              alt="Celestial Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
            <Image
              src={pulseLogo}
              alt="Pulse Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
            <Image
              src={apexLogo}
              alt="Apex Logo"
              className="logo-ticker-image"
              width={200}
              height={200}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
