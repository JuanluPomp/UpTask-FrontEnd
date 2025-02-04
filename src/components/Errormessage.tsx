import React from "react";

export default function Errormessage({children}: {children: React.ReactNode}) {
  return (
    <div className="text-center text-white font-bold text-sm bg-red-500 rounded-sm py-3 uppercase">
        {children}
    </div>
  )
}
