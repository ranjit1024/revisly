import animation from "../../public/Analysis.json"
import Lottie from "lottie-react"
export const DashboardSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
          <Lottie animationData={animation} loop={true}  />
        <p className="mt-4 text-gray-600 text-lg">Loading Dashboard...</p>
      </div>
    </div>
  );
};
