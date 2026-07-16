export const payWithPaystack = ({
  email,
  amount,
  onSuccess,
  onClose,
}) => {
  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,

    email,

    amount: amount * 100,

    currency: "NGN",

    callback(response) {
      onSuccess(response);
    },

    onClose() {
      if (onClose) onClose();
    },
  });

  handler.openIframe();
};