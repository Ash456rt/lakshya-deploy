import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  in_progress: "bg-blue-500/10 text-blue-300 ring-blue-500/30",
  on_hold: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  completed: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  pending: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  quoted: "bg-blue-500/10 text-blue-300 ring-blue-500/30",
  accepted: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  declined: "bg-red-500/10 text-red-300 ring-red-500/30",
};

const statusLabels: Record<string, string> = {
  in_progress: "In progress",
  on_hold: "On hold",
  completed: "Completed",
  pending: "Pending",
  quoted: "Quoted",
  accepted: "Accepted",
  declined: "Declined",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        statusStyles[status] ??
          "bg-neutral-500/10 text-neutral-300 ring-neutral-500/30"
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
