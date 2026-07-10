import Image from "next/image";
import type { ReactNode } from "react";
import { BentoMockupTag } from "@/components/home/bento/BentoMockupTag";
import { cn } from "@/lib/cn";

type BentoCardTag = {
  label: string;
  icon: string;
};

type BentoCardProps = {
  title: string;
  subtitle: string;
  image?: string;
  imagePosition?: "top" | "bottom" | "right";
  visual?: ReactNode;
  tag?: BentoCardTag;
  size?: "large" | "medium";
  className?: string;
  titleClassName?: string;
  subtitleOnNewLine?: boolean;
  imageUnoptimized?: boolean;
};

function BentoImage({
  src,
  unoptimized = false,
}: {
  src: string;
  unoptimized?: boolean;
}) {
  const serveUnoptimized = unoptimized || src.startsWith("/bento-mockup/");

  return (
    <div className="relative h-full min-h-[8rem] w-full">
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
        quality={serveUnoptimized ? undefined : 90}
        unoptimized={serveUnoptimized}
      />
    </div>
  );
}

export function BentoCard({
  title,
  subtitle,
  image,
  imagePosition = "bottom",
  visual,
  tag,
  size = "medium",
  className,
  titleClassName,
  subtitleOnNewLine = true,
  imageUnoptimized = false,
}: BentoCardProps) {
  const resolvedVisual =
    visual ?? (image ? <BentoImage src={image} unoptimized={imageUnoptimized} /> : null);
  const hasVisual = Boolean(resolvedVisual);
  const usesGraphicImage = Boolean(image && !visual);
  const imageOnTop = imagePosition === "top";
  const imageOnRight = imagePosition === "right";

  const divider = hasVisual ? (
    <div
      aria-hidden
      className={cn(
        "shrink-0 bg-[#EEEEEE]",
        imageOnRight
          ? "h-px w-full md:h-auto md:w-px md:self-stretch"
          : "h-px w-full",
      )}
    />
  ) : null;

  const titleBlock = (
    <div
      className={cn(
        "relative z-10 w-full shrink-0 px-5 py-5 lg:px-6 lg:py-6",
        !hasVisual && "flex flex-1 flex-col justify-end",
        hasVisual && imageOnTop && "mt-auto",
        imageOnRight &&
          "flex flex-1 flex-col justify-start md:h-full md:max-w-[42%] md:flex-none md:py-6",
      )}
    >
      <h3
        className={cn(
          "w-full text-lg font-medium leading-snug text-primary lg:text-xl",
          titleClassName,
        )}
      >
        {title}
        {subtitleOnNewLine ? <br /> : " "}
        <span className="font-normal text-secondary">{subtitle}</span>
      </h3>
    </div>
  );

  const visualBlock = hasVisual ? (
    <div
      className={cn(
        "relative min-h-0 flex-1 basis-0 overflow-hidden",
        !usesGraphicImage && "bento-mockup-surface",
        imageOnRight && "md:min-w-0 md:flex-[1.2]",
      )}
    >
      {resolvedVisual}
      {tag ? (
        <BentoMockupTag
          iconSrc={tag.icon}
          label={tag.label}
          className="absolute left-4 top-4 z-10 md:left-6"
        />
      ) : null}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "group relative flex h-full w-full overflow-hidden rounded-xl border border-border-subtle bg-white text-left transition-colors duration-200 hover:border-[#DDDDDD]",
        size === "large" ? "min-h-[14rem]" : "min-h-[12rem]",
        imageOnRight ? "flex-col-reverse md:flex-row" : "flex-col",
        className,
      )}
    >
      {imageOnRight ? (
        <>
          {titleBlock}
          {divider}
          {visualBlock}
        </>
      ) : imageOnTop ? (
        <>
          {visualBlock}
          {divider}
          {titleBlock}
        </>
      ) : (
        <>
          {titleBlock}
          {divider}
          {visualBlock}
        </>
      )}
    </div>
  );
}
