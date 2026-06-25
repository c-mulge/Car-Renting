import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../../services/notificationService";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30000,
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={24} />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              rounded-full
              w-5
              h-5
              text-xs
              flex
              items-center
              justify-center
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-96
            bg-white
            shadow-xl
            rounded-xl
            border
            z-50
          "
        >
          <div className="p-4 border-b">
            <h3 className="font-bold">Notifications</h3>
          </div>

          {notifications.length === 0 ? (
            <p className="p-4">No notifications</p>
          ) : (
            <>
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`
                      p-4
                      border-b
                      ${notification.isRead ? "bg-white" : "bg-blue-50"}
                    `}
                >
                  <p className="font-semibold">{notification.title}</p>

                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
              ))}

              <Link
                to="/notifications"
                className="
                  block
                  text-center
                  p-3
                  text-blue-600
                  hover:bg-gray-100
                "
              >
                View All
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
