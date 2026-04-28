import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div
        className="min-h-screen pt-28 pb-20 flex flex-col items-center px-5"
        style={{ background: "#FDF6ED" }}
      >
        {/* Card */}
        <div
          className="w-full max-w-[760px]"
          style={{
            border: "2px solid #C8392B",
            borderRadius: "6px",
            padding: "60px 60px",
            background: "#FDF6ED",
          }}
        >
          <Skeleton width={120} height={10} className="mb-6 mx-auto" />
          <Skeleton width={340} height={64} className="mb-3 mx-auto" />
          <Skeleton width={180} height={40} className="mb-8 mx-auto" />
          <Skeleton width={460} height={14} className="mb-2 mx-auto" />
          <Skeleton width={380} height={14} className="mb-8 mx-auto" />
          <Skeleton height={1} className="mb-8" />
          <div className="flex justify-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton width={60} height={36} className="mb-2" />
                <Skeleton width={60} height={10} />
              </div>
            ))}
          </div>
          <Skeleton height={1} className="my-8" />
          <Skeleton height={120} borderRadius={3} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
