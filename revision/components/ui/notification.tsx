import { Mail } from "lucide-react";

export default function Notification() {
  return (
    <div className=" bg-white relative hover:bg-gray-100/100   p-6  flex items-start gap-4  border-b-1 border-gray-100 hover:shadow hover:cursor-pointer ">
      <div className="bg-blue-500/10 text-blue-600 p-3 rounded-xl">
        <Mail className="w-6 h-6" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-base font-semibold text-gray-900">
          Upcoming Email Reminder
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          We'll notify you at{" "}
          <span className="font-medium text-gray-800">5:00 PM</span> today to
          revise your topics.
        </p>
      </div>
    </div>
  );
}
