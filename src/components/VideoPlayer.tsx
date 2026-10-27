'use client';
import type { Project } from '@/content/site';
export function VideoPlayer({ video }: { video: NonNullable<Project['video']> }) {
  return <figure className="video-player"><div className="media-frame"><video controls playsInline preload="metadata" poster={video.poster} src={video.src} aria-label={video.caption}/></div><figcaption><span className="video-caption">{video.caption}</span><span className="mono">{video.length}</span></figcaption></figure>;
}
