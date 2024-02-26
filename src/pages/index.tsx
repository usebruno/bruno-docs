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
    <header className={cn("tw-flex tw-flex-col tw-items-center tw-w-full tw-justify-center tw-mt-16")}>
        <Typography variant="h1">Re-Inventing the API Client</Typography>
        <Typography variant="lead" className="tw-mt-4 tw-max-w-[750px] tw-text-center">
          Bruno is a Fast and Git-Friendly Opensource API client, aimed at revolutionizing the status quo represented by Postman, Insomnia and similar tools out there.
        </Typography>
      <div className="tw-flex tw-items-center tw-mt-6">
        <Link
          to="/docs/intro">
          <Button>
              Get started
          </Button>
        </Link>
        <Link
          to="https://github.com/usebruno/bruno"
          className="tw-ml-4">
          <Button variant="outline">
              <Github size={16} className="tw-mr-1"/>
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
