"use client"

import { User_Type } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default  function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User_Type | null>(null);
const handleLogout = async () => {
  const res = await fetch('/api/logout')
  if (res.ok) {
    console.log("logged out")
    router.push('/login')
  } else {
    console.log("logout failed")
  }
}

const showUserDetails = async () => {
  try {
    const res = await fetch('/api/current-user')

    if (res.ok) {
      const data = await res.json()
      console.log("user details", data.user)
setUser(data.user)
    } else {
      console.log("failed to fetch user details")
    }
  } catch (error) {
    console.log("error fetching user details", error)
  }
}
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Welcome{user?.username ? `, ${user.username}` : "!"}</h1>
        {user ? (
          <div className="mb-6">
            <div className="text-gray-700 mb-2"><span className="font-semibold">Username:</span> {user.username}</div>
            <div className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
            {/* Add more user fields if needed */}
          </div>
        ) : (
          <div className="mb-6 text-gray-500 text-center">No user details loaded.</div>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
          <button
            onClick={showUserDetails}
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Show User Details
          </button>
        </div>
      </div>
    </div>
  );
}
