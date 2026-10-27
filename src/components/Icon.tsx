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
export function Github(props: Props) { return <Icon {...props}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21"/></Icon>; }
export function Linkedin(props: Props) { return <Icon {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></Icon>; }
export function Mail(props: Props) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>; }
