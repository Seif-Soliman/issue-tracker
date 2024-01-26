"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const { status, data: session } = useSession();

  return (
    <nav>
      <div className="flex space-x-6 h-14 items-center border-b mb-5 px-5">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "text-orange-500": link.href === currentPath,
                  "text-zinc-500": link.href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Sign Out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </Box>
      </div>
    </nav>
  );
};

export default NavBar;
