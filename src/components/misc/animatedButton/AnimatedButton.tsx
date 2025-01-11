import { IAnimatedButtonProps } from "./AnimatedButton.interface";

export const AnimatedButton = ({
  label,
  href,
  target = "_blank",
  icon,
  onlyIcon = false,
  className = "",
}: IAnimatedButtonProps) => {
  return (
    <a
      href={href}
      target={target}
      rel="noreferrer"
      className={`Countdown--container aic anim ${className}`}
      data-tooltip-id="tooltip"
      data-tooltip-content="PINO"
    >
      <img src="/images/aiBg.png" alt="AI" className="Countdown-ai" />
      <div className="Countdown-inner aic">
        {!!icon && <i className={`pi ${icon} text-black-alpha-80`} />}
        {!onlyIcon && <span>{label}</span>}
      </div>
    </a>
  );
};
