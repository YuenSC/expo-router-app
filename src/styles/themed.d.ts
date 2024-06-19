import "@rneui/themed";

declare module "@rneui/themed" {
  export interface Colors {
    backdrop: string;
    modal: string;
  }

  export interface TextProps {
    // bold: boolean;
  }

  export interface ComponentTheme {
    Text: Partial<TextProps>;
  }
}
