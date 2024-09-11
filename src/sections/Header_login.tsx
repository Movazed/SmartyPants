import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/mascott.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import Avatar from "@/assets/mascott.png"; // Import the avatar image
import SearchIcon from "@/assets/search.png"; // Import the search icon
import NotificationIcon from "@/assets/notifications.png"; // Import the notification icon
import SettingsIcon from "@/assets/settings.png"; // Import the settings icon
import Link from "next/link";

export const HeaderLogin = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <MenuIcon className="h-5 w-5 md:hidden" aria-label="Menu" />
            <nav className="hidden md:flex items-center text-black/60 ml-auto">
              <a href="/landing" className="mr-6">About</a>
              <a href="/timer" className="mr-6">Timer</a>
              <a href="/homepage" className="mr-6">Roadmaps</a>
              <a href="/blogs" className="mr-6">Blogs</a>
              <a href="/landing" className="mr-6">Help</a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium align-items justify-center tracking-tight mr-6">
                Profile
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white mr-6">
                <Image src={Avatar} alt="User Avatar" height={32} width={32} className="object-cover" />
              </div>
              <div className="relative flex items-center mr-6">
                <Image
                  src={SearchIcon}
                  alt="Search"
                  height={20}
                  width={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 border rounded-lg px-3 py-1 text-black/80 placeholder:text-black/40"
                />
              </div>
              <div className="relative flex items-center">
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white mr-2"
                  aria-label="Notifications"
                >
                  <Image
                    src={NotificationIcon}
                    alt="Notifications"
                    height={20}
                    width={20}
                  />
                </button>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white"
                  aria-label="Settings"
                >
                  <Image
                    src={SettingsIcon}
                    alt="Settings"
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
