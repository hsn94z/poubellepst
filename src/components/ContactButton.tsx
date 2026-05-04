export function ContactButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`group relative inline-flex items-center justify-center rounded-xl p-px [background:linear-gradient(90deg,rgb(0,166,126),rgb(0,212,170)_50%,rgb(152,244,76))] ${className}`}
    >
      <span className="rounded-[11px] px-7 py-3 text-base font-normal text-white bg-[rgb(0,124,92)] transition-[background] duration-300 group-hover:[background:linear-gradient(90deg,rgb(0,166,126),rgb(0,212,170)_50%,rgb(152,244,76))]">
        Nous contacter
      </span>
    </a>
  )
}
