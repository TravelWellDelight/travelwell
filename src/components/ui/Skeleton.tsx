import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ── Theme wrapper — use this at the top of any page using skeletons ──
export function SkelTheme({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      {children}
    </SkeletonTheme>
  );
}

// ── Package card skeleton ──
export function PackageCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div
        className="shrink-0 w-[270px] md:w-[300px] overflow-hidden"
        style={{ border: "1px solid var(--bd)", background: "var(--bg-2)" }}
      >
        {/* Image */}
        <Skeleton height={192} borderRadius={0} />
        {/* Body */}
        <div className="p-4">
          <Skeleton width={60} height={10} className="mb-2" />
          <Skeleton width="75%" height={20} className="mb-1" />
          <Skeleton width="100%" height={12} className="mb-1" />
          <Skeleton width="60%" height={12} className="mb-4" />
          <div className="flex justify-between items-center">
            <div>
              <Skeleton width={70} height={10} className="mb-1" />
              <Skeleton width={100} height={18} />
            </div>
            <Skeleton width={64} height={32} borderRadius={0} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Destination card skeleton ──
export function DestinationCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div
        className="overflow-hidden"
        style={{ border: "1px solid var(--bd)", background: "var(--bg-2)" }}
      >
        <Skeleton height={208} borderRadius={0} />
        <div className="p-4">
          <Skeleton width={50} height={10} className="mb-2" />
          <Skeleton width="65%" height={20} className="mb-2" />
          <Skeleton width="100%" height={12} className="mb-4" />
          <div className="flex justify-between">
            <Skeleton width={110} height={12} />
            <Skeleton width={16} height={12} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Package listing page skeleton ──
export function PackageListSkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div className="min-h-screen pt-28 pb-20 px-5 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <Skeleton width={80} height={10} className="mb-3" />
        <Skeleton width={300} height={48} className="mb-6" />

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width={90} height={34} borderRadius={0} />
          ))}
        </div>

        <Skeleton height={1} className="mb-8" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                border: "1px solid var(--bd)",
                background: "var(--bg-2)",
              }}
            >
              <Skeleton height={208} borderRadius={0} />
              <div className="p-4">
                <Skeleton width={60} height={10} className="mb-2" />
                <Skeleton width="75%" height={20} className="mb-2" />
                <Skeleton width="100%" height={12} className="mb-1" />
                <Skeleton width="60%" height={12} className="mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton width={90} height={18} />
                  <Skeleton width={64} height={32} borderRadius={0} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Destinations page skeleton ──
export function DestinationListSkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div className="min-h-screen pt-28 pb-20 px-5 md:px-12 max-w-7xl mx-auto">
        <Skeleton width={80} height={10} className="mb-3" />
        <Skeleton width={320} height={48} className="mb-6" />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={80} height={34} borderRadius={0} />
          ))}
        </div>
        <Skeleton height={1} className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                border: "1px solid var(--bd)",
                background: "var(--bg-2)",
              }}
            >
              <Skeleton height={208} borderRadius={0} />
              <div className="p-4">
                <Skeleton width={50} height={10} className="mb-2" />
                <Skeleton width="65%" height={20} className="mb-2" />
                <Skeleton width="100%" height={12} className="mb-4" />
                <div className="flex justify-between">
                  <Skeleton width={110} height={12} />
                  <Skeleton width={16} height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Profile page skeleton ──
export function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div className="min-h-screen pt-16 flex">
        {/* Sidebar */}
        <div
          className="w-64 border-r p-6 space-y-3 hidden md:block"
          style={{ borderColor: "var(--bd)" }}
        >
          <Skeleton circle width={56} height={56} className="mb-4" />
          <Skeleton width={120} height={14} />
          <Skeleton width={160} height={11} className="mb-6" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} height={36} borderRadius={8} />
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-10 space-y-6">
          <Skeleton width={160} height={24} />
          <Skeleton width={260} height={14} />
          <div className="grid grid-cols-2 gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={48} borderRadius={0} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={48} borderRadius={0} />
            ))}
          </div>
          <Skeleton width={160} height={42} borderRadius={0} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Enquiry page skeleton ──
export function EnquirySkeleton() {
  return (
    <SkeletonTheme baseColor="#EDE6D9" highlightColor="#F5F0E8">
      <div className="min-h-screen pt-28 pb-20 px-5 md:px-12 max-w-6xl mx-auto">
        <Skeleton width={80} height={10} className="mb-4" />
        <Skeleton width={340} height={52} className="mb-4" />
        <Skeleton width={420} height={14} className="mb-12" />
        <div className="grid lg:grid-cols-[1fr_300px] gap-14">
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton width={100} height={10} className="mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton height={46} borderRadius={0} />
                  <Skeleton height={46} borderRadius={0} />
                </div>
              </div>
            ))}
            <Skeleton width={180} height={46} borderRadius={0} />
          </div>
          <div className="space-y-4">
            <Skeleton height={140} borderRadius={0} />
            <Skeleton height={100} borderRadius={0} />
            <Skeleton height={200} borderRadius={0} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

// ── Package detail page skeleton ──
export function PackageDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
      <div className="min-h-screen bg-[#0A0A0A]">
        {/* Hero */}
        <Skeleton height={560} borderRadius={0} />
        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-14 py-20">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <Skeleton width={200} height={14} className="mb-6" />
              <Skeleton width="100%" height={36} className="mb-3" />
              <Skeleton width="80%" height={36} className="mb-8" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 mb-4">
                  <Skeleton circle width={24} height={24} />
                  <div className="flex-1">
                    <Skeleton width="90%" height={14} />
                    <Skeleton width="60%" height={11} className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 mb-6 pl-10">
                  <div className="flex-1">
                    <Skeleton width="80%" height={16} className="mb-1" />
                    <Skeleton width="100%" height={12} />
                  </div>
                  <Skeleton width={80} height={56} borderRadius={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
