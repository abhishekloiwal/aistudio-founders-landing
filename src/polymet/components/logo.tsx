interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`text-white font-light tracking-widest ${className}`}>
      <span className="font-medium">AI</span>
      Studio.AE
    </div>
  );
}
