import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { HomepageFeatures } from '@site/src/components/HomepageFeatures';

import {cn} from "@site/src/lib/utils";
import {Typography, TypoH1} from "@site/src/components/ui/typography";
import React from "react";
import {Button} from "@site/src/components/ui/button";
import {Github} from "lucide-react";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={cn("flex flex-col items-center w-full justify-center mt-16")}>
        <Typography variant="h1">Re-Inventing the API Client</Typography>
        <Typography variant="lead" className="mt-4 max-w-[750px] text-center">
          Bruno is a Fast and Git-Friendly Opensource API client, aimed at revolutionizing the status quo represented by Postman, Insomnia and similar tools out there.
        </Typography>
      <div className="flex items-center mt-6">
        <Link
          to="/docs/intro">
          <Button>
              Get started
          </Button>
        </Link>
        <Link
          to="https://github.com/usebruno/bruno"
          className="ml-4">
          <Button variant="outline">
              <Github size={16} className="mr-1"/>
              GitHub
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
