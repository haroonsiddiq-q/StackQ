"use client";

export function Home() {
    return (
        <div className="relative grid grid-cols-3 p-4 size-full">
            <img className="absolute left-[-200] top-[-100] w-300 transform -scale-x-100" src="images/profile-pixelate.gif" alt="profile-pixelate" />
            <div className="col-start-2 col-span-2 size-full font-pixel space-y-5 pt-40 z-10">
                <div className="space-y-5">
                    <h1 data-cursor-expand className="text-6xl w-fit">Hollo!</h1>
                    <h2 data-cursor-expand className="text-2xl w-fit">Welcome to my Portfolio website</h2>
                    <p data-cursor-expand className="max-w-260 text-wrap">This page will tell everything about me. Where I start, Where I'm at, What I've accomplish.</p>
                </div>
                <div className="h-40 flex justify-center items-end">
                    <a data-cursor-expand className="p-4 max-h-fit bg-card border-8 border-slash" href="#about">Scroll or Click here to continue</a>
                </div>
            </div>
        </div>
    );
}