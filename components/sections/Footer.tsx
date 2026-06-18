import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

const FOOTER_IMAGE = {
  desktop: {
    src: "/footer/dance-footer.png",
    width: 3000,
    height: 1126,
  },
  mobile: {
    src: "/footer/dance-footer-mobile.png",
    width: 1001,
    height: 1039,
  },
} as const;

const FOOTER_LOCKUP = {
  src: "/icons/dance-mark.svg",
  width: 73,
  height: 72,
} as const;

function FooterContent({ align }: { align: "center" | "start" }) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "flex w-full max-w-[21.5rem] flex-col items-center gap-5 text-center"
          : "flex max-w-[21.5rem] flex-col items-start gap-5"
      }
    >
      <div
        className={
          centered
            ? "flex flex-col items-center gap-2"
            : "flex flex-col gap-2"
        }
      >
        <p
          className={cn(
            "flex items-center gap-3 font-normal leading-[1.5] text-primary",
            centered
              ? "text-[clamp(2rem,10.8vw,2.703rem)]"
              : "text-[clamp(2rem,2.22vw,2.703rem)]",
          )}
        >
          <SiteIcon
            className="h-[1em] aspect-square shrink-0 text-primary"
            name="dance-mark"
          />
          {SITE.name}
        </p>
        <p className="text-base leading-normal text-secondary">
          {COPY.footer.taglineLines[0]}
          <br />
          {COPY.footer.taglineLines[1]}
        </p>
      </div>
      <Button href={SITE.demoHref} size="sm" className="w-fit shrink-0">
        {COPY.footer.cta}
      </Button>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-section">
      <div className="relative w-full aspect-[1001/1039] md:aspect-[3000/1126]">
        <Image
          alt=""
          aria-hidden
          className="object-cover object-center md:hidden"
          fill
          priority={false}
          quality={100}
          sizes="100vw"
          src={FOOTER_IMAGE.mobile.src}
          unoptimized
        />
        <Image
          alt=""
          aria-hidden
          className="hidden object-cover object-center md:block"
          fill
          priority={false}
          quality={100}
          sizes="100vw"
          src={FOOTER_IMAGE.desktop.src}
          unoptimized
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[28%] bg-gradient-to-b from-section to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute z-20 max-md:hidden"
          style={{
            height: "18.84%",
            left: "71.03%",
            top: "36.29%",
            width: "6.59%",
          }}
        >
          <Image
            alt=""
            className="object-contain"
            fill
            src={FOOTER_LOCKUP.src}
            unoptimized
          />
        </div>
        <div className="absolute inset-x-0 top-[13.28%] z-20 flex justify-center px-gutter md:hidden">
          <FooterContent align="center" />
        </div>
        <div className="absolute inset-0 z-20 hidden items-center pl-[clamp(1rem,20.57vw,25rem)] pr-gutter md:flex">
          <FooterContent align="start" />
        </div>
      </div>
    </footer>
  );
}
