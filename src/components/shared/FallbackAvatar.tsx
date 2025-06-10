interface FallbackAvatarProps {
  size?: "sm" | "md" | "lg";
}

export const FallbackAvatar = ({ size = "md" }: FallbackAvatarProps) => {
  const sizes = {
    sm: {
      container: "w-12 h-12",
      icon: "w-8 h-8",
    },
    md: {
      container: "w-20 h-20",
      icon: "w-12 h-12",
    },
    lg: {
      container: "w-24 h-24",
      icon: "w-16 h-16",
    },
  };

  return (
    <div
      className={`${sizes[size].container} bg-gray-100 rounded-full flex items-center justify-center overflow-hidden`}
    >
      <img
        src="/chess-icon.svg"
        alt="Chess icon"
        className={sizes[size].icon}
      />
    </div>
  );
};
