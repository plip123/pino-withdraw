import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TransferForm } from "./TransferForm";

export const TransferModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Button
        label="Withdraw"
        type="button"
        className="mr-3 p-button-raised"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Withdraw"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        draggable={false}
      >
        <TransferForm />
      </Dialog>
    </div>
  );
};
