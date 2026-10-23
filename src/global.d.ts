declare module "*.css" {}

// Google Identity Services（https://accounts.google.com/gsi/client）のうち使用する部分
interface GoogleCredentialResponse {
  credential: string;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize(config: {
          client_id: string;
          callback: (response: GoogleCredentialResponse) => void;
          ux_mode?: "popup" | "redirect";
        }): void;
        renderButton(
          parent: HTMLElement,
          options: {
            type?: "standard" | "icon";
            theme?: "outline" | "filled_blue" | "filled_black";
            size?: "large" | "medium" | "small";
            text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            shape?: "rectangular" | "pill" | "circle" | "square";
            locale?: string;
            width?: number;
          },
        ): void;
      };
    };
  };
}
