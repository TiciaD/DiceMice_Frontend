import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

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

  return (
    <>
      {isLoggedIn ? <Link href="/account">
        <Image
          src={avatarUrl}
          alt="User Avatar"
          className="avatar"
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
      </Link> : <button onClick={handleLogin} className="login-button">
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