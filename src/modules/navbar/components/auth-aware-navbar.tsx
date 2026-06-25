'use client';

import useUserAuth from '@modules/auth/hooks/use-user-auth';
import { Navbar } from '@purplelab/organisms-ui/navbar';
import { handleAppLogout } from '@modules/auth/services/handle-app-logout';
import { usePathname, useRouter } from 'next/navigation';
import { getPortalUrl } from '@purplelab/services-ui/agreements';
import AudienceConfigurationOptions from './audience-configuration';
import PAGES_PATHS from '@shared/domain/pages';
import AuthContextManager from '@modules/auth/domain/auth-context-manager';
import usePermissionValidations from '@shared/hooks/use-permission-validations';

const AuthAwareNavbar = () => {
  const router = useRouter();
  const { userAuthData, clientData } = useUserAuth();
  const { capabilities, clientApis, tagsList, token, userId, permissions } =
    userAuthData ?? {};

  const pathname = usePathname();

  const { id, name } = clientData ?? {};

  const onLogoutClick = async () => {
    const logoutUrl = await handleAppLogout();
    router.push(logoutUrl);
  };

  const onTenantChanged = () => {
    globalThis.location.href = getPortalUrl();
  };

  const {
    hasAudienceAuthorizeUserPermission,
    hasAudienceCreateContentUserPermission
  } = usePermissionValidations();

  const hasAnyPermission =
    hasAudienceAuthorizeUserPermission ||
    hasAudienceCreateContentUserPermission;

  const privateInternalApiKey = token
    ? AuthContextManager.getInstance()?.privateInternalApiKey
    : '';

  return (
    <Navbar
      capabilities={capabilities}
      clientApis={clientApis}
      tags={tagsList}
      healthnexusToken={token}
      tenantName={name}
      idTenant={id}
      userId={userId}
      permissions={permissions}
      privateInternalApiKey={privateInternalApiKey}
    >
      {hasAnyPermission && pathname !== PAGES_PATHS.audienceConfiguration && (
        <AudienceConfigurationOptions />
      )}

      <Navbar.Impersonate onTenantChanged={onTenantChanged} />
      <Navbar.Applications onLogoutClick={onLogoutClick} />
    </Navbar>
  );
};
export default AuthAwareNavbar;
