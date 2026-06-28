import identraLogo from '../assets/images/identra-logo.svg';

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = 'h-10 w-10' }: BrandLogoProps) {
  return (
    <img
      src={identraLogo}
      alt="Identra"
      className={`${className} shrink-0 object-contain`}
      width="1254"
      height="1254"
    />
  );
}
