import { gql } from "@apollo/client";

export const UPDATE_LINE_NOTIFICATION_SETTINGS = gql`
  mutation UpdateLineNotificationSettings(
    $input: UpdateLineNotificationSettingsInput!
  ) {
    updateLineNotificationSettings(input: $input) {
      __typename
    }
  }
`;
