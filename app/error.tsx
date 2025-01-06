'use client';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
} 