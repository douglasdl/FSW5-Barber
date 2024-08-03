"use client"

import { Button } from "./_components/ui/button";

const name = 'test'

export default function Home() {
  return (
    <>
      <h1 className="px-4 text-red-500">Home Page</h1>
      <Button>Test</Button>
    </>
  );
}