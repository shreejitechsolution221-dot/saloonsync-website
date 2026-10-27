'use client';
export default function Error({ reset }: { reset: () => void }) { return <main id="main" className="container not-found"><span className="eyebrow">LET’S TRY THAT AGAIN</span><h1>A small pause<br /><em>in the rhythm.</em></h1><p>This page couldn’t load. Please try again.</p><button className="button" onClick={reset}>Try again</button><a href="/">Back to home</a></main>; }

