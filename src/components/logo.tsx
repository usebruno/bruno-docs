import Image from "next/image";
import {Typography} from "@/components/ui/typography";

export const Logo = () => (
  <div className="flex items-center">
    <Image src="/bruno.png" alt="Nextra" height={32} width={32} />
    <Typography variant="h3" className="ml-1">
      Bruno Docs
    </Typography>
  </div>
)