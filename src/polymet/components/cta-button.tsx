import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function CTAButton({
  label,
  onClick,
  className = "",
}: CTAButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`bg-gray-700 hover:bg-gray-600 text-white rounded-md px-8 py-2 text-sm font-light tracking-wider transition-colors duration-300 ${className}`}
      variant="ghost"
    >
      {label}
    </Button>
  );
}
