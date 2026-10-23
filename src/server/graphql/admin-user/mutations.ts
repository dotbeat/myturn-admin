import { gql } from "@apollo/client";

// Googleログインで登録/ログイン
export const ADMIN_LOGIN_WITH_GOOGLE = gql`
  mutation AdminLoginWithGoogle($input: AdminLoginWithGoogleInput!) {
    adminLoginWithGoogle(input: $input) {
      id
    }
  }
`;

export const ADMIN_LOGOUT = gql`
  mutation AdminLogout {
    adminLogout {
      message
    }
  }
`;

// 管理者アカウントの権限変更
export const UPDATE_ADMIN_USER_ROLE = gql`
  mutation UpdateAdminUserRole($input: UpdateAdminUserRoleInput!) {
    updateAdminUserRole(input: $input) {
      id
      role
    }
  }
`;

// 管理者アカウントの削除
export const DELETE_ADMIN_USER = gql`
  mutation DeleteAdminUser($input: DeleteAdminUserInput!) {
    deleteAdminUser(input: $input)
  }
`;

// 許可メールアドレスの追加
export const CREATE_ADMIN_ALLOWED_EMAIL = gql`
  mutation CreateAdminAllowedEmail($input: CreateAdminAllowedEmailInput!) {
    createAdminAllowedEmail(input: $input) {
      id
    }
  }
`;

// 許可メールアドレスの削除
export const DELETE_ADMIN_ALLOWED_EMAIL = gql`
  mutation DeleteAdminAllowedEmail($input: DeleteAdminAllowedEmailInput!) {
    deleteAdminAllowedEmail(input: $input)
  }
`;
