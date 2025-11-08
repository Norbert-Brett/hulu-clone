function Logo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="120" 
        height="40" 
        viewBox="0 0 120 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="select-none"
      >
        {/* Background rounded rectangle */}
        <rect width="120" height="40" rx="8" fill="#00FF85"/>
        
        {/* NULU text */}
        <text 
          x="60" 
          y="28" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontSize="24" 
          fontWeight="900" 
          fill="#0A0E27"
          textAnchor="middle"
          letterSpacing="1"
        >
          NULU
        </text>
      </svg>
    </div>
  )
}

export default Logo
