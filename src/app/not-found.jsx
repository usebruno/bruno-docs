"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const redirects = {
  "/introduction/getting-started": "/introduction/what-is-bruno",
};

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    if (redirects[path]) {
      router.replace(redirects[path]);
    } else {
      router.replace("/");
    }
  }, [router]);


  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Redirecting you to the correct page...</p>
    </div>
  );
}