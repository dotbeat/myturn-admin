import { ProfileFillIcon } from "@/icons/profile/fill";
import { Box, Avatar as MUIAvatar } from "@mui/material";

export default function Avatar({
  src,
  size,
  href,
  name,
  alt,
  className = "",
  imageClass = "object-cover",
}: {
  src: string;
  size: number;
  href?: string;
  name?: string;
  alt?: string;
  className?: string;
  imageClass?: string;
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
            className: `w-full h-full ${imageClass}`,
            decoding: "async",
          },
        }}
      />
    );
  } else {
    return (
      <Box
        component={href ? "a" : "div"}
        href={href}
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
