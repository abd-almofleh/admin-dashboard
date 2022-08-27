import { Popper, Paper, ClickAwayListener, useTheme } from "@mui/material";
import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";

interface IProfilePopperProps {
  open: boolean;
  anchorRef: React.MutableRefObject<any>;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  children: any;
}

const ProfilePopper = ({ open, anchorRef, children, handleClose, ...rest }: IProfilePopperProps) => {
  const theme = useTheme();

  return (
    <Popper
      placement="bottom-end"
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      popperOptions={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 9],
            },
          },
        ],
      }}
    >
      {({ TransitionProps }: any) => (
        <Transitions type="fade" in={open} {...TransitionProps}>
          {open && (
            <Paper
              sx={{
                boxShadow: theme.customShadows?.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 250,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <MainCard elevation={0} border={false} content={false}>
                    {children}
                  </MainCard>
                </div>
              </ClickAwayListener>
            </Paper>
          )}
        </Transitions>
      )}
    </Popper>
  );
};

export default ProfilePopper;
