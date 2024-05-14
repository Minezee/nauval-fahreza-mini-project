import React from 'react'

const Priority = ({ priority, size }) => {
  return (
    <svg aria-label="High Priority" width={size ?? "16"} height={size ?? "16"} viewBox="0 0 16 16" fill="#999b9e" role="img" focusable="false">
      <rect x="1.5" y="8" width="3" height="6" rx="1">
      </rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity={priority <= 2 ? 1 : 0.4}>
      </rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity={priority <= 1 ? 1 : 0.4}>
      </rect>
    </svg>
  )
}

export default Priority