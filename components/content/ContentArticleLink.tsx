import Link from "next/link";
import type { ReactNode } from "react";

export function FileTextIcon() {
  return (
    <svg
      aria-hidden
      className="content-article-icon"
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.172 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9.172c0 .53-.21 1.039-.586 1.414l-4.828 4.828A2 2 0 0 1 12.172 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M9 12h3M9 8h6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function GlossaryIcon() {
  return (
    <svg
      aria-hidden
      className="content-article-icon"
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM13 17h7M13 7h7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden
      className="content-article-arrow"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type ContentArticleLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function ContentArticleLink({
  href,
  icon,
  children,
}: ContentArticleLinkProps) {
  return (
    <Link className="content-article-link" href={href}>
      <span className="content-article-label">
        {icon}
        <span>{children}</span>
      </span>
      <ArrowRightIcon />
    </Link>
  );
}
