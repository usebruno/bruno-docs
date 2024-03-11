import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { Github, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <Card className="flex items-center p-2 rounded-xl">
        <CardTitle className="flex items-center">
          <Badge variant="default">Beta</Badge>
          <Typography variant="small" className="ml-2">
            This is a beta version of the Bruno documentation.
          </Typography>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="ml-2" />
              </TooltipTrigger>
              <TooltipContent>
                <Typography variant="small">
                  This is a beta version of the Bruno documentation. Some
                  features might not work as expected. <br />
                  You can contribute to the documentation by submitting an issue
                  or a pull request on{" "}
                  <Button
                    variant="default"
                    asChild
                    className="py-0.5 px-1 h-fit"
                  >
                    <Link
                      href="https://github.com/usebruno/bruno-docs"
                      target="_blank"
                    >
                      GitHub
                    </Link>
                  </Button>
                </Typography>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </Card>
      <Typography variant="h1" className="text-center mt-10">
        Re-Inventing the API Client
      </Typography>
      <Typography variant="lead" className="mt-4 max-w-[750px] text-center">
        Bruno is a Fast and Git-Friendly Opensource API client, aimed at
        revolutionizing the status quo represented by Postman, Insomnia and
        similar tools out there.
      </Typography>
      <div className="flex items-center mt-6">
        <Button asChild>
          <Link href="/introduction">Get started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://github.com/usebruno/bruno" className="ml-4">
            <Github size={16} className="mr-1" />
            GitHub
          </Link>
        </Button>
      </div>
    </main>
  );
}
