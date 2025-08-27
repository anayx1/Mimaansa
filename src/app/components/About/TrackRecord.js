import React from "react";
import AnimatedList from "./RecordList";

const TrackRecord = () => {
    return (
        <>
            <section className="w-full flex flex-col justify-center items-center py-20 bg-[#f7f4ef]">
                {/* Heading */}
                <h2 className=" text-[#1e1e1e] uppercase text-center mb-12">
                    TRACK RECORDS
                </h2>

                {/* Video */}
                <div className="w-full max-w-4xl px-4 my-10">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto rounded-lg shadow-lg"
                    >
                        <source src="/about/trackrecords.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Description */}
                <p className="max-w-3xl text-center text-secondary px-4 py-10">
                    Over the years, Mimaansa has built a strong track record for quality and
                    reliability, delivering hundreds of product orders worldwide. From
                    boutique brands to large retail chains, we maintain strict quality
                    standards, meet tight deadlines, and provide the same personalized
                    service and attention to detail to every client.
                </p>

                <div className="w-full px-6 mt-8">
                    <AnimatedList />
                </div>
            </section>
        </>
    );
};

export default TrackRecord;
