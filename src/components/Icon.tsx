import type { SVGProps } from 'react';
type Props = SVGProps<SVGSVGElement>;
function Icon({ children, ...props }: Props) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">{children}</svg>;
}
export function ArrowUpRight(props: Props) { return <Icon {...props}><path d="M6 18 18 6M6 6h12v12"/></Icon>; }
export function ArrowDown(props: Props) { return <Icon {...props}><path d="M12 4v16m-7-7 7 7 7-7"/></Icon>; }
export function ArrowUp(props: Props) { return <Icon {...props}><path d="M12 20V4m-7 7 7-7 7 7"/></Icon>; }
export function ArrowLeft(props: Props) { return <Icon {...props}><path d="M20 12H4m7-7-7 7 7 7"/></Icon>; }
export function ArrowRight(props: Props) { return <Icon {...props}><path d="M4 12h16m-7-7 7 7-7 7"/></Icon>; }
export function Chevron(props: Props) { return <Icon {...props}><path d="m5 9 7 7 7-7"/></Icon>; }
export function Plus(props: Props) { return <Icon {...props}><path d="M5 12h14M12 5v14"/></Icon>; }
export function Check(props: Props) { return <Icon {...props}><path d="m5 12 4 4L19 6"/></Icon>; }
