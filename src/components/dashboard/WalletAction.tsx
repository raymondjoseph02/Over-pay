import { useModal } from "../../hooks/useModal";
import type { WalletActionProps } from "../../types/type";
import { Button } from "../global-ui";
import { SendMoneyModal } from "../modals/SendMoneyModal";

export const WalletAction = ({ name }: WalletActionProps) => {
  const { Modal: sendMoney, open } = useModal("lg", (close) => (
    <SendMoneyModal onClose={close} />
  ));

  return (
    <>
      <Button variants="primary" handleClick={open}>
        {name}
      </Button>
      {sendMoney}
    </>
  );
};
