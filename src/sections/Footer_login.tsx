import Image from "next/image";
import logo from "@/assets/mascott.png";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";

interface FooterLoginProps {
  className?: string;
}

export const FooterLogin: React.FC<FooterLoginProps> = ({ className }) => {
  return (
    <footer className={`bg-black text-[#BCBCBC] text-sm py-10 text-center w-full ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative inline-flex before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} height={40} alt="SaaS logo" className="relative" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
        <a href="/landing" className="mr-6">About</a>
              <a href="/timer" className="mr-6">Timer</a>
              <a href="/homepage" className="mr-6">Roadmaps</a>
              <a href="/blogs" className="mr-6">Blogs</a>
              <a href="/landing" className="mr-6">Help</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialLinkedIn />
          <SocialPin />
          <SocialYoutube />
        </div>
        <p className="mt-6">
          &copy; 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
