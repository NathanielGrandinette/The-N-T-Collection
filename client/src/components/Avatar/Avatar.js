import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function AvatarProfile({ user }) {
  return user ? (
    <Avatar
      sx={{ bgcolor: deepOrange[500] }}
      alt="profile image"
      src="/broken-image.jpg"
    >
      {user.name.charAt(0).toUpperCase()}
    </Avatar>
  ) : (
    <Avatar src="/broken-image.jpg" />
  );
}
