import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { BetaCard } from "@/components/beta-card";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <BetaCard
        title="This is a beta version of the Bruno documentation."
        badge="Beta"
        tooltip="This is a beta version of the Bruno documentation. Some features might not work as expected. You can contribute to the documentation by submitting an issue or a pull request on GitHub."
        includeGithubLink
      />
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
