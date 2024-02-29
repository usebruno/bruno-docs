import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export const Logo = () => (
  <div className="flex items-center">
    <Image src="/bruno.png" alt="Bruno Logo" height={40} width={40} />
    <Typography variant="h3" className="ml-1">
      Bruno
    </Typography>
  </div>
);
