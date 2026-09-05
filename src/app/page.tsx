import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="text-sm opacity-70">{siteConfig.description}</p>
        <p className="text-sm opacity-70">
          Foundation is in place. The interface is built in the next segment.
        </p>
      </div>
    </main>
  );
}
