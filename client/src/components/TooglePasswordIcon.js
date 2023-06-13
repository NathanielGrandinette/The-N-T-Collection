function TogglePasswordIcon({ showPassword }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="32"
      height="32"
      className="svg-toggle-password"
      title="Toggle Password Security"
    >
      {!showPassword && (
        <>
          <rect
            x="20.133"
            y="2.117"
            height="44"
            transform="translate(23.536 -8.587) rotate(45)"
            className="closed-eye"
          />
          <rect
            x="22"
            y="3.984"
            width="4"
            height="44"
            transform="translate(25.403 -9.36) rotate(45)"
            style={{ fill: "#008ed6" }}
            className="closed-eye"
          />
        </>
      )}
      <path
        fill="#008ed680"
        d="M24,9A23.654,23.654,0,0,0,2,24a23.633,23.633,0,0,0,44,0A23.643,23.643,0,0,0,24,9Zm0,25A10,10,0,1,1,34,24,10,10,0,0,1,24,34Zm0-16a6,6,0,1,0,6,6A6,6,0,0,0,24,18Z"
      />
    </svg>
  );
}

export default TogglePasswordIcon;
