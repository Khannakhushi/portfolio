type Props = { className?: string };

function BobaIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4 0 16 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cup */}
      <path d="M7 8h10l-1.5 12a1 1 0 0 1-1 .9h-5a1 1 0 0 1-1-.9L7 8z" />
      {/* Lid */}
      <path d="M5.5 8h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1z" />
      {/* Straw */}
      <line x1="14" y1="1" x2="13" y2="7" />
      {/* Boba pearls */}
      <circle cx="10" cy="16" r="0.8" fill="currentColor" />
      <circle cx="12.5" cy="17.5" r="0.8" fill="currentColor" />
      <circle cx="11" cy="19" r="0.8" fill="currentColor" />
      <circle cx="13.5" cy="15" r="0.8" fill="currentColor" />
    </svg>
  );
}

export default BobaIcon;
