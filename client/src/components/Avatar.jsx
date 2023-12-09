const Avatar = ({ letter }) => {
    function getRandomColor() {
      const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    const randomColor = getRandomColor();
  
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
        <circle cx="15" cy="15" r="15" fill={randomColor} />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="17" fill="#fff" fontFamily="Arial, sans-serif">
          {letter}
        </text>
      </svg>
    );
  };
  
  export default Avatar;