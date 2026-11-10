import { MARK_PATH, MARK_VIEWBOX } from '@/lib/mark';

/** The L/Z mark. Takes the text colour of its parent. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={MARK_VIEWBOX} aria-hidden="true">
      <path fill="currentColor" d={MARK_PATH} />
    </svg>
  );
}
