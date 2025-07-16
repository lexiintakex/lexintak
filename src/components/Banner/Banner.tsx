import Image from "next/image";
import React from "react";

function AuthBanner({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <div className="hidden lg:flex  w-[40%] bg-banner-image rounded-xl  items-center justify-center text-white px-12">
      <div className="text-start max-w-xl">
        <Image
          src="/assets/dashboard/white-logo.svg"
          alt="LexIntake Logo"
          width={100}
          height={40}
          className="mb-4 flex justify-start "
        />
        <h2 className="text-lg md:md:text-lg lg:text-4xl text-white font-semibold mb-2">
          {title}
        </h2>
        <p
          className="text-base md:text-lg font-medium lg:text-lg leading-relaxed text-white"
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </div>
    </div>
  );
}

export default AuthBanner;
