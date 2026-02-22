import { gql } from "@apollo/client";

export const GET_LINE_NOTIFICATION_SETTINGS = gql`
  query GetLineNotificationSettings {
    getLineNotificationSettings {
      key
      message
      isEnabled
      schedule {
        scheduleType
        dayOfWeek
        dayOfMonth
        hour
        minute
      }
    }
  }
`;
