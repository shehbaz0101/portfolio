import type { AnchorHTMLAttributes } from 'react';
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'secondary' };
export function Button({ variant = 'secondary', className = '', ...props }: Props) {
  return <a rel={props.href?.startsWith("https://") ? "noopener noreferrer" : undefined} className={`button button-${variant} ${className}`} {...props} />;
}
export function TextLink({ className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a rel={props.href?.startsWith("https://") ? "noopener noreferrer" : undefined} className={`text-link ${className}`} {...props} />;
}
