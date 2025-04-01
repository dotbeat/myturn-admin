"use client";
import { useState, Children, cloneElement, isValidElement } from "react";
import { Button, Menu as MUIMenu } from "@mui/material";

type ActivatorProp = { isOpenMenu: boolean };

export default function PopUp({
  id,
  className = "",
  menuClass = "",
  activator,
  children,
  onSelect,
}: {
  id: string;
  className?: string;
  menuClass?: string;
  activator: ({ isOpenMenu }: ActivatorProp) => React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isOpenMenu = Boolean(menuAnchor);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleSelect = () => {
    handleClose();
    onSelect?.();
  };

  return (
    <>
      <Button
        id={`${id}-activator`}
        aria-controls={isOpenMenu ? id : undefined}
        aria-haspopup={true}
        aria-expanded={isOpenMenu ? true : undefined}
        className={className}
        onClick={handleClick}
      >
        {activator({ isOpenMenu })}
      </Button>

      <MUIMenu
        id={id}
        anchorEl={menuAnchor}
        open={isOpenMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            className: `rounded-lg border border-[var(--myturn-support-middle)] shadow-md shadow-gray-700/10 ${menuClass}`,
          },
          list: { "aria-labelledby": `${id}-activator` },
        }}
        onClose={handleClose}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const originalOnClick = (child as React.ReactElement<any>).props
              .onClick;

            const newProps = {
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                // 元のonClickがあれば呼び出す
                if (originalOnClick) {
                  originalOnClick(e);
                }
                // メニューを閉じる
                handleSelect();
              },
            };

            return cloneElement(child, newProps);
          }
          return child;
        })}
      </MUIMenu>
    </>
  );
}
