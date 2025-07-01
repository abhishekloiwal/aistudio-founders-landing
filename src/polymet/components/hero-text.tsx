interface HeroTextProps {
  lines: string[];
  className?: string;
}

export default function HeroText({ lines, className = "" }: HeroTextProps) {
  return (
    <div className={`text-center ${className}`}>
      {lines.map((line, index) => (
        <p
          key={index}
          className="text-gray-300 font-light tracking-normal leading-relaxed my-2"
        >
          {line}
        </p>
      ))}
    </div>
  );
}
