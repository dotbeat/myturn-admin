import { gql } from "@apollo/client";

// ログイン中の管理者アカウント
export const ADMIN_ME = gql`
  query AdminMe {
    adminMe {
      id
      email
      name
      avatarUrl
      role
    }
  }
`;

// 管理者アカウント一覧
export const GET_ADMIN_USERS = gql`
  query GetAdminUsers {
    getAdminUsers {
      id
      email
      name
      avatarUrl
      role
      isAllowed
      lastLoggedInAt
      createdAt
    }
  }
`;

// 許可メールアドレス一覧
export const GET_ADMIN_ALLOWED_EMAILS = gql`
  query GetAdminAllowedEmails {
    getAdminAllowedEmails {
      id
      email
      initialRole
      isRegistered
      createdAt
    }
  }
`;
