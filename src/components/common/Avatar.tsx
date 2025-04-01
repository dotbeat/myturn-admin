import { ProfileFillIcon } from "@/icons/profile/fill";
import { Box, Avatar as MUIAvatar } from "@mui/material";

export default function Avatar({
  src,
  size,
  href,
  name,
  alt,
  className = "",
}: {
  src: string;
  size: number;
  href?: string;
  name?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    return (
      <MUIAvatar
        component={href ? "a" : "div"}
        src={src}
        alt={alt || (name ? `${name}のプロフィール画像` : "プロフィール画像")}
        href={href}
        className={className}
        sx={{ width: size, height: size }}
        slotProps={{
          img: {
            className: "w-full h-full object-cover",
            decoding: "async",
          },
        }}
      />
    );
  } else {
    return (
      <Box
        className={`flex items-center justify-center rounded-full bg-[var(--myturn-support-middle)] ${className}`}
        sx={{ width: size, height: size }}
      >
        <ProfileFillIcon
          size={Math.round(size / 2.5)}
          className="text-[var(--foreground)]"
        />
      </Box>
    );
  }
}
