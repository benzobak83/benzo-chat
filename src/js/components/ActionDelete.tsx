import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ActionDelete(props) {
  const { isDeleteAction, changeDeleteAction, deleteMsg, deleteMsgAll } = props;

  const handleOpen = () => changeDeleteAction(true);
  const handleClose = () => changeDeleteAction(false);
  const [isCheckedDelete, setIsCheckedDelete] = React.useState(false);

  return (
    <div>
      <Modal
        open={isDeleteAction}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вы действительно хотите удалить выделенные сообщения?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormGroup>
              <FormControlLabel
                checked={isCheckedDelete}
                onClick={() => setIsCheckedDelete((prev) => !prev)}
                control={<Checkbox />}
                label="Удалить для всех?"
              />
            </FormGroup>
          </Typography>
          <Grid container justifyContent={"flex-end"} mt={2}>
            <Button
              variant="contained"
              onClick={() => changeDeleteAction(false)}
              sx={{ marginRight: "20px" }}
            >
              Отмена
            </Button>
            <Button
              variant="outlined"
              onClick={isCheckedDelete ? deleteMsgAll : deleteMsg}
              sx={{ marginRight: "20px" }}
            >
              Удалить
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
