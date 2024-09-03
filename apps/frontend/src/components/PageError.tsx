"use client";

import React from "react";
import { Link } from "nextjs13-progress";

import { useRouter } from "nextjs13-progress";

import { BiSolidError } from "react-icons/bi";

interface Props {
  message: string;
  className?: string;
  title?: string;
  retryCallback?: (() => void) | string;
}

interface HomeButtonProps {
  className?: string;
}

const HomeButton = (props: HomeButtonProps) => {
  const { className = "" } = props;

  return (
    <Link href="/" className={`btn-outline ${className}`}>
      Home
    </Link>
  );
};

export default function PageError(props: Props) {
  const { message, className = "", title = "Error", retryCallback } = props;
  const router = useRouter();

  const handleRetry = () => {
    if (typeof retryCallback === "function") {
      retryCallback();
    } else if (typeof retryCallback === "string") {
      router.push(retryCallback);
    }
  };

  return (
    <div className="m-auto w-full max-w-xl px-6 md:px-0">
      <div className="flex flex-col items-center p-8 bg-error text-white rounded-lg w-full">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <BiSolidError />
          {title}
        </h1>
        <p className="text-lg mb-6">{message}</p>
        {typeof retryCallback !== typeof undefined ? (
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={handleRetry}
              className="btn-outline col-span-2 md:col-span-1 w-full"
            >
              Try Again
            </button>
            <HomeButton className="col-span-2 md:col-span-1 w-full" />
          </div>
        ) : (
          <HomeButton />
        )}
      </div>
    </div>
  );
}
