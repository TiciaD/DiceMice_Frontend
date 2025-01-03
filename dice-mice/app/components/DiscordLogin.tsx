import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function DiscordLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    // Check for user data in localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const avatarHash = localStorage.getItem('avatar');

    if (token && userId) {
      setIsLoggedIn(true);

      // Set the avatar URL
      if (avatarHash) {
        setAvatarUrl(`https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`);
      } else {
        // Default avatar based on default discriminator
        const defaultAvatarIndex = 0;
        setAvatarUrl(`https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`);
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/login';
  };

  const handleLogout = () => {
    console.log("logging out");
  }

  return (
    <>
      {isLoggedIn ?
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                src={avatarUrl}
                alt="User Avatar"
                className="avatar"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <Link
                href="/account"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Your Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/loggedout"
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Sign out
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
        : <button onClick={handleLogin} className="login-button">
          <Image
            src="/discord-logo.svg"
            alt="Discord login"
            width="40"
            height="40"
          />
        </button>
      }
    </>
  )
};