'use client';
import type { Project } from '@/content/site';
export function VideoPlayer({ video }: { video: NonNullable<Project['video']> }) {
  return <figure className="video-player"><div className="media-frame"><div className="window-bar" aria-hidden="true"><i/><i/><i/></div><video controls playsInline preload="metadata" poster={video.poster} src={video.src} aria-label={video.caption}/></div><figcaption>{video.caption}<span className="mono">{video.length}</span></figcaption></figure>;
}
