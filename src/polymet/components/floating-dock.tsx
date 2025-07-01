import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />

      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      {open && (
        <div className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="opacity-0 transform translate-y-0 animate-fadeIn"
              style={{
                animationDelay: `${(items.length - 1 - idx) * 50}ms`,
              }}
            >
              <a
                href={item.href}
                key={item.title}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
              >
                <div className="h-4 w-4">{item.icon}</div>
              </a>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-neutral-500 dark:text-neutral-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />

          <path d="M4 6h16" />

          <path d="M4 12h16" />

          <path d="M4 18h16" />

          <path d="M9 3l-5 5l5 5" />
        </svg>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-800 px-4 pb-3 md:flex dark:bg-gray-800",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  );
};

function IconContainer({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Handle hover effect
  const handleMouseEnter = () => {
    setHovered(true);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setIsActive(false);
  };

  return (
    <a href={href}>
      <div
        ref={ref}
        style={{
          width: isActive ? "80px" : "40px",
          height: isActive ? "80px" : "40px",
          transition: "width 0.3s, height 0.3s",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-700 dark:bg-gray-700"
      >
        {hovered && (
          <div className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs whitespace-pre text-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transform -translate-x-1/2 animate-fadeIn">
            {title}
          </div>
        )}
        <div
          style={{
            width: isActive ? "40px" : "20px",
            height: isActive ? "40px" : "20px",
            transition: "width 0.3s, height 0.3s",
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </div>
      </div>
    </a>
  );
}
