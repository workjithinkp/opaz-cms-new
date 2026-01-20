export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="h-screen bg-gray-200 animate-pulse" />

      {/* Content Sections Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-20">
            {/* Title */}
            <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto mb-8 animate-pulse" />
            
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
