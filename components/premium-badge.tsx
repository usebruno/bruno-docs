import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export interface PremiumBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  noLink?: boolean;
}

function PremiumBadge({ className, noLink, ...props }: PremiumBadgeProps) {
  const badge = (
    <Badge className="mx-3 sm:mx-6 rounded-lg px-1 w-fit flex-row gap-x-1 my-0" variant="warning">
        Premium
        <Image
            src="/bruno.png"
            alt="Bruno Logo"
            height={20}
            width={20}
            className="my-0 h-5 w-5 sm:h-5 sm:w-5 group-hover:animate-infinite group-hover:animate-wiggle"
        />
    </Badge>
  );

  if (noLink) {
    return badge;
  }

  return (
    <Link href="https://www.usebruno.com/pricing" target="_blank" className="my-0">
        {badge}
    </Link>
  );
}

export default PremiumBadge;
