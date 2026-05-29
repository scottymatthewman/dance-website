type IntegrationBadgeProps = {
  label: string;
  opacity?: number;
};

export function IntegrationBadge({
  label,
  opacity = 100,
}: IntegrationBadgeProps) {
  return (
    <div
      className="flex size-14 items-center justify-center rounded-xl border border-border-strong bg-gradient-to-b from-card-inner to-section shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      style={{ opacity: opacity / 100 }}
      aria-label={label}
      title={label}
    >
      <span className="text-xs font-medium text-secondary">{label.slice(0, 2)}</span>
    </div>
  );
}
