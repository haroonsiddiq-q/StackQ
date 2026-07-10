"use client";

export function About() {
    return (
        <div className="relative grid grid-cols-3 p-4 size-full">
            <img className="absolute right-[-200] top-[-100] w-300" src="images/profile-picture.gif" alt="profile-picture" />
            <div className="col-start-1 col-span-2 size-full font-body space-y-3 p-40">
                <div className="space-y-3">
                    <h1 data-cursor-expand className="text-6xl flex gap-3 w-fit font-extrabold">Hey, I'm Haroon <span className="text-primary">S</span> Qureshi.</h1>
                    <p data-cursor-expand className="text-2xl max-w-200 leading-8 w-fit">I build full-stack systems — the kind that touch a real database, a real user, and eventually a real server that has to stay up. My range spans Laravel and Next.js on the web, React Native on mobile, and Python/ML for data-heavy work, but what I actually care about is shipping something that works end-to-end. Right now that means closing my DevOps gap (deployment, CI/CD, infrastructure) — while putting all of it to work on a live project: the tech stack behind my family's food business.</p>
                </div>
                <div className="h-40 flex justify-end items-end w-200">
                    <a data-cursor-expand className="p-4 max-h-fit bg-card border-8 border-slash font-pixel" href="#project">Scroll or Click here to continue</a>
                </div>
            </div>
        </div>
    );
}